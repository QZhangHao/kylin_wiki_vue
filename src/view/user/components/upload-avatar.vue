<template>
	<a-upload
		v-model:file-list="fileList"
		name="avatar"
		list-type="picture-card"
		class="avatar-uploader"
		:show-upload-list="false"
		action="https://localhost:5001/api/Upload"
		:before-upload="beforeUpload"
		@change="handleChange"
	>
		<img v-if="imageUrl" :src="imageUrl" alt="avatar" />
		<div v-else>
			<loading-outlined v-if="loading"></loading-outlined>
			<plus-outlined v-else></plus-outlined>
			<div class="ant-upload-text">Upload</div>
		</div>
	</a-upload>
</template>

<script lang="ts">
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message, Upload } from 'ant-design-vue';
import { defineComponent, ref, computed } from 'vue';

function getBase64(img: Blob, callback: (base64Url: string) => void) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result as string));
	reader.readAsDataURL(img);
}
export default defineComponent({
	components: {
		LoadingOutlined,
		PlusOutlined,
		[Upload.name]: Upload,
	},
	props: {
		value: {
			type: String,
			default: () => [],
		},
	},
	emits: ['update:value'], // 双向数据绑定
	setup(props, { emit }) {
		const fileList = ref([]);
		const loading = ref<boolean>(false);
		// 已勾选的节点
		const imageUrl = computed({
			get: () => props.value,
			set: (val: any) => emit('update:value', val),
		});

		const handleChange = (info: any) => {
			console.log('ww')
			if (info.file.status === 'uploading') {
				loading.value = true;
				return;
			}
			if (info.file.status === 'done') {
				// Get this url from response in real world
				imageUrl.value = "https://localhost:5001/"+info.file.response.data;
				loading.value = false;
			}
			if (info.file.status === 'error') {
				loading.value = false;
				message.error('upload error');
			}
		};

		const beforeUpload = (file: any) => {
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
			if (!isJpgOrPng) {
				message.error('You can only upload JPG file!');
			}
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				message.error('Image must smaller than 2MB!');
			}
			return isJpgOrPng && isLt2M;
		};

		return {
			fileList,
			loading,
			imageUrl,
			handleChange,
			beforeUpload,
		};
	},
});
</script>

<style>
.avatar-uploader > .ant-upload {
	width: 128px;
	height: 128px;
}
img {
	width: 128px;
	height: 128px;
}
.ant-upload-select-picture-card i {
	font-size: 32px;
	color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
	margin-top: 8px;
	color: #666;
}
</style>