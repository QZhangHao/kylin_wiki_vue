<template>
	<template v-for="(item, index) in tree" :key="index">
		<li class="wiki-tree-item" :class="selectedID == item.id ? 'is-active' : ''">
			<div class="wiki-tree-item-drop-target">
				<router-link class="wiki-tree-link"  :to="{name:'wiki/:wikiID',params:{wikiID:item.id}}" > 
						<span
							class="wiki-tree-item-indicator is-leaf"
							:style="{ 'margin-left': item.path.split(',').length == 1 ? 0 : item.path.split(',').length * 15 + 'px' }"
						></span>
						<span class="wiki-tree-item-title">
							<span class="wiki-tree-item-title-content" :title="item.documentName">{{ item.documentName }}</span>
						</span>
						<span class="wiki-tree-item-state">
							<span class="permission-state-wrapper">
								<div class="tag-wrapper">
									<div class="type-icon"></div>
								</div>
							</span>
						</span>
						<span class="wiki-tree-item-operations">
							<span class="optional-operation-wrapper">
								<span class="wiki-tree-item-operation wiki-tree-menu-button"></span>
								<span class="wiki-tree-item-operation wiki-tree-create-button"></span>
							</span>
						</span> 
				</router-link>
			</div>
		</li>
		<template v-if="item.children?.length > 0">
			<tree :tree="item.children"></tree>
		</template>
	</template>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
	name: 'tree',
	props: {
		tree: {
			typo: Object,
			default: () => ({}),
		},
	},
	setup() {
		const state = reactive({
			selectedID: 1,
		});

		return {
			...toRefs(state),
		};
	},
});
</script>