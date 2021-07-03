<template>
	<template v-for="(item, index) in tree" :key="index">
		<li class="wiki-tree-item" :class="item.id === selectId ? 'is-active' : ''">
			<div class="wiki-tree-item-drop-target">
				<a class="wiki-tree-link" >
					<span
						class="wiki-tree-item-indicator is-leaf"
						:style="{ 'margin-left': item.path.split(',').length == 1 ? 0 : item.path.split(',').length * 15 + 'px' }"
					></span>
					<span class="wiki-tree-item-title" @click="selectChange(0,item.id)">
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
							<span class="wiki-tree-item-operation wiki-tree-create-button" @click="createChange(1,item.id)"></span>
							<span class="wiki-tree-item-operation wiki-tree-menu-button" @click="deleteChange(2,item.id)"></span>
						</span>
					</span>
				</a>
			</div>
		</li>
		<template v-if="item.children?.length > 0">
			<tree :tree="item.children" :selectId="selectId"  @change="selectChange"></tree>
		</template>
	</template>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { propTypes } from '@/utils/propTypes';
export default defineComponent({
	name: 'tree',
	props: {
		tree: {
			type: Object,
			default: () => ({}),
		},
		selectId: propTypes.number,
	},
	emits: ['change'],
	setup(props, { attrs, emit }) {  
		const createChange=(v,w)=>{
			emit('change',v,w)
		}
		const deleteChange=(v,w)=>{
			emit('change',v,w)
		}
		const selectChange = (v,w) => { 
			emit('change', v,w);
		};
		return { 
			createChange,
			deleteChange,
			selectChange, 
		};
	},
});
</script>