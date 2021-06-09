<template>
	<a-layout class="layout">
		<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapseible class="layout-sider">
			<!--      网站logo start-->
			<logo :collapsed="collapsed" />
			<!--      网站logo end-->
			<!--      侧边菜单栏start-->
			<aside-menu :collapsed="collapsed" />

			<!--      侧边菜单栏end-->
		</a-layout-sider>
		<a-layout>
			<!--      页头 start-->
			<page-header v-model:collapsed="collapsed" />
			<!--      页头end-->
			<!--      内容区域start-->
			<a-layout-content class="layout-content">
			<tabs-view />
			</a-layout-content>
			<!--      内容区域end-->
			<!--      页脚start--> 
			<Footer />
			<!--      页脚end-->
		</a-layout>
	</a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, h, computed } from 'vue';
import { Layout, message } from 'ant-design-vue';
import Logo from './logo/index.vue';
import { TabsView } from './tabs';
import AsideMenu from './menu/menu.vue';
import PageHeader from './header/index.vue';
import Footer from './footer/index.vue';


export default defineComponent({
	name: 'Layout',
	components: {
		TabsView,
		PageHeader,
		AsideMenu,
		Logo,
		Footer,
		[Layout.name]: Layout,
		[Layout.Content.name]: Layout.Content,
		[Layout.Sider.name]: Layout.Sider,
	},
	setup() {
		const collapsed = ref<boolean>(false);

		const testMsg = () => {
			message.success(h('span', '啥子'), 2);
		};

		const asiderWidth = computed(() => (collapsed.value ? '80px' : '256px'));

		return {
			collapsed,
			testMsg,
			asiderWidth,
		};
	},
});
</script>

<style lang="scss" scoped>
.layout {
	display: flex;
	overflow: hidden;
	height: 100vh;

	.layout-sider {
	}

	.ant-layout {
		overflow: hidden;
	}

	.layout-content {
		flex: none;
	}
}
</style>
