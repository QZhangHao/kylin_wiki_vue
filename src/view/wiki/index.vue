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
						<tree :tree="list" :selectId="selectId" @change="treeChange"></tree>
					</ol>
				</div>
			</div>
			<span class="menu-separator"></span>
		</div>
		<div class="content">
			<viewer v-if="modeType == 1 && document" :document="document" @change="viewerChange"></viewer>
			<editor v-else :value="valueRef" :document="document" @change="handleChange" ref="markDownRef"></editor>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, unref, onMounted, onUnmounted, watch } from 'vue';
import { getDocumentList, getDocument } from '@/api/document';
import Tree from '@/components/tree/tree.vue';
import Viewer from './viewer.vue';
import Editor from './editor.vue';
import Vditor from 'vditor';
import { useRoute, useRouter } from 'vue-router';
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
		const route = useRoute();
		const router = useRouter();
		const markDownRef = ref<Nullable<MarkDownActionType>>(null);
		const state = reactive({
			list: [] as any[],
			selectId: 0,
			modeType: 1, //模式1查看2编辑
			document: Object,
			valueRef: String,
		});

		const init = async () => {
			const { data } = await getDocumentList();
			state.list = data;
			state.selectId = data[0].id;
			const wikiID = route.params.wikiID;
			if (wikiID && wikiID != '0') {
				state.selectId = Number.parseInt(wikiID.toString());
				const { data } = await getDocument({ wikiID });
				state.document = data;
			}
		};

		onMounted(() => {
			init();
		});
		watch(
			() => route.fullPath,
			(params, prevparams) => {
				const wikiID = route.params.wikiID;
				if (!wikiID) {
					if (params == '/wiki') {
						router.push('/wiki/' + state.selectId);
					}
				} else {
					state.selectId = Number.parseInt(wikiID.toString());
				}
			}
		);
		watch(
			() => state.selectId,
			async (selectId) => {
				const { data } = await getDocument({ wikiID: selectId });
				state.document = data;
			}
		);

		const create = () => {
			state.modeType = 2;
		};
		function handleChange() {
			state.modeType = 1;
			init();
		}
		function viewerChange(v) {
			state.valueRef = v.content;
			state.document = v;
			state.modeType = 2;
			console.log(v);
		}
		function treeChange(v){
			console.log(v)
		}

		return {
			create,
			handleChange,
			viewerChange,
			treeChange,
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