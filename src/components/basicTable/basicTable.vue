<template>
	<a-table
		:columns="columns"
		:loading="loading"
		:rowSelection="rowSelection"
		:rowKey="rowKey"
		size="middle"
		:data-source="data"
		:pagination="pageOption"
		bordered
		:customRow="customRow"
		@change="paginationChange"
		:childrenColumnName="childrenColumnName"
		v-bind="{ ...$props, ...$attrs }"
		:rowClassName="(record, index) => (index % 2 === 0 ? 'table-striped' : null)"
	>
		<!--    是否有自定义显示slots start-->
		<template
			v-for="slotItem in columns.filter((item) => item.slots)"
			:key="slotItem.dataIndex || slotItem.slots.customRender"
			v-slot:[slotItem.slots.customRender]="slotProps"
		>
			<!--        自定义渲染start-->
			<slot v-if="$slots[slotItem.slots.customRender]" :name="slotItem.slots.customRender" v-bind="slotProps"></slot>
			<!--        自定义渲染end-->

			<!--     非自定义渲染start -->
			<template v-else>
				<!--        非操作 start-->
				<template v-if="slotItem.slots.customRender !== 'action'">
					<!--        使用自定义组件格式化显示start-->
					<template v-if="slotItem.slotsType == 'component'">
						<component :is="slotItem.slotsFunc(slotProps.record)" />
					</template>
					<!--        使用自定义组件格式化显示end-->
					<!--        使用自定义函数格式化显示-->
					<template v-if="slotItem.slotsType == 'format'">
						{{ slotItem.slotsFunc(slotProps.record[slotItem.dataIndex || slotItem.key], slotProps.record) }}
					</template>
					<!--        链接用于跳转-->
					<template v-if="slotItem.slotsType == 'link'">
						<router-link :to="slotItem.linkPath + slotProps.record[slotItem.linkId]">{{ slotProps.text }}</router-link>
					</template>
				</template>
				<!--      非操作 end-->

				<!--        操作start-->
				<div v-if="slotItem.slots.customRender == 'action'" :key="slotItem.slots.customRender" class="actions">
					<!--        对表格的操作动作start-->
					<template v-for="(action, index) in actions">
						<template v-if="action.type == 'select'">
							<!--              下拉选择器-->
							<a-select v-model:value="slotProps.record[action.key]" :key="index" size="small">
								<Option v-for="option in action.options" :value="option.value" :key="option.value">
									{{ option.label }}
								</Option>
							</a-select>
						</template>
						<!--            编辑按钮-->
						<template v-if="action.type == 'button'">
							<a-button v-bind="{ ...buttonProps, ...action.props }" @click="actionEvent(slotProps.record, action.func)" :key="index">
								{{ action.text }}
							</a-button>
						</template>
						<!--            删除按钮 气泡确认框-->
						<template v-if="action.type == 'popconfirm'">
							<a-popconfirm :key="index" placement="leftTop" @confirm="actionEvent(slotProps.record, action.func, 'del')">
								<template v-slot:title> 您确定要删除吗？ </template>
								<a-button v-bind="{ ...buttonProps, ...action.props }">
									{{ action.text }}
								</a-button>
							</a-popconfirm>
						</template>
					</template>
					<!--        对表格的操作动作end-->
				</div>
				<!--      操作end-->
			</template>
			<!--      非自定义渲染end-->
		</template>
		<!--    是否有自定义显示slots end-->
	</a-table>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs } from 'vue';
import { Card, Select, Table, Popconfirm, message, Pagination } from 'ant-design-vue';
import { TableProps } from 'ant-design-vue/lib/table/interface';
import { usePages } from '@/hooks';
import { useDraggable, useDragCol } from './hooks';
import { Columns, pageOption, Props } from './type';
export default defineComponent({
	name: 'basicTable',
	props: {
		columns: {
			//表格数据列
			type: Object as PropType<Columns[]>,
		},
		getListFunc: {
			//获取数据API
			type: Function,
		},
		rowSelection: {
			//选中行
			type: Object,
		},
		rowKey: {
			//表格唯一主键
			type: [String, Function] as PropType<string | ((record: any) => string)>,
		},
		childrenColumnName: {
			type: String,
			default: 'children',
		},
		pageOption: {
			type: Object as PropType<pageOption>,
			default: () => ({}),
		},
	},
	components: {
		[Table.name]: Table,
		[Card.name]: Card,
		[Select.name]: Select,
		[Popconfirm.name]: Popconfirm,
		Option: Select.Option,
	},
	setup(props: Props, { attrs, emit, slots }) {
		const { pageOption } = usePages();

		//表格收缩
		useDragCol(props.columns);

		const state = reactive({
			extendItemRefs: {},
			customRow: () => ({} as TableProps['customRow']),
			data: [],
			pageOption: Object.assign(pageOption, props.pageOption),
			actions: props.columns.find((item) => (item.dataIndex || item.key) == 'action')?.actions || [], //表格操作
			loading: false, //表格加载
			childrenColumnName: props.childrenColumnName ?? 'children',
		});

		//刷新表格
		const refreshTableData = async (params = {}) => {
			params = {
				pageIndex: state.pageOption.current,
				pageSize: state.pageOption.pageSize,
				...props.pageOption,
				...params,
			};
			state.loading = true;
			const { data, pageIndex, pageSize, totalCount } = await props.getListFunc(params).finally(() => (state.loading = false));
			Object.assign(state.pageOption, { current: ~~pageIndex, pageSize: ~~pageSize, total: totalCount });
			state.data = deleteChildren(data);
			state.customRow = useDraggable<any>(state.data)!;
		};

		const deleteChildren = (data) => {
			for (let i = 0; i < data.length; i++) {
				if (state.childrenColumnName === 'children') {
					if (data[i].children) {
						if (data[i].children.length <= 0) {
							delete data[i].children;
						} else {
							deleteChildren(data[i].children);
						}
					}
				} else {
					if (data[i].childList) {
						if (data[i].childList.length <= 0) {
							delete data[i].childList;
						} else {
							deleteChildren(data[i].childList);
						}
					}
				}
			}
			return data;
		};

		refreshTableData();

		//操作事件
		const actionEvent = async (record, func, actionType) => {
			// 将refreshTableData放入宏任务中,等待当前微任务拿到结果进行判断操作，再请求表格数据
			await func({ record, props }, () => setTimeout(() => refreshTableData()));
			// 如果为删除操作,并且删除成功，当前的表格数据条数小于2条,则当前页数减一,即请求前一页
			if (actionType == 'del' && state.data.length < 2) {
				state.pageOption.current = Math.max(1, state.pageOption.current - 1);
			}
		};

		const paginationChange = (pagination, filters, sorter) => {
			const { field, order } = sorter;
			state.pageOption = {
				...state.pageOption,
				...pagination,
			};
			refreshTableData({
				pageSize: pagination.pageSize,
				pageIndex: pagination.current,
				...props.pageOption,
				...filters,
				field,
				order,
			});
		};

		const buttonProps = {
			size: 'small',
		};

		return {
			...toRefs(state),
			buttonProps,
			actionEvent,
			refreshTableData,
			paginationChange,
		};
	},
});
</script>

<style lang="less" scoped>
::v-deep(.ant-table) {
	padding: 24px 0px;
}
::v-deep(.ant-table-bordered .ant-table-thead > tr > th) {
	border-right: 0;
}
::v-deep(.ant-table-bordered .ant-table-tbody > tr > td) {
	border-right: 0;
}
::v-deep(.ant-table-thead > tr > th) {
	border-bottom: 1px solid #dddee3;
	background: #fff;
	color: rgba(0, 0, 0, 0.65);
}
::v-deep(.ant-table-bordered .ant-table-body > table) {
	border: 0;
}
::v-deep(.ant-table-tbody > tr > td) {
	border-bottom: 1px solid #dddee3;
	color: #262626;
}
::v-deep(.table-striped) {
	background-color: #e6f7ff;
}
.actions > * {
	margin-right: 10px;
}
</style>