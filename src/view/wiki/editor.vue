<template>
	<a-row style="margin: 8px">
		<a-col :md="20">
			<a-input type="text" name="name" class="form-control" placeholder="请输入文档名称" value="sdsdsaxzxzzxzx" />
		</a-col>
		<a-col :md="4" style="padding-left: 12px">
			<a-button type="primary" style="margin-right: 8px">
				<template #icon><SaveOutlined /></template>
				保存</a-button
			>
			<a-button>
				<template #icon><RollbackOutlined /></template>
				取消
			</a-button>
		</a-col>
	</a-row>
	<a-row style="margin: 8px">
		<a-col :md="24">
			<div ref="wrapRef"></div>
		 
		</a-col>
	</a-row>
</template>

<script lang="ts">
import { defineComponent, ref, watch, unref, onMounted, nextTick, onUnmounted } from 'vue';
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons-vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { propTypes } from '@/utils/propTypes'; 

export default defineComponent({
	name: 'editor',
	props: {
		value: propTypes.string.def(''),
	},
	components: {
		SaveOutlined,
		RollbackOutlined, 
	},
	emits: ['change', 'get'],
	setup(props, { attrs, emit }) {
		const wrapRef = ref<ElRef>(null);
		const vditorRef = ref<Nullable<Vditor>>(null);
		const initedRef = ref(false);

		//初始化Markdown编辑器
		function init() {
			const wrapEl = unref(wrapRef);
			if (!wrapEl) return;
			const bindValue = { ...attrs, ...props };
			vditorRef.value = new Vditor(wrapEl, {
				theme: 'classic',
				lang: unref('zh_CN'),
				mode: 'sv',
				preview: {
					actions: [],
				},
				input: (v) => {
					// emit('update:value', v);
					emit('change', v);
				},
				blur: () => {
					unref(vditorRef)?.setValue(props.value.toString());
				},
				...bindValue,
				cache: {
					enable: false,
				},
				minHeight:680
			});
			initedRef.value = true;
		}
		const instance = {
			getVditor: (): Vditor => vditorRef.value!,
		};

		onMounted(() => {
			nextTick(() => {
				init();
			});
			emit('get', instance);
		});

		onUnmounted(() => {
			const vditorInstance = unref(vditorRef);
			if (!vditorInstance) return;
			try {
				vditorInstance?.destroy?.();
			} catch (error) {}
		});
		return {
			wrapRef,
			...instance,
		};
	},
});
</script>

<style lang="less" scoped>
</style>