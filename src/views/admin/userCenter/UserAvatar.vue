<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import {ref} from 'vue'
import avatar from '@/assets/default.png'

//导入request.js请求工具
import request from '@/utils/request.js'

import {userAvatarUpdateService,chageAvatarUrl} from '@/api/user'
import {ElMessage} from 'element-plus'
import {useUserInfoStore} from '@/stores/userInfo'
const userInfoStore = useUserInfoStore()
const imgUrl = ref(userInfoStore.userinfo.avatar) // 头像图片的 URL
const selectedFile = ref(null); // 选中的文件

// import { useTokenStore } from '@/store/token'
// const tokenStore = useTokenStore()
console.log(userInfoStore.userinfo.avatar)
// 修改头像上传函数
const updateAvatar = async () => {

  if (!selectedFile.value) {
    ElMessage.warning('请先选择头像图片');
    return;
  }

    // 👇 用封装好的接口进行上传
    console.log(selectedFile.value);
    const result = await userAvatarUpdateService(userInfoStore.userinfo.username, selectedFile.value);
    
    // 生成预览 URL
    // URL.revokeObjectURL(userInfoStore.userinfo.avatar); // 清除之前的 URL
    // const blobUrl = URL.createObjectURL(selectedFile.value);
    console.log(result);
    userInfoStore.userinfo.avatar = chageAvatarUrl(result.data.sub_url); // 更新头像图片的 URL
    imgUrl.value = userInfoStore.userinfo.avatar; // 更新头像图片的 URL
    console.log('userInfoStore.userinfo.avatar is', userInfoStore.userinfo.avatar);
    ElMessage.success(result.data?.message || '上传成功');
};

// 上传前验证
const beforeAvatarUpload = async (file) => {
  const isJPG = file.raw.type === 'image/jpeg';
  const isPNG = file.raw.type === 'image/png';
  const isJPGorPNG = isJPG || isPNG;
  const isLt10M = file.raw.size / 1024 / 1024 < 10;

  if (!isJPGorPNG) {
    ElMessage.error('上传图片只能是 JPG/PNG 格式!');
    return false;
  }
  if (!isLt10M) {
    ElMessage.error('上传头像图片大小不能超过 10MB!');
    return false;
  }
  console.log('file is', file);
  // const res = await userAvatarUpdateService(userInfoStore.userinfo.username, file.raw);
  // console.log('res is', res);
  selectedFile.value = file.raw;
  console.log('selectedFile.value is', selectedFile.value);
  // 更新本地预览
  imgUrl.value = URL.createObjectURL(file.raw);
  return false; // 阻止默认上传行为
};

// 上传成功后的处理
const handleAvatarSuccess = (response, file) => {
  if(response.status === 'success') {
    // imgUrl.value = URL.createObjectURL(file.raw); // 显示新上传的图片
    userInfoStore.updateUserInfo({ avatar: imgUrl.value }); // 更新用户信息状态
    ElMessage.success(response.message || '上传成功');
  } else {
    ElMessage.error(response.message || '上传失败');
  }
};

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>更换头像</span>
            </div>

            
        </template>
        <el-row>
            <el-col :span="12">
                <el-upload
                    :auto-upload="false"
                    :on-change="beforeAvatarUpload"
                    :on-success="handleAvatarSuccess"
                    :action="``"
                    :show-file-list="true"
                    :multiple="false"
                    name="file"
                    :limit="1"
                >
                    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                    <!-- <img v-else src="@/assets/default.png" alt=""/> -->
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>

                    <!-- <el-avatar :src="userInfoStore.userinfo.avatar?userInfoStore.userinfo.avatar:avatar" alt="点击上传" /> -->

                </el-upload>
                <div class="el-upload__tip">
                  点击更改头像
                </div>
                <el-button type="success" @click="updateAvatar" :icon="Upload">上传头像</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>


<style lang="scss" scoped>
// .avatar-uploader .el-upload {
//   border: 1px dashed var(--el-border-color);
//   border-radius: 6px;
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
//   transition: var(--el-transition-duration-fast);
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 添加阴影效果
// }

// .avatar-uploader .el-upload:hover {
//   border-color: var(--el-color-primary);
// }

// .el-icon.avatar-uploader-icon {
//   font-size: 28px;
//   color: #8c939d;
//   width: 178px;
//   height: 178px;
//   text-align: center;
// }
.avatar {
  width: 178px;
  height: 178px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
}
</style>