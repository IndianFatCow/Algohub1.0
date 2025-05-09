<template>
    <!-- <el-card shadow="always" style="margin-top: 10px;"> -->
        <div >
            <Author
            :user="author"
            />
            <!-- 时间 -->
            <div >
                <p >{{ calculateTime() }}</p>
            </div>
        </div>
        <!-- 评论详情信息 -->
        <div >
            <el-link type="primary">回复 @{{ comments.author }}</el-link>
            <el-card shadow="hover" style="margin-top: 10px;">
                <!-- 头像 -->
                <!-- <img :src="comments.user.url" class="rounded-full h-8 w-8" /> -->
                <v-md-editor v-model="comments.content" mode="preview"></v-md-editor>
            </el-card>

            <!-- <v-md-editor v-model="comments.commentsContext" mode="preview">pinglun</v-md-editor> -->
        </div>
        <!-- 帖子底部信息 -->
        <hr />
        <div>
            <!-- 喜欢 -->
            <div style="float: left;margin: 30px 10px 20px 0px;" @click="toggleLike" @mouseleave="likeColor = likeMouseLeave"
                @mouseenter="likeColor = likeMouseEnter">
                <like theme="two-tone" size="20" :fill="likeColor" />
                <span class="text-md mx-1" :style="{ color: likeColor[0] }">{{ likeCount }}</span>
            </div>
            <!-- 删除 -->
            <div v-show="useUserInfoStore().userinfo.username  == comments.author || useUserInfoStore().isAdmin" @click="removeComments"
                style="float: left;margin: 31px 10px 20px 0px;" @mouseleave="deleteColor = ['#9b9b9b', '#ffffff']"
                @mouseenter="deleteColor = ['#d0021b', '#ffffff']">
                <delete theme="two-tone" size="20" :fill="deleteColor" />
            </div>
            <!-- 回复
            <div class="cursor-pointer text-center text-md justify-center items-center flex " @click="openCommentsEdit"
                style="float: left;margin: 30px 10px 20px 0px;" @mouseleave="shareColor = ['#9b9b9b', '#ffffff']"
                @mouseenter="shareColor = ['#4a90e2', '#ffffff']">
                <icon-comment style="margin-top: 3px;" theme="two-tone" size="20" :fill="shareColor" />
            </div> -->

            <!-- 回复评论 -->
            <button type="button" style="float: right;" publishBlog @click="openCommentsEdit"
                @mouseleave="commentsColor = ['#6b7280', '#ffffff']" @mouseenter="commentsColor = ['#e5e7eb', '#ffffff']">
                回&nbsp;&nbsp; 复 
                <icon-writing-fluently theme="outline" size="24" :fill="commentsColor"
                    style="float: right;margin-left: 5px;" />
            </button>
        </div>

        <!-- 评论回复弹出框 -->
        <el-drawer v-model="openEditer" title="I am the title" :with-header="false" direction="btt" size="80%">
            <h2  style="float: left;width: 100%;">回复@{{ author.nickname }}
            </h2>
            <!-- markdown编辑器 -->
            <!-- <v-md-editor v-model="commentsC.context" height="80%" :disabled-menus="[]"
                @upload-image="handleUploadImage"></v-md-editor> -->
            <!-- 发布按钮 -->
            <button type="button" style="float: right;" publishBlog @click="sendComments">
                发 &nbsp;&nbsp; 布 
            <edit theme="outline" size="24" :fill="['#ffffff', '#7ed321']"
                    style="float: right;margin-left: 5px;" />
            </button>
        </el-drawer>
    <!-- </el-card> -->
</template>

<script lang="ts" setup>
import { ref, reactive,computed,onMounted } from 'vue'
import type { comment,userInfo } from '@/lib/types'
import { ElNotification,ElMessage } from 'element-plus'
import { Like,Comment,Share,Delete,Edit} from '@icon-park/vue-next'
import { useUserInfoStore } from '@/stores/userInfo'
// import API from '@/plugins/axiosInstance';
import { likeResourceService, unlikeResourceService,getLikesCountService,getUserisLikedService } from '@/api/like'
import { createCommentService, getCommentsService, getCommentByIdService, updateCommentService, deleteCommentService } from '@/api/comment'
import { userInfoService } from '@/api/user'
import Author from './author.vue'

const props = defineProps(['comments','bid'])
const comments: comment = props.comments
const deleteColor = ref(['#9b9b9b', '#ffffff'])

const author = ref<any>({})
const refer_author = ref("")
// 喜欢状态
const likeState = ref(false)
const likeCount = ref(0)
const likeMouseEnter = ref(['#67C23A', '#ffffff'])
const likeMouseLeave = ref(['#9b9b9b', '#ffffff'])
// 点赞颜色
let likeColor = computed(() => (likeState.value ? ['#f56c6c', '#ffffff'] : ['#9b9b9b', '#ffffff']))

if (likeState.value == true) {
    let likeTempColor = likeMouseEnter.value
    likeMouseEnter.value = likeMouseLeave.value
    likeMouseLeave.value = likeTempColor
}

const shareColor = ref(['#9b9b9b', '#ffffff'])
const commentsColor = ref(['#6b7280', '#ffffff'])
const openEditer = ref(false)

onMounted(async() => {
    try{
        // 获取评论作者信息
        const res = await userInfoService(comments.author)
        author.value = res.data
        //获取点赞状态
        const likeRes = await getUserisLikedService(comments.instanceID.toString(), 'comment')
        likeState.value = likeRes.data
    } catch {
        ElNotification({
            title: "请求被拒绝!",
            type: 'error',
        })
    }
})
// 打开回复评论窗口
const openCommentsEdit = () => {
    if (useUserInfoStore().isLogin == false) {
        ElNotification({
            title: "请求被拒绝!",
            message: "未登录!",
            type: 'error',
        })
        return 0;
    } else {
        openEditer.value = true
    }
}
// 赞
const toggleLike = async () => {
	try {
	  if (likeState.value) {
		await unlikeResourceService(comments.instanceID.toString(), 'comment')
		likeCount.value--

	  } else {
		await likeResourceService(comments.instanceID.toString(), 'comment')
		likeCount.value++
	  }
	  likeState.value = !likeState.value
	} catch (err) {
	  ElMessage.error('操作失败，请稍后重试')
	}
  }

// 删除评论
const removeComments = () => {
//     API({
//         url: '/removeComments/' + comments.id + "/" + props.bid,
//         method: 'get'
//     }).then((res) => {
//         if (res.data.state == 40001) {
//             ElMessage({
//                 message: res.data.message,
//                 type: 'success'
//             })
//             location.reload()
//         }else{
//             ElMessage.error(res.data.message)
//         }

//     })
}

// markdown上传图片
const handleUploadImage = (event: any, insertImage: any, files: File[]) => {
    // let formData: any = new FormData()
    // formData.append('file', files[0])
    // console.log(files[0]);


    // API({
    //     url: '/uploadImg',
    //     data: formData,
    //     method: 'post',
    //     headers: { 'Content-Type': 'multipart/form-data' }
    // }).then((res) => {
    //     console.log(res);
    //     insertImage({
    //         url: res.data
    //     })
    // })
}

// 发送评论
const sendComments = () => {

    // commentsC.bid = comments.bid
    // commentsC.blogUid = comments.commentsUid
    // commentsC.commentsUid = useUserInfoStore().$state.user.id
    // commentsC.commentsContext = comments.commentsContext

    // API({
    //     url: '/addComments',
    //     method: 'post',
    //     data: commentsC
    // }).then((res) => {
    //     ElMessage({
    //         message: '回复成功.',
    //         type: 'success',
    //     })
    // }).catch(err => {
    //     ElMessage.error("服务器除了一点小问题,稍后再试~")
    // })
}
// 计算时间差
const calculateTime = () => {
const postTs = new Date(comments.createdAt || '').getTime()
const diff = Date.now() - postTs
const m = 60 * 1000,
    h = 60 * m,
    d = 24 * h,
    w = 7 * d

if (diff < h) return `${Math.floor(diff / m)} 分钟前`
if (diff < d) return `${Math.floor(diff / h)} 小时前`
if (diff < w) return `${Math.floor(diff / d)} 天前`
return comments.createdAt
}
</script>