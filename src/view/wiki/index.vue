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
			<editor v-else :value="valueRef" :document="editDocument" @change="handleChange" ref="markDownRef"></editor>
		</div>
	</div>
	<a-modal v-model:visible="visible" title="系统提示" @ok="handleOk">
		<p>确认删除吗？</p>
	</a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, unref, onMounted, onUnmounted, watch } from 'vue';
import { getDocumentList, getDocument, deleteDocument } from '@/api/document';
import Tree from '@/components/tree/tree.vue';
import Viewer from './viewer.vue';
import Editor from './editor.vue';
import Vditor from 'vditor';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useStore } from '@/store';

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
		const store = useStore();

		const markDownRef = ref<Nullable<MarkDownActionType>>(null);
		const state = reactive({
			list: [] as any[],
			selectId: 0,
			modeType: 1, //模式1查看2编辑
			document: {},
			valueRef: '',
			editDocument: {},
			visible: false,
		});

		const init = async () => {
			const { data } = await getDocumentList();
			state.list = data;
			state.selectId = data[0].id;
			if (state.selectId != 0) {
				const { data } = await getDocument({ wikiID: state.selectId, userId: store.getters.userInfo.userInfo.userID });
				state.document = data;
			}
		};

		onMounted(() => {
			init();
		});
		watch(
			() => state.selectId,
			async (selectId) => {
				const { data } = await getDocument({ wikiID: state.selectId, userId: store.getters.userInfo.userInfo.userID });
				state.document = data;
			}
		);

		const create = () => {
			const document = {
				pid: 0,
				content: 0,
			};
			state.editDocument = document;
			state.valueRef = '';
			state.modeType = 2;
		};
		function handleChange() {
			state.modeType = 1;
			init();
		}
		function viewerChange(v) {
			state.valueRef = v.content;
			state.editDocument = v;
			state.modeType = 2;
		}
		function treeChange(v, w) {
			state.selectId = w;
			if (v === 1) {
				const document = {
					documentName: '',
					pid: state.selectId,
					content: 0,
				};
				state.editDocument = document;
				state.valueRef = '';
				state.modeType = 2;
			} else if (v === 2) {
				state.visible = true;
			}
		}
		const handleOk = () => {
			deleteDocument(state.selectId).then((res) => {
				state.visible = false;
				init();
			});
		};

		return {
			create,
			handleChange,
			viewerChange,
			treeChange,
			handleOk,
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