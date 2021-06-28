<template>
	<Bar type="primary"  v-auth="'system:menu:add'" postIcon="codicon:add" :onclick="addItem" :isShowDivider="false">创建</Bar>
	<div class="table-view">
		<basic-table ref="tableRef" :columns="columns" :pageOption="pageOption" :defaultExpandAllRows="true" :getListFunc="getListByPage" rowKey="menuID" childrenColumnName="childList">
		</basic-table>
	</div>
</template>


<script lang="ts">
import { defineComponent, ref, reactive, toRefs, createVNode } from 'vue';
import { Bar } from '@/components/bar';
import { BasicTable } from '@/components/basicTable';
import { getListByPage, deleteMenu, updateMenu, createMenu } from '@/api/menu';
import { TableColumn } from '@/hooks/tableColumn';
import { formatDate } from '@/utils/common';
import Icon from '@/components/Icon';
import { Tag } from 'ant-design-vue';
import AddModal from './add-modal.vue';
import { useCreateModal } from '@/hooks/useCreateModal';

const columns: TableColumn[] = [
	{
		title: '菜单名称',
		dataIndex: 'menuName',
	},
	{
		title: '图标',
		dataIndex: 'meta.icon',
		slots: {
			customRender: 'meta.icon',
		},
		slotsType: 'component',
		slotsFunc: (record) => createVNode(Icon, { icon: record.meta.icon }), // 动态创建图标
	},
	{
		title: '排序',
		dataIndex: 'orderNum',
	},
	{
		title: '系统路径',
		dataIndex: 'path',
	},
	{
		title: '菜单类型',
		dataIndex: 'menuType',
		slots: {
			customRender: 'menuType',
		},
		slotsType: 'component',
		slotsFunc: (record) =>
			createVNode(Tag, {
				color: 'cyan',
				key: record.menuType,
				innerHTML: record.menuType == 'M' ? '目录' : record.menuType == 'C' ? '菜单' : '按钮',
			}),
	},
	{
		title: '创建时间',
		dataIndex: 'createOn',
		slots: {
			customRender: 'createOn',
		},
		slotsType: 'format',
		slotsFunc: (val) => formatDate(val),
	},
	{
		title: '最后更新时间',
		dataIndex: 'updateOn',
		slots: {
			customRender: 'updateOn',
		},
		slotsType: 'format',
		slotsFunc: (val) => formatDate(val),
	},

	{
		title: '操作',
		dataIndex: 'action',
		width: 200,
		slots: {
			customRender: 'action',
		},
		actions: [
			{
				type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
				text: '删除',
				permission: 'system:menu:delete',
				props: {
					type: 'danger',
				},
				func: async ({ record }, refreshTableData) => await deleteMenu(record.menuID).then(() => refreshTableData()),
			},
			{
				type: 'button', // 控制类型，默认为a,可选： select | button | text
				text: '编辑',
				permission: 'system:menu:edit',//权限
				props: {
					type: 'primary',
				},
				func: ({ record }, callback) =>
					useCreateModal(AddModal, {
						// 点击删除的回调
						fields: record,
						callback,
					}),
			},
		],
	},
];
export default defineComponent({
	name: 'menuList',
	components: { Bar, BasicTable },
	setup() {
		const tableRef = ref<any>(null);
		const state = reactive({
			tableLoading: false,
			rowSelection: {
				onChange: (selectedRowKeys, selectedRows) => {
					state.rowSelection.selectedRowKeys = selectedRowKeys;
				},
				selectedRowKeys: [],
			},
			pageOption:{
				pageSize:2000
			}
		});

		// 添加账号
		const addItem = () => {
			useCreateModal(AddModal, {
				callback: () => {
					tableRef.value.refreshTableData();
				},
			});
		}; 

		return {
			...toRefs(state),
			addItem,
			tableRef,
			getListByPage,
			columns,
		};
	},
});
</script>


<style lang="less" scoped>
.table-view {
	width: 100%;
	background: #fff;
	margin-top: 24px;
	box-shadow: 1px 1px 1px 1px #e9ecf3;
	padding: 0px 24px;
	border-radius: 4px;
}
</style>