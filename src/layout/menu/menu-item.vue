<template>
	<template v-if="!menuInfo.meta.isHide">
		<template v-if="menuInfo.children?.length">
			<a-menu-item v-if="menuInfo.children.filter((x) => x.meta.isHide)[0]?.meta.isHide" :key="menuInfo.name" >
				<icon style="color: aliceblue" :icon="menuInfo.meta.icon" />
				<span>{{ menuInfo.meta.title }}</span>
			</a-menu-item>
			<a-sub-menu v-else :key="menuInfo.name" v-bind="$attrs">
				<template v-slot:title>
					<span>
						<icon style="color: aliceblue" :icon="menuInfo.meta.icon" />
						<span>{{ menuInfo.meta.title }}</span>
					</span>
				</template>
				<template v-for="item in menuInfo.children" :key="item.name">
					<template v-if="!item.children">
						<a-menu-item :key="item.name">
							<icon style="color: aliceblue" :icon="menuInfo.meta.icon" />
							<span>{{ item.meta.title }}</span>
						</a-menu-item>
					</template>
					<template v-else>
						<menu-item :menu-info="item" :key="item.name" />
					</template>
				</template>
			</a-sub-menu>
		</template>
		<a-menu-item v-else :key="menuInfo.name">
			<icon style="color: aliceblue" :icon="menuInfo.meta.icon" />
			<span>{{ menuInfo.meta.title }}</span>
		</a-menu-item>
	</template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Menu } from 'ant-design-vue';
import Icon from '@/components/Icon';
export default defineComponent({
	name: 'menu-item',
	components: {
		'a-sub-menu': Menu.SubMenu,
		'a-menu-item': Menu.Item,
		Icon,
	},
	props: {
		menuInfo: {
			typo: Object,
			default: () => ({}),
		},
	},
	setup() {},
});
</script>

<style lang="less" scoped>
</style>