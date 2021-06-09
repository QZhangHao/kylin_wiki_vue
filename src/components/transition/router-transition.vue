<template>
	<div> 
		<router-view v-slot="{ Component }"> 
				<keep-alive >
					<component :is="Component" />
				</keep-alive> 
		</router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
	name: 'RouterTransition',
	props: {
		notNeedKey: {
			type: Boolean,
			default: false,
		},
		animate: {
			type: Boolean,
			default: true,
		},
	},
	setup() {
		const store = useStore();
		// 需要缓存的路由组件
		const keepAliveComponents = computed(() => store.state.asyncRoute.keepAliveComponents);

		return {
			keepAliveComponents,
		};
	},
});
</script>
