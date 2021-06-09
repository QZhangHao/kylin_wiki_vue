<template>
	<Bar type="primary" postIcon="codicon:add" :onclick="addItem" :isShowDivider="true">创建</Bar>
	<div class="search">
		<a-form layout="inline" :model="formState">
			<a-form-item label="用户名">
				<a-input v-model:value="formState.userName" placeholder="请输入用户名"> </a-input>
			</a-form-item>
			<a-form-item label="电话号码">
				<a-input v-model:value="formState.mobile" placeholder="请输入电话号码"> </a-input>
			</a-form-item>
			<a-form-item style="float: right">
				<a-button html-type="submit" style="margin-right: 8px" @click="reset">重置</a-button>
				<a-button type="primary" html-type="submit" @click="search">查询</a-button>
			</a-form-item>
		</a-form>
	</div>

	<div class="table-view">
		<basic-table ref="tableRef" :columns="columns" :getListFunc="getList" rowKey="userID"> </basic-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, UnwrapRef } from 'vue';
import { Bar } from '@/components/bar';
import { getList, createUser } from '@/api/user';
import { BasicTable } from '@/components/basicTable';
import { columns } from './user.data';
import { getFormSchema } from './form-schema';
import { useFormModal } from '@/hooks/useFormModal';

interface FormState {
	userName: string;
	mobile: string;
}
export default defineComponent({
	name: 'userList',
	components: { Bar, BasicTable },
	setup() {
		const tableRef = ref<any>(null);

		const formState: UnwrapRef<FormState> = reactive({
			userName: '',
			mobile: '',
		});

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
				title: '添加账号',
				formSchema: getFormSchema(),
				handleOk: async (modelRef, state) => {
					const { userName, password, roles, displayName, mobile, email, deptID, avatar } = modelRef;
					const params = {
						UserName: userName,
						Password: password,
						Roles: roles,
						DisplayName: displayName,
						Mobile: mobile,
						Email: email,
						DeptId: deptID,
						Avatar: avatar,
					};
					await createUser(params);
					tableRef.value.refreshTableData();
				},
			});
		};
		//重置
		const reset = () => {
			formState.userName = '';
			formState.mobile = '';
			tableRef.value.refreshTableData();
		};
		//查询
		const search = () => {
			const params = {
				...formState,
			};
			tableRef.value.refreshTableData(params);
		};
		return {
			...toRefs(state),
			addItem,
			columns,
			getList,
			tableRef,
			reset,
			formState,
			search,
		};
	},
});
</script>
<style lang="less" scoped>
.search {
	width: 100%;
	background: #fff;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	height: 64px;
	box-shadow: 1px 1px 1px 1px #e9ecf3;
	padding: 12px 24px 0px 24px;
}
.table-view {
	width: 100%;
	background: #fff;
	margin-top: 24px;
	box-shadow: 1px 1px 1px 1px #e9ecf3;
	padding: 0px 24px;
	border-radius: 4px;
}
</style>