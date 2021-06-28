<template>
	<div class="wiki-container">
		<div class="navigator">
			<div class="navigator-header">
				<div class="module-name">Wiki</div>
				<div class="module-operations">
					<span class="wiki-create-button" @click="create">
						<span class="wiki-create-icon" alt="提示"></span>
					</span>
				</div>
			</div>
			<div class="article-tree">
				<div class="wiki-tree">
					<ol>
						<tree :tree="list"></tree>
					</ol>
				</div>
			</div>
			<span class="menu-separator"></span>
		</div>
		<div class="content">
			<viewer v-if="modeType == 1"></viewer>
			<editor v-else :value="valueRef"  @change="handleChange"  ref="markDownRef"></editor>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue';
import { getDocumentList } from '@/api/document';
import Tree from '@/components/tree/tree.vue';
import Viewer from './viewer.vue';
import Editor from './editor.vue';
import Vditor from 'vditor';
export interface MarkDownActionType {
	getVditor: () => Vditor;
}
export default defineComponent({
	name: 'wiki',
	components: {
		Tree,
		Viewer,
		Editor,
	},
	setup() {
		const markDownRef = ref<Nullable<MarkDownActionType>>(null);
		const valueRef = ref(`
# title

# content
`);

		const state = reactive({
			list: [] as any[],
			selectId: 0,
			modeType: 2, //模式1查看2编辑
		});

		onMounted(async () => {
			const { data } = await getDocumentList();
			state.list = data;
			state.selectId = data[0].id;
		});

		const create = () => {
			state.modeType = 2;
		};
		function handleChange(v: string) {
			valueRef.value = v;
		}
		return {
			create,
			handleChange,
			valueRef,
			markDownRef,
			...toRefs(state),
		};
	},
});
</script>

<style lang="less" scoped>
::v-deep(.view-content) {
	padding: 0;
}
</style>