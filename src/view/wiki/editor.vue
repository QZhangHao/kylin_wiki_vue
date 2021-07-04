<template>
	<a-row style="margin: 8px">
		<a-col :md="20">
			<a-input type="text" name="name" class="form-control" placeholder="请输入Wiki标题" v-model:value="document.documentName" />
		</a-col>
		<a-col :md="4" style="padding-left: 12px">
			<a-button type="primary" style="margin-right: 8px" @click="editorChange">
				<template #icon><SaveOutlined /></template>
				保存
			</a-button>
			<a-button @click="cancelChange">
				<template #icon><RollbackOutlined /></template>
				取消
			</a-button>
		</a-col>
	</a-row>
	<a-row style="margin: 8px">
		<a-col :md="24">
			<div id="vditor"></div>
		</a-col>
	</a-row>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, unref, onMounted, nextTick, onUnmounted, reactive, toRef } from 'vue';
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons-vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { propTypes } from '@/utils/propTypes';
import { createDocument, updateDocument } from '@/api/document';
import { message } from 'ant-design-vue';

export default defineComponent({
	name: 'editor',
	props: {
		value: propTypes.string.def(''),
		document: propTypes.object
	},
	components: {
		SaveOutlined,
		RollbackOutlined,
	},
	emits: ['change', 'get'],
	setup(props, { attrs, emit }) {
		const contentEditor = ref<Nullable<Vditor>>(null);
		const bindValue = { ...attrs, ...props };
		function init() {
			contentEditor.value = new Vditor('vditor', {
				height: 680,
				minHeight: 680,
				width: '100%',
				mode: 'sv',
				lang: 'zh_CN',
				theme: 'classic',
				toolbarConfig: {
					pin: true,
				},
				cache: {
					enable: false,
				},
				...bindValue,
				//工具栏
				toolbar: [
					'headings',
					'bold',
					'italic',
					'strike',
					'|',
					'line',
					'quote',
					'list',
					'ordered-list',
					'check',
					'outdent',
					'indent',
					'|',
					'code',
					'inline-code',
					'undo',
					'redo',
					'link',
					'table',
					'outline',
					'br',
				],
			});
		}
		const instance = {
			getVditor: (): Vditor => contentEditor.value!,
		};

		onMounted(() => {
			nextTick(() => {
				init();
			});
			emit('get', instance);
			console.log(props.document?.id);
		});

		onUnmounted(() => {
			const vditorInstance = unref(contentEditor);
			if (!vditorInstance) return;
			try {
				vditorInstance?.destroy?.();
			} catch (error) {}
		});

		const editorChange = () => {
			const params = {
				documentName: props.document?.documentName,
				pid: props.document?.pid ?? 0,
				content: contentEditor.value?.getValue(),
				id: props.document?.id,
			};
			if (!params.documentName) {
				message.error('Wiki 标题不能为空');
				return;
			}
			if (params.id) {
				updateDocument(params)
					.then((res) => {
						message.success('添加成功');
						emit('change');
					})
					.catch((err) => {
						message.error('添加出错啦,请稍后再试');
					});
			} else {
				delete params.id;
				createDocument(params)
					.then((res) => {
						message.success('添加成功');
						emit('change');
					})
					.catch((err) => {
						message.error('添加出错啦,请稍后再试');
					});
			}
		};
		const cancelChange = () => {
			emit('change');
		};

		return {
			editorChange,
			cancelChange,
			...instance,
		};
	},
});
</script>

<style lang="less" scoped>
::v-deep(.vditor-preview__action) {
	display: none;
}
::v-deep(.vditor-sv:focus) {
	background-color: #fff;
}
::v-deep(.vditor-preview) {
	background-color: #fff;
}
</style>