<template>
	<config-provider :locale="zhCN">
		<router-view v-slot="{ Component }">
			<transition>
				<component :is="Component" />
			</transition>
		</router-view>
	</config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { ConfigProvider } from 'ant-design-vue';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';

export default defineComponent({
	name: 'App',
	components: { ConfigProvider },
	setup() {
		const route = useRoute;
		const store = useStore;
		return {
			zhCN,
		};
	},
});
</script>
