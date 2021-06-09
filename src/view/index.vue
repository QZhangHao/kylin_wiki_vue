<template>
	<div class="box">
		<div class="logo">
			<img src="../assets/images/logo.png" />
			<h2  v-auth="'admin'">Kylin.Wiki</h2>
		</div>
		<!-- <a-row :gutter="15">
			<a-col :span="8">
				<a-card hoverable style="width: 300px">
					<template #cover>
						<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
					</template>
					<a-card-meta title="Card title" description="This is the description">
						<template #avatar>
							<a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
						</template>
					</a-card-meta>
				</a-card>
			</a-col>
			<a-col :span="8">b</a-col>
			<a-col :span="8">c</a-col>
		</a-row> -->
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
	name: 'defulat',
	setup(){
		const store = useStore();
		console.log(store.getters.userInfo)
	}
});
</script>


<style lang="less" scoped>
.box {
	width: 100%;
	height: calc(100vh);
	display: flex;
	flex-direction: column;
	.ant-form {
		flex: 2;
	}
	.logo {
		text-align: center;
		widows: 100%;
		align-items: center;
		img {
			width: 44px;
		}
		h2 {
			font-weight: bold;
		}
	}
}
</style>