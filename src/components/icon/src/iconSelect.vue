<template>
	<div class="icon-select">
		<a-popover placement="bottom" v-model:visible="fontIconVisible" trigger="click" class="icon-select-popper">
			<template #content>
				<div class="icon-select-warp">
					<div class="icon-select-warp-row">
						<a-row :gutter="10">
							<a-col  @click="onColClick(v, k)" v-for="(v, k) in fontIconSheetsList" :key="k">
								<div class="icon-select-warp-item" :class="{ 'icon-select-active': fontIconIndex === k }">
									<div class="flex-margin">
										<div class="icon-select-warp-item-value">
											<Icon :icon="v" style="font-size:20px" />
										</div>
									</div>
								</div>
							</a-col>
						</a-row>
					</div>
				</div>
			</template>
			<a-input v-model:value="fontIcon" placeholder="请点击选择图标" allowClear ref="inputWidthRef"> </a-input>
		</a-popover>
	</div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, onMounted, nextTick, computed, defineComponent } from 'vue';
import { Input, Popover, Row, Col } from 'ant-design-vue';
import {CloseOutlined  } from '@ant-design/icons-vue'
import {Icon} from '@/components/Icon';
import iconsData from '@/components/Icon/data/icons.data'
export default defineComponent({
	name: 'iconSelect',
	props: {
		// 出现位置
		placement: {
			type: String,
			default: () => 'bottom',
		},
		value: {
			type: String,
			default: () => [],
		},
	},
	components: {
		[Input.name]: Input,
		[Popover.name]: Popover,
		[Row.name]: Row,
		[Col.name]: Col,
		Icon,
		CloseOutlined
	},
	emits: ['update:value'], // 双向数据绑定
	setup(props, { emit }) { 
			  // 已勾选的节点
		const IconValue = computed({
			get: () => props.value,
			set: (val: any) => emit('update:value',val),
		}) 
		const state: any = reactive({
			fontIcon: props.value, 
			fontIconIndex:'',
			fontIconVisible: false,   
			fontIconSheetsList: [],
		}); 
	
		// 初始化数据
		const initFontIconData = () => {
			const data = iconsData as any; 
			const prefix: string = data?.prefix ?? '';
			let result: string[] = [];
			if (prefix) {
				result = (data?.icons ?? []).map((item) => `${prefix}:${item}`);
			} else if (Array.isArray(iconsData)) {
				result = iconsData as string[];
			}
			state.fontIconSheetsList = result;
		};
		// 当前项点击
		const onColClick = (v: any, k: number) => { 
			state.fontIconIndex = k;
			state.fontIcon = v;
			state.fontIconVisible = false; 
			IconValue.value=v 
		}; 
		// 页面加载时
		onMounted(() => {
			initFontIconData();  
		});
		return { 
			onColClick, 
			IconValue,
			...toRefs(state),
		};
	},
});
</script>


<style lang="less" scoped>
.icon-select-warp {
	width: 490px;
}
.icon-select-warp-title {
	height: 40px;
	line-height: 40px;
	padding: 0 15px;
}
.icon-select-warp-row {
	max-height: 260px;
	overflow-x: hidden;
	overflow-y: auto;
	border-top: 1px solid #ebeef5;
	.icon-select-warp-item {
		display: flex;
		border: 1px solid #ebeef5;
		padding: 2px 5px;
		border-radius: 4px;
		margin-bottom: 5px;
		transition: all 0.3s ease;
		.icon-select-warp-item-value {
			transition: all 0.3s ease;
			i {
				font-size: 20px;
				color: #606266;
			}
		}
		&:hover {
			border: 1px solid #409eff;
			cursor: pointer;
			transition: all 0.3s ease;
			.icon-select-warp-item-value {
				i {
					color: #409eff;
					transition: all 0.3s ease;
				}
			}
		}
	}
	.icon-select-active {
		border: 1px solid #409eff;
		.icon-selector-warp-item-value {
			i {
				color: #409eff;
			}
		}
	}
}
.icon-select-all {
	&-tabs {
		display: flex;
		height: 30px;
		line-height: 30px;
		padding: 0 15px;
		margin-bottom: 5px;
		&-item {
			flex: 1;
			text-align: center;
			cursor: pointer;
			&:hover {
				color: #409eff;
			}
		}
		&-active {
			background: #409eff;
			border-radius: 5px;
			.label {
				color: #ffffff;
			}
		}
	}
}
</style>