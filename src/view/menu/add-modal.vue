<template>
	<a-modal :width="640" v-model:visible="visible" :confirm-loading="confirmLoading" :afterClose="remove" @ok="handleOk" title="编辑菜单">
		<a-form ref="formRef" :model="modelRef" :labelCol="labelCol" :wrapperCol="wrapperCol">
			<a-form-item label="上级菜单" :rules="rules.pid" name="pid" >
				<a-tree-select
					v-model:value="modelRef.pid"
					:replaceFields="{ children: 'childList', title: 'menuName', key: 'menuID', value: 'menuID' }"
					:dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
					:tree-data="menuList"
					placeholder="选择上级菜单"
					tree-default-expand-all
				></a-tree-select>
			</a-form-item>
			<a-form-item label="菜单类型" :rules="rules.menuType" name="menuType">
				<a-radio-group name="radioGroup" v-model:value="modelRef.menuType" @change="menuTypeChange">
					<a-radio value="M">目录</a-radio>
					<a-radio value="C">菜单</a-radio>
					<a-radio value="F">按钮</a-radio>
				</a-radio-group>
			</a-form-item>
			<a-form-item label="菜单名称" :rules="rules.menuName" name="menuName">
				<a-input v-model:value="modelRef.menuName" placeholder="请输入菜单名称" />
			</a-form-item>
			<a-form-item label="系统路径" :rules="rules.path" name="path" v-if="modelRef.type == 1">
				<a-input v-model:value="modelRef.path" placeholder="请输入路径" />
			</a-form-item>
			<a-form-item label="菜单图标"  v-if="modelRef.type == 1">
				<IconSelect v-model:value="modelRef.meta.icon"/>
			</a-form-item>
			<a-form-item label="权限标识">
				<a-input v-model:value="modelRef.meta.auth" placeholder="路由权限标识（多个请用逗号隔开）" />
			</a-form-item>
			<a-form-item label="排序">
				<a-input-number v-model:value="modelRef.orderNum" :min="1" placeholder="排序" />
			</a-form-item>
		</a-form>
	</a-modal>
</template>


<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, toRaw, ref } from 'vue';
import { Modal, Form, InputNumber, Input, Select, Radio, TreeSelect } from 'ant-design-vue';
import { getList, createMenu, updateMenu } from '@/api/menu';
import IconSelect from '@/components/Icon/src/iconSelect.vue';
export default defineComponent({
	name: 'addMenu',
	components: {
		[Modal.name]: Modal,
		[Form.name]: Form,
		[Form.Item.name]: Form.Item,
		[InputNumber.name]: InputNumber,
		[Input.name]: Input,
		[Select.name]: Select,
		[Radio.name]: Radio,
		[Radio.Group.name]: Radio.Group,
		[TreeSelect.name]: TreeSelect,
		ASelectOption: Select.Option,
		IconSelect,
	},
	props: {
		remove: {
			// 移除模态框
			type: Function,
		},
		fields: {
			type: Object,
			default: () => ({}),
		},
		callback: {
			type: Function,
		},
	},
	setup(props) {
		const formRef = ref<any>(null);
		const state = reactive({
			visible: true,
			confirmLoading: false,
			menuList: [] as any[],
		});
		const modelRef = reactive({
			menuID: undefined,
			pid: undefined,
			menuType: 'M',
			meta: {
				icon: '',
				auth:''
			},
			menuName: '',
			path: '',
			orderNum: 0,
			type: 1,
		});   
		// 如果有moduleId,则为编辑操作
		if (props.fields.menuID) {
			Object.keys(modelRef).forEach((key) => (modelRef[key] = props.fields[key]));  
			modelRef.type = props.fields.menuType =='F' ? 2 : 1;
		} 

		const rules = {
			pid: [
				{
					required: true,
					message: '上级菜单不能为空',
					type: 'number',
				},
			],
			menuType: [
				{
					required: true,
					message: '菜单类型不能为空',
				},
			],
			menuName: [
				{
					required: true,
					message: '菜单名称不能为空',
				},
			],
			path: [
				{
					required: true,
					message: '系统路径不能为空',
				},
			],
		};

		onMounted(async () => {
			// 获取模块列表
			const { data } = await getList();
			let sw = [{ menuName: '作为父级', menuID: 0, childList: data }];
			state.menuList = sw;
		});

		const menuTypeChange = (val: any) => {
			if(val.target.value==='F'){
				modelRef.type=2
			}
		};

		const handleOk = (e) => {
			e.preventDefault();
			state.confirmLoading = true;
			formRef.value
				.validate()
				.then(async () => {
					const id = props.fields.menuID;
					const data = toRaw(modelRef);
					const meta = {
						Title: data.menuName,
						IsLink: false,
						IsKeepAlive: false,
						IsHide: false,
						Icon: data.meta.icon,
						Auth: data.meta.auth.includes(',')?data.meta.auth.split(','):data.meta.auth,
					};
					const params = Object.assign(data,{meta:JSON.stringify(meta)})
					await (id ? updateMenu(params) : createMenu(params)).finally(() => (state.confirmLoading = false));
					state.visible = false;
					props.callback && props.callback();
				})
				.catch((err) => {
					console.log('error', err);
					state.confirmLoading = false;
				});
		};

		return {
			...toRefs(state),
			formRef,
			rules,
			menuTypeChange,
			labelCol: { span: 4 },
			wrapperCol: { span: 20 },
			modelRef,
			handleOk,
		};
	},
});
</script>

<style lang="less" scoped>
</style>