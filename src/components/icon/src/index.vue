<template>
	<span ref="elRef" :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']" :style="getWrapStyle"></span>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, watch, onMounted, nextTick, unref, computed, CSSProperties } from 'vue';

import Iconify from '@purge-icons/generated';
import { isString } from '@/utils/is';
import { propTypes } from '@/utils/propTypes';

const SVG_END_WITH_FLAG = '|svg';
export default defineComponent({
	name: 'GIcon',
	props: {
		// icon name
		icon: propTypes.string,
		// icon color
		color: propTypes.string,
		// icon size
		size: {
			type: [String, Number] as PropType<string | number>,
			default: 16,
		},
		spin: propTypes.bool.def(false),
		prefix: propTypes.string.def(''),
	},
	setup(props) {
		const elRef = ref<ElRef>(null);

		const getSvgIcon = computed(() => props.icon.replace(SVG_END_WITH_FLAG, ''));
		const getIconRef = computed(() => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`);

		const update = async () => {
			const el = unref(elRef);
			if (!el) return;

			await nextTick();
			const icon = unref(getIconRef);
			if (!icon) return;

			const svg = Iconify.renderSVG(icon, {});
			if (svg) {
				el.textContent = '';
				el.appendChild(svg);
			} else {
				const span = document.createElement('span');
				span.className = 'iconify';
				span.dataset.icon = icon;
				el.textContent = '';
				el.appendChild(span);
			}
		};

		const getWrapStyle = computed(
			(): CSSProperties => {
				const { size, color } = props;
				let fs = size;
				if (isString(size)) {
					fs = parseInt(size, 10);
				}

				return {
					fontSize: `${fs}px`,
					color: color,
					display: 'inline-flex',
				};
			}
		);

		watch(() => props.icon, update, { flush: 'post' });

		onMounted(update);

		return { elRef, getWrapStyle, getSvgIcon };
	},
});
</script>
<style lang="less" >
.app-iconify {
	display: inline-block; 
	vertical-align:none;
	&-spin {
		svg {
			animation: loadingCircle 1s infinite linear;
		}
	}
}

span.iconify {
	display: block;
	min-width: 1em;
	min-height: 1em;
	background-color: #5551;
	border-radius: 100%;
}
</style>
