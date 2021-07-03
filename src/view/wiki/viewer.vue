<template>
	<div class="root">
		<div class="root-operation" v-if="document.permission==1">
			<div class="button-style" ><a class="new-button default h-28" @click="share(document)">分享</a></div>
			<button class="button-style new-button default h-28" @click="edit(document)" >编辑文档</button>
		</div>
		<div class="scroll-content">
			<div class="content">
				<div class="wiki">
					<div class="wiki-content">
						<div class="crumbs mg-top-max"></div>
						<h1 class="wiki-title">{{ document.documentName }}</h1>
						<div class="wiki-info">
							<span v-if="document.updateOn" class="updater-p" :title="document.updateBy"
								>{{ document.updateBy }}更新于&nbsp;{{ document.updateOn }}</span
							>
							<span v-if="document.createOn" class="dot">·</span>
							<span v-if="document.createOn" class="creator" :title="document.createBy"
								>{{ document.createBy }}创建于&nbsp;{{ document.createOn }}</span
							>
						</div>
						<div class="graph-markdown-36pAhy8Y-m">
							<template v-if="document.content && document.content != '不存在相应的目录'">
								<div class="cuk-markdown" v-html="marked(document.content)"></div>
							</template>
						</div>
					</div>
					<!-- 	<div class="outline-view-wrapper">
						<div class="outline-view" style="margin-top: 118px; height: auto">
							<div class="outline-view-root">
								<div class="outline-title">文章大纲</div>
								<ul>
									<li>
										<p><a class="" href="#user-content-亿己网需求文档">亿己网需求文档</a></p>
										<ul>
											<li><a class="" href="#user-content-1亿己网简介">1、亿己网简介</a></li>
											<li><a class="" href="#user-content-2亿己网版本">2、亿己网版本</a></li>
											<li><a class="" href="#user-content-3亿己网功能结构图">3、亿己网功能结构图</a></li>
											<li><a class="" href="#user-content-4亿己网模块">4、亿己网模块</a></li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>
	<a-modal v-model:visible="visible" title="分享Wiki" :footer="null" :width="860">
		<a-row style="margin-bottom: 16px">
			<a-form layout="inline">
				<a-form-item label="Wiki权限" style="width: 240px">
					<a-select ref="select" style="width: 160px" placeholder="请选择Wiki权限" v-model:value="formCreate.permission">
						<a-select-option :value="0">只读权限</a-select-option>
						<a-select-option :value="1">读写权限</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item label="用户" style="width: 360px">
					<a-select v-model:value="formCreate.userId" placeholder="请选择用户" style="width: 300px">
						<a-select-option v-for="d in userData" :key="d.value">
							{{ d.text }}
						</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item>
					<a-button type="primary" @click="createClick(document.id)">添加</a-button>
				</a-form-item>
			</a-form>
		</a-row>
		<a-table :columns="columns" :data-source="dataSource" bordered rowKey="id">
			<template #permission="{ record }">
				<div class="editable-cell">
					<div class="editable-cell-text-wrapper">
						<a-select style="width: 120px" ref="select" v-model:value="record.permission" @change="permissionChange(record)">
							<a-select-option :value="0">只读权限</a-select-option>
							<a-select-option :value="1">读写权限</a-select-option>
						</a-select>
					</div>
				</div>
			</template>
			<template #operation="{ record }">
				<a-popconfirm v-if="dataSource.length" title="确定删除吗？" @confirm="onDelete(record.id)">
					<DeleteOutlined />
				</a-popconfirm>
			</template>
		</a-table>
	</a-modal>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, Ref, ref, toRefs, UnwrapRef, watch } from 'vue';
import marked from 'marked';
import { cloneDeep } from '@/utils/lodash';
import { getDocumentUserList, updateDocumentUser, deleteDocumentUser, createDocumentUser } from '@/api/document';
import { getList } from '@/api/user';
import { EditOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

let rendererMD = new marked.Renderer();
marked.setOptions({
	renderer: rendererMD,
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
});
const columns = [
	{
		title: '用户名',
		dataIndex: 'userName',
		width: '25%',
		slots: { customRender: 'userName' },
	},
	{
		title: '姓名',
		dataIndex: 'displayName',
		width: '15%',
		slots: { customRender: 'displayName' },
	},
	{
		title: '权限',
		dataIndex: 'permission',
		width: '40%',
		slots: { customRender: 'permission' },
	},
	{
		title: '操作',
		dataIndex: 'operation',
		slots: { customRender: 'operation' },
	},
];
interface DataItem {
	id: number;
	userName: string;
	displayName: string;
	permission: number;
}
export default defineComponent({
	name: 'wiki_viewer',
	props: {
		document: {
			type: Object,
		},
	},
	components: {
		marked,
		EditOutlined,
		CheckOutlined,
		DeleteOutlined,
	},
	emits: ['change'],
	setup(props, { attrs, emit }) {
		const dataSource: Ref<DataItem[]> = ref([]);
		
		const state = reactive({
			visible: false,
			formCreate: {
				userId: undefined,
				permission: undefined,
			},
			userData: [],
			editorPermission: false, 
		});

		const edit = (v: Object) => {
			emit('change', v);
		};
		const share = async (v: Object) => {
			state.visible = true;
			if (props.document?.id) {
				const { data } = await getDocumentUserList({ wikiId: props.document?.id });
				dataSource.value = data;
				getList({}).then((res) => {
					const data = res.data.map((user) => ({
						text: user.userName,
						value: user.userID,
					}));
					state.userData = data;
				});
			}
		};
		const permissionChange = (v) => {
			const params = {
				id: v.id,
				permission: v.permission,
			};
			updateDocumentUser(params).then((res) => {
				message.success('权限修改成功');
				share(v);
			});
		};
		const onDelete = (v) => {
			deleteDocumentUser(v).then((res) => {
				message.success('删除成功');
				share(v);
			});
		};
		const createClick = (v) => {
			var params = {
				documentID: v,
				userID: state.formCreate.userId,
				permission: state.formCreate.permission,
			};
			createDocumentUser(params).then((res) => {
				message.success('添加成功');
				state.formCreate.userId = undefined;
				state.formCreate.permission = undefined;
				share(v);
			});
		}; 

		return {
			edit,
			share,
			marked,
			columns,
			dataSource,
			onDelete,
			createClick,
			permissionChange,
			...toRefs(state),
		};
	},
});
</script>
<style lang="less" scoped>
.editable-cell {
	position: relative;
	.editable-cell-input-wrapper,
	.editable-cell-text-wrapper {
		padding-right: 24px;
	}

	.editable-cell-text-wrapper {
		padding: 5px 24px 5px 5px;
	}

	.editable-cell-icon,
	.editable-cell-icon-check {
		position: absolute;
		right: 0;
		width: 20px;
		cursor: pointer;
	}

	.editable-cell-icon {
		margin-top: 4px;
	}

	.editable-cell-icon-check {
		line-height: 28px;
	}

	.editable-cell-icon:hover,
	.editable-cell-icon-check:hover {
		color: #108ee9;
	}

	.editable-add-btn {
		margin-bottom: 8px;
	}
}
.editable-cell:hover .editable-cell-icon {
	display: inline-block;
}
</style>

