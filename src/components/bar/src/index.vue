<template>
	<div class="content">
		<a-button :type="type" @click="onclick">
			<template #default="data">
				<Icon :icon="preIcon" v-if="preIcon" :size="14" />
				<slot v-bind="data"></slot>
				<Icon :icon="postIcon" v-if="postIcon" :size="14" />
			</template>
		</a-button>
		<a-divider v-if="isShowDivider" dashed />
	</div>
</template>

<script lang="ts">
import { propTypes } from '@/utils/propTypes';
import { defineComponent } from 'vue';
import components from './type';
import Icon from '@/components/Icon';

export default defineComponent({
	name: 'defulat',
	components: {
		...components,
		Icon,
	},
	props: {
		btnText: propTypes.string,
		type: propTypes.string,
		onclick: propTypes.func,
		preIcon: propTypes.string,
		postIcon: propTypes.string,
		isShowDivider:propTypes.bool
	},
	setup(props) {},
});
</script>

<style lang="less" scoped>
.content {
	width: 100%;
	background: #fff;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	height: 64px;
	box-shadow: 1px 1px 1px 1px rgb(233, 236, 243);
	padding: 12px 24px;
	::v-deep(.ant-divider) {
		margin: 12px 0px;
	}
	::v-deep(.ant-divider-dashed) {
		border-width: 2px 0 0;
	}
}
</style>