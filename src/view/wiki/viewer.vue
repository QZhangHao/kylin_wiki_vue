<template>
	<div class="root">
		<div class="root-operation">
			<div class="button-style"><a class="new-button default h-28">分享</a></div>
			<button class="button-style new-button default h-28" @click="edit(document)">编辑文档</button>
		</div>
		<div class="scroll-content">
			<div class="content">
				<div class="wiki">
					<div class="wiki-content">
						<div class="crumbs mg-top-max"></div>
						<h1 class="wiki-title">{{ document.documentName }}</h1>
						<div class="wiki-info"> 
							<span v-if="document.updateOn" class="updater-p" :title="document.updateBy">{{ document.updateBy }}更新于&nbsp;{{ document.updateOn }}</span>
							<span v-if="document.createOn" class="dot">·</span>
							<span v-if="document.createOn" class="creator" :title="document.createBy">{{ document.createBy }}创建于&nbsp;{{ document.createOn }}</span>
						</div>
						<div class="graph-markdown-36pAhy8Y-m">
							<template v-if="document.content&&document.content!='不存在相应的目录'">
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
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { propTypes } from '@/utils/propTypes';
import marked from 'marked';
import { state } from '@/store/modules/router/state';
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
export default defineComponent({
	name: 'wiki_viewer',
	props: {
		document: {
			type: Object,
		},
	},
	components: {
		marked,
	},
	emits:['change'],
	setup(props,{ attrs, emit }) {

		const edit=(v:Object)=>{ 
			emit('change',v)
		}
		return {
			edit,
			marked,
		};
	},
});
</script>

