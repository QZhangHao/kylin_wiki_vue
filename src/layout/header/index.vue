<template>
	<ALayoutHeader class="layout-header">
		<div class="left-options">
			<span @click="() => $emit('update:collapsed', !collapsed)" class="menu-fold">
				<component :is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'" />
			</span>
			<a-breadcrumb>
				<template v-for="routeItem in route.matched" :key="routeItem.name">
					<a-breadcrumb-item>
						<a>{{ routeItem.meta.title }}</a>
						<template v-slot:overlay>
							<a-menu v-if="routeItem.children.length">
								<template v-for="childItem in routeItem.children">
									<a-menu-item v-if="!childItem.meta.hidden" :key="childItem.name">
										<router-link :to="{ name: childItem.name }">
											{{ childItem.meta.title }}
										</router-link>
									</a-menu-item>
								</template>
							</a-menu>
						</template>
					</a-breadcrumb-item>
				</template>
			</a-breadcrumb>
		</div>
		<div class="right-options">
			<a target="_blank" href="https://www.baidu.com">
				<GithubOutlined />
			</a>
			<a target="_blank" href="https://www.baidu.com">
				<icon icon="simple-icons:gitee" style="fontsize: 14"></icon>
			</a>
			<!--      切换全屏-->
			<component :is="fullscreenIcon" @click="toggleFullScreen" />
			<Dropdown>
				<a-avatar :src="avatar">{{ username }}</a-avatar>
				<template v-slot:overlay>
					<a-menu>
						<a-menu-item>
							<a @click.prevent="doLogout"><poweroff-outlined /> 退出登录</a>
						</a-menu-item>
					</a-menu>
				</template>
			</Dropdown>
		</div>
	</ALayoutHeader>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, createVNode } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { message, Modal } from 'ant-design-vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { useStore } from '@/store';
import components from '@/layout/header/component';
import { UserActionTypes } from '@/store/modules/user/actions';
import { TABS_ROUTES } from '@/store/mutation-types';
import Icon from '@/components/Icon';

export default {
	name: 'PageHeader',
	components: { ...components, Icon },
	props: {
		collapsed: {
			type: Boolean,
		},
	},
	setup() {
		const store = useStore();

		const state = reactive({
			username: store.getters.userInfo.userInfo.userName,
			fullscreenIcon: 'FullscreenOutlined',
			avatar: store.getters.userInfo.userInfo.avatar,
		});

		const router = useRouter();
		const route = useRoute();

		const doLogout = () => {
			Modal.confirm({
				title: '您确定要退出登录吗？',
				icon: createVNode(QuestionCircleOutlined),
				onOk() {
					console.log(router, '退出登录');

					store.dispatch(UserActionTypes.Logout).then((res) => {
						message.success('成功退出登录');
						// 移除标签页
						localStorage.removeItem(TABS_ROUTES);
						router
							.replace({
								name: 'login',
								query: {
									redirect: route.fullPath,
								},
							})
							.finally(() => location.reload());
					});
				},
			});
		};

		// 切换全屏图标
		const toggleFullscreenIcon = () => (state.fullscreenIcon = document.fullscreenElement !== null ? 'FullscreenExitOutlined' : 'FullscreenOutlined');

		// 监听全屏切换事件
		document.addEventListener('fullscreenchange', toggleFullscreenIcon);

		const toggleFullScreen = () => {
			if (!document.fullscreenElement) {
				document.documentElement.requestFullscreen();
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				}
			}
		};

		const iconList = [
			{
				icon: 'SearchOutlined',
				tips: '搜索',
				eventObject: () => {
					window.open('https://baidu.com');
				},
			},
			{
				icon: 'GithubOutlined',
				tips: 'Github',
			},
		];

		return {
			...toRefs(state),
			iconList,
			toggleFullScreen,
			doLogout,
			route,
		};
	},
};
</script>

<style lang="less" scoped>
.layout-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	z-index: 10;
	background-color: #fff;
	padding: 0;
	height: 48px;

	.left-options {
		display: flex;
		align-items: center;

		.menu-fold {
			padding: 0 24px;
			cursor: pointer;
		}
	}

	.right-options {
		display: flex;
		align-items: center;

		> * {
			margin-right: 20px;
			cursor: pointer;
		}
	}
}
</style>