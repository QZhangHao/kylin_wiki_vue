<template>
	<div class="user-layout-wrapper">
		<div class="container">
			<div class="user-layout-content">
				<div class="top">
					<div class="header">
						<a>
							<img src="../../assets/images/logo.png" alt="kylin.wiki" class="logo" />
							<span class="title">麒麟Wiki</span>
						</a>
					</div>
					<div class="desc">Kylin.wiki</div>
				</div>
				<div class="main">
					<a-form layout="horizontal" :model="formInline" @submit="handleSubmit">
						<a-form-item>
							<a-input v-model:value="formInline.username" size="large" placeholder="please input username">
								<template v-slot:prefix>
									<user-outlined type="user" />
								</template>
							</a-input>
						</a-form-item>
						<a-form-item>
							<a-input-password v-model:value="formInline.password" size="large" placeholder="please input password">
								<template v-slot:prefix>
									<lock-outlined type="user" />
								</template>
							</a-input-password>
						</a-form-item>
						<a-form-item>
							<a-button type="primary" html-type="submit" size="large" :loading="loading" block> 登录 </a-button>
						</a-form-item>
					</a-form>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { UserActionTypes } from '@/store/modules/user/actions';
export default defineComponent({
	name: 'login',
	components: { UserOutlined, LockOutlined },
	setup() {
		const state = reactive({
			loading: false,
			formInline: {
				username: '',
				password: '',
			},
		});

		const store = useStore();
		const router = useRouter();
		const route = useRoute();

		const handleSubmit = async () => {
			const { username, password } = state.formInline; 
			if (username.trim() == '' || password.trim() == '') return message.warning('用户名或密码不能为空！');
			const hide = message.loading('登录中....', 0);

			state.loading = true;
			const params = {
				username,
				password,
			};

			const { code, result, message: msg } = await store.dispatch(UserActionTypes.Login, params).finally(() => {
				state.loading = false;
				message.destroy();
			});
			if (code == 200) {
				const toPath = decodeURIComponent((route.query?.redirect || '/') as string); 
				message.success('登录成功！');
				router.replace(toPath).then((_) => {
					if (route.name == 'login') {
						router.replace('/');
					}
				});
				store.dispatch(UserActionTypes.GetInfo)
				router.push('/');
			} else {
				message.info(msg || '登录失败');
			}
		};

		return {
			...toRefs(state),
			handleSubmit,
		};
	},
});
</script>

<style lang="less" scoped>
.user-layout-wrapper {
	height: 100vh;
	.container {
		width: 100%;
		min-height: 100%;
		background: #f0f2f5 url(../../assets/images/background.a568162c.svg) no-repeat 50%;
		background-size: 100%;
		position: relative;
		padding-top: 240px;
	}
	.user-layout-content {
		padding: 32px 0 24px;
		.top {
			text-align: center;
			.header {
				height: 44px;
				line-height: 44px;
				.logo {
					height: 44px;
					vertical-align: top;
					margin-right: 16px;
					border-style: none;
				}
				.title {
					font-size: 33px;
					color: rgba(0, 0, 0, 0.85);
					font-weight: 600;
					position: relative;
					top: 2px;
					background-color: #f0f2f5;
				}
			}
			.desc {
				font-size: 14px;
				color: rgba(0, 0, 0, 0.45);
				margin-top: 12px;
				margin-bottom: 40px;
			}
		}
		.main {
			min-width: 260px;
			width: 368px;
			margin: 0 auto;
		}
	}

	::v-deep(.ant-form) {
		width: 400px;

		.ant-col {
			width: 100%;
		}
		.ant-form-item-label {
			padding-right: 6px;
		}
	}
}
</style>