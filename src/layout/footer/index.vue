<template>
	<a-layout-footer class="layout-footer mt15">
		<div class="layout-footer-warp">
			<div>Kylin.Wiki，Made by Howe with ❤️</div> 
		</div>
	</a-layout-footer>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import {Layout} from 'ant-design-vue'
export default defineComponent({
	name: 'pagefooter', 
});
</script>

<style scoped lang="scss">
.layout-footer {
	width: 100%;
	display: flex;
	&-warp {
		margin: auto;
		color: #9e9e9e;
		text-align: center;
		animation: logoAnimation 0.3s ease-in-out;
	}
}
</style>
