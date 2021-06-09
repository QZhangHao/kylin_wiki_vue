<template>
	<Bar type="primary" postIcon="codicon:add" :onclick="addItem" :isShowDivider="false">创建</Bar>
	<div class="table-view">
		<basic-table ref="tableRef" :columns="columns" :getListFunc="getListByPage" rowKey="deptID"> </basic-table>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { Bar } from '@/components/bar';
import { BasicTable } from '@/components/basicTable';
import { getListByPage, deleteDept, updateDept, createDept } from '@/api/dept';
import { TableColumn } from '@/hooks/tableColumn';
import { formatDate } from '@/utils/common';
import { getFormSchema } from './form-schema';
import { useFormModal } from './../../hooks/useFormModal/index';
const columns: TableColumn[] = [
	{
		title: '部门名称',
		dataIndex: 'deptName',
	},
	{
		title: '排序号',
		dataIndex: 'orderNum',
	},
	{
		title: '父级ID',
		dataIndex: 'pid',
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
				permission: {
					// 权限
					action: 'delete',
					effect: 'disabled',
				},
				props: {
					type: 'danger',
				},
				func: async ({ record }, refreshTableData) => await deleteDept(record.deptID).then(() => refreshTableData()),
			},
			{
				type: 'button', // 控制类型，默认为a,可选： select | button | text
				text: '编辑',
				permission: {
					// 权限
					action: 'update',
					effect: 'disabled',
				},
				props: {
					type: 'primary',
				},
				func: ({ record }, refreshTableData) =>
					useFormModal({
						title: '编辑用户',
						fields: { ...record },
						formSchema: getFormSchema(),
						handleOk: async (modelRef, state) => {
							const { deptName, pid, orderNum,deptID } = modelRef;
							const params = {
								DeptID:deptID,
								DeptName: deptName,
								OrderNum: orderNum,
								PID: pid,
							};
							return updateDept(params).then(() => refreshTableData());
						},
					}),
			},
		],
	},
];
export default defineComponent({
	name: 'deptList',
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
		});

		// 添加账号
		const addItem = () => {
			useFormModal({
				title: '添加部门',
				formSchema: getFormSchema(),
				handleOk: async (modelRef, state) => {
					const { deptName, pid, orderNum } = modelRef;
					const params = {
						DeptName: deptName,
						OrderNum: orderNum,
						PID: pid,
					};
					await createDept(params);
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