<template>
    <el-container>
        <el-aside width="20%">


            <el-card shadow="always" v-if="!loadBlogDone"
                style="margin-left: 5%;position: fixed; top: 140px; left: 0px;  width: 15%; z-index: 1040;">
                <el-skeleton animated />
                <br />
                <el-skeleton style="--el-skeleton-circle-size: 100px" animated>
                    <template #template>
                        <el-skeleton-item variant="circle" animated />
                    </template>
                </el-skeleton>
            </el-card>
        </el-aside>
        <el-container style="min-height: 105vh;">
            <el-header style="max-height: 10px;">

            </el-header>
            <el-main>

                <!-- 帖子主体 -->
                <el-card shadow="always">
                    <!-- 面包屑导航栏 -->
                    <el-breadcrumb separator="/">
                        <!-- <el-breadcrumb-item :to="{ path: '/blog/all' }">讨论</el-breadcrumb-item> -->
                        <el-breadcrumb-item><a href="#">{{ blog?.title }}</a></el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-divider />

                    <!-- 加载动态 -->
                    <el-skeleton style="width: 100%" v-if="!loadBlogDone">
                        <template #template>
                            <el-skeleton-item variant="image" style="width: 100%; height: 20%" />
                            <div style="padding: 14px">
                                <el-skeleton-item variant="p" style="width: 100%" />

                                <el-skeleton :rows="5" animated />
                                <el-skeleton-item variant="text" style="margin-right: 16px" />
                                <el-skeleton-item variant="text" style="width: 30%" />
                            </div>

                        </template>
                    </el-skeleton>

                    <!-- 加载完成主体 -->
                    <div v-if="loadBlogDone">
                        <!-- 帖子信息头部 -->
                        <div style="height: 14em;">

                            <div style="background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.7));"></div>

                            <!-- <img :src="blog?.faceImage" class="absolute left-0 top-0 w-full h-full z-0 object-cover" /> -->
                            <!-- 关注按钮 -->
                            <div >
                                <a href="#" @click="subscribeChoice" 
                                    :class="subscribeClass">{{ subscribeValue }}</a>
                                <h2 >
                                    <!-- 标题 -->

                                    {{ blog?.title }}
                                    <!-- 管理员标签 -->
                                    <!-- <el-tag v-for="admintag in blog?.adminTags" :type="admintag.type" class="mx-1"
                                        effect="dark">{{ admintag.message }}</el-tag> -->
                                </h2>
                                <div >
                                    <!-- 头像 -->
                              
                                    <el-avatar :src="author?.avatar"  />
                                    <div>
                                        <p >{{ author?.nickname }} </p>
                                        <p >{{  calculateTime() }}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <el-divider />
                        <!-- 帖子内容 -->
                        <div>
                            <v-md-editor v-model="markdown" mode="preview"></v-md-editor>
                        </div>
                        <!-- 帖子底部信息 -->
                        <hr />
                        <div class="action-bar">
                            <div class="action-group left-group">
                            <!-- 喜欢 -->
                            <div
                                class="action-item"
                                @click="toggleLike"
                                @mouseleave="likeColor = likeMouseLeave"
                                @mouseenter="likeColor = likeMouseEnter"
                            >
                                <Like theme="two-tone" size="20" :fill="likeColor" />
                                <span class="action-text">{{ likeCount }}</span>
                            </div>
                            <!-- 回复评论 -->
                            <div class="action-item" @click="openCommentsEdit">
                                <comment theme="outline" size="24" :fill="shareColor" />
                            </div>
                            <!-- 分享 -->
                            <div
                                class="action-item"
                                @mouseleave="shareColor = ['#9b9b9b', '#ffffff']"
                                @mouseenter="shareColor = ['#4a90e2', '#ffffff']"
                                @click="copyShareUrl(blog?.instanceID)"
                            >
                                <Share theme="two-tone" size="20" :fill="shareColor" />
                            </div>


                            </div>

                            <div class="action-group right-group">
                            <!-- 修改 -->
                            <div
                                v-show="useUserInfoStore().userinfo.username === blog?.author"
                                class="action-item"
                                @mouseleave="editColor = ['#9b9b9b', '#ffffff']"
                                @mouseenter="editColor = ['#303133', '#ffffff']"
                                @click="editChangeOpen = true"
                            >
                                <edit theme="outline" size="24" :fill="editColor" />
                            </div>

                            <!-- 删除 -->
                            <div
                                v-show="useUserInfoStore().userinfo.username === blog?.author"
                                class="action-item"
                                @click="removeBlog"
                                @mouseleave="deleteColor = ['#9b9b9b', '#ffffff']"
                                @mouseenter="deleteColor = ['#d0021b', '#ffffff']"
                            >
                                <delete theme="outline" size="24" :fill="deleteColor" />
                            </div>
                            </div>
                        </div>
                    </div>

                </el-card>
                <!-- 评论卡片 -->
                <!-- <commentsCard v-for="comments in commentsList" :comments="comments" :bid="blog?.id" /> -->
            </el-main>
            <el-footer>
            </el-footer>
        </el-container>
        <el-aside width="20%">

            <el-card shadow="always" v-if="!loadBlogDone"
                style="margin-right: 5%;position: fixed; top: 140px; right: 0px;  width: 15%; z-index: 1040;">
                <div>
                    <el-skeleton :rows="3" animated />
                </div>
                <el-divider />
                <div style="margin-top: 10px;">
                    <span style="color: gray;">相关标签</span> <br /><br />
                    <el-skeleton :rows="1" animated />
                </div>
            </el-card>

            <!-- 侧边栏 -->
            <el-card shadow="always" v-if="loadBlogDone"
                style="margin-right: 5%;position: fixed; top: 140px; right: 0px;  width: 15%; z-index: 1040;">
                <div style="margin-top: 10px;">
                    <span style="color: gray;">评论次数</span>
                    <!-- <el-tag class="ml-2" type="info" style="float: right;">{{ blog?.comment }}</el-tag> -->
                </div>
                <div style="margin-top: 10px;">
                    <span style="color: gray;">点赞次数</span>
                    <!-- <el-tag class="ml-2" type="info" style="float: right;">{{ blog?.like }}</el-tag> -->
                </div>
                <el-divider />
                <div style="margin-top: 10px;">
                    <span style="color: gray;">相关标签</span> <br /><br />
                    <!-- 管理员标签 -->
                    <!-- <el-tag v-for="admintag in blog?.adminTags" :type="admintag.type" class="mx-1" effect="dark">{{
                        admintag.message }}</el-tag> -->
                    <el-tag class="mx-1" type="info" v-for="tag in tags" round>{{ tag }}</el-tag>
                </div>
            </el-card>
        </el-aside>
    </el-container>

    <!-- 评论回复弹出框 -->
    <el-drawer v-model="openEditer" title="I am the title" :with-header="false" direction="btt" size="80%">
        <h2 class="mb-4 text-2xl font-bold" style="float: left;width: 100%;">回复评论</h2>
        <!-- markdown编辑器 -->
        <v-md-editor v-model="comments.content" height="80%" :disabled-menus="[]"
            @upload-image="handleUploadImage"></v-md-editor>
        <!-- 发布按钮 -->
        <button type="button" style="float: right;" publishBlog @click="sendComments"
            class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">
            发 &nbsp;&nbsp; 布 <icon-writing-fluently theme="outline" size="24" :fill="['#ffffff', '#7ed321']"
                style="float: right;margin-left: 5px;" />
        </button>
    </el-drawer>
    <!-- 修改弹出框 -->
    <!-- <el-drawer v-model="editChangeOpen" title="I am the title" :with-header="false" direction="btt" size="80%">
        <MarkdownRenderer type="change" :blog="blog" />
    </el-drawer> -->
</template>

<script lang="ts" setup>
import { Like,Comment,Share,Delete,Edit} from '@icon-park/vue-next'
import { ElMessage } from 'element-plus'

import { getPostByIdService, queryPostsService } from '@/api/post'
import { SearchUserService,chageAvatarUrl } from '@/api/user'
import { likeResourceService, unlikeResourceService,getLikesCountService,getUserisLikedService } from '@/api/like'
  import { createCommentService, postCommentsService, getCommentByIdService, updateCommentService, deleteCommentService } from '@/api/comment'

import { reactive, ref,computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import type { Post, comment, userInfo } from '@/lib/types'
import useClipboard from "vue-clipboard3";
import { useUserInfoStore } from '@/stores/userInfo'
import commentsCard from './commentsCard.vue'
import { subscribeUser,unsubscribeUser } from '@/api/subscribe'
import { fa } from 'element-plus/es/locales.mjs';
// import MarkdownRenderer from '@/components/front/MarkdownRenderer.vue'

const { toClipboard } = useClipboard();
const {params} = useRoute()
const router = useRouter()
const blog = ref<Post | null>(null)
const markdown = ref("") // markdown内容
const author = ref<null | userInfo>(null) // 用户
const type = ref("#all") // 搜索类型
const loadBlogDone = ref(false) // 是否加载完成
const openEditer = ref(false) //是否弹出评论编辑器
const editChangeOpen = ref(false) // 编辑器 弹出框
const commentsList = ref<any>([])
const shareColor = ref(['#9b9b9b', '#ffffff'])
const postId = params.id

// 关注状态
const subscribeValue = ref("关注")
const subscribeState = ref(false)
const subscribeClass = ref("px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2 hover:bg-gray-500")
const subscribedClass = ref("px-4 py-1 bg-black text-gray-600 inline-flex items-center justify-center mb-2 hover:bg-gray-200")
const unSubscribeClass = ref("px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2 hover:bg-gray-500")

// 喜欢状态
const likeState = ref(false)
const likeCount = ref(0)
const likeMouseEnter = ref(['#67C23A', '#ffffff']) // 鼠标移入
const likeMouseLeave = ref(['#9b9b9b', '#ffffff']) // 鼠标移出

// // 收藏状态
const starMouseEnter = ref(['#f5a623', '#ffffff'])
const starMouseLeave = ref(['#9b9b9b', '#ffffff'])
const starColor = ref(['#9b9b9b', '#ffffff'])

// 删除状态
const deleteColor = ref(['#9b9b9b', '#ffffff'])

// 编辑状态
const editColor = ref(['#9b9b9b', '#ffffff'])

let comments = reactive<comment>({
    ID: 0,
    // bid: "000",
    refer_type: "", //引用的类型
    instanceID: 0, // 评论的实例ID
    createdAt: "",
    content: "",
    author: "",
    refer_id: 0,//引用的评论，可选
    source_id: 0,//源ID，例如帖子ID
    source_type: "",//源类型，例如 "post"
    updatedAt: "",
})
const subscribeChoice = () => {//关注
    if(subscribeState.value){
        unSubscribe()
    }else{
        subscribe()
    }
}

const unSubscribe =async () => {// 取消关注
    if (useUserInfoStore().$state.isLogin) {
        const res =await unsubscribeUser(blog.value?.author)
            ElMessage({
                message: res.data.message,
                type: 'success'
            })
            location.reload()

    }else{
        ElMessage.error("请先登录！")
    }

}
const subscribe = () => {
    if (useUserInfoStore().$state.isLogin) {
        const res = subscribeUser(blog.value?.author)
            ElMessage({
                message: res.data.message,
                type: 'success'
            })
            location.reload()
        
    }else{
        ElMessage.error("请先登录！")
    }

}
const getBlogDetial = async () => {
    console.log(postId);
    const res = await getPostByIdService(postId)
    console.log(res.data);
    blog.value = res.data
    markdown.value = res.data.content
    console.log(markdown.value);
    // blog.value!.adminTags = JSON.parse(blog.value?.adminTags)
    // if (typeof res.data.data.tag != 'object') {
    //     tags.value = JSON.parse(res.data.data.tag)
    // }

    // 初始化关注状态
    if(subscribeState.value == true){
        subscribeValue.value = "已关注"
        subscribeState.value = true
        subscribeClass.value = subscribedClass.value
    }
    getCommentsList()
    getUser()
    getLikesCount()
}
getBlogDetial()
const getUser =async () =>{
    console.log(blog);
  const res =await SearchUserService(blog !==null ? blog.value.author:'')
  console.log(res.data);
  author.value = res.data.Items[0]
  console.log(author.value );
  if(author.value !== null)author.value.avatar = chageAvatarUrl(author.value.avatar)
}
const getLikesCount = async () => {
    // const res = await getLikesCountService(blog.value?.id)
    // console.log(res.data);
    // likesCount.value= res.data.totalItems
        //是否点赞
    // console.log(post)
    const Res = await getUserisLikedService(postId, 'post')
    console.log(Res)
    likeState.value = Res.data
    // 初始化喜欢状态
    if (likeState.value === false) {
    let likeTempColor = likeMouseEnter.value
    likeMouseEnter.value = likeMouseLeave.value
    likeMouseLeave.value = likeTempColor
    likeColor.value = ['#f56c6c', '#ffffff']
    }
    const likeRes = await getLikesCountService(postId, 'post')
    likeCount.value = likeRes.data.totalItems
}
/**
 * markdown中插入图片
 * @param event 
 * @param insertImage 
 * @param files 
 */
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


const removeBlog = () => {
    // API({
    //     url: '/removeBlog/' + blog.value?.id,
    //     method: 'get'
    // }).then((res) => {
    //     if (res.data.state == 40001) {
    //         ElMessage({
    //             message: res.data.message,
    //             type: 'success'
    //         })
    //         router.push('/blog/all')
    //     } else {
    //         ElMessage.error(res.data.message)
    //     }
    // })
}
// 打开回复评论窗口
const openCommentsEdit = () => {
    if (useUserInfoStore().isLogin == false) {
        ElMessage.error("未登录")
        return 0;
    } else {
        openEditer.value = true
    }
}
// 得到评论列表
const getCommentsList = () => {
    // let getCommentsUrl = useUserInfoStore().$state.isLogin ?
    //     '/getCommentsList/' + blog.value?.id + "/" + useUserInfoStore().$state.user.id :
    //     '/getCommentsList/' + blog.value?.id + "/0"
    // API({
    //     url: getCommentsUrl,
    //     method: 'get'
    // }).then((res) => {
    //     console.log("commentsList", res.data);
    //     commentsList.value = res.data.data
        loadBlogDone.value = true
    // }).catch(err => {
    //     ElMessage.error("服务器除了一点小问题,稍后再试~")
    // })
}
// 赞
const toggleLike = async () => {
	try {
	  if (likeState.value) {
		await unlikeResourceService(postId, 'post')
		likeCount.value--

	  } else {
		await likeResourceService(postId, 'post')
		likeCount.value++
	  }
	  likeState.value = !likeState.value
	} catch (err) {
	  ElMessage.error('操作失败，请稍后重试')
	}
  }
  // 点赞颜色
  let likeColor = computed(() => (likeState.value ? ['#f56c6c', '#ffffff'] : ['#9b9b9b', '#ffffff']))
// 发送评论
const sendComments = () => {
    // comments.bid = blog.value!.id
    // comments.blogUid = blog.value!.user.id
    // comments.commentsUid = useUserInfoStore().$state.user.id
    // comments.commentsContext = markdown.value
    // API({
    //     url: '/addComments',
    //     method: 'post',
    //     data: comments
    // }).then((res) => {
    //     ElMessage({
    //         message: '回复成功.',
    //         type: 'success',
    //     })
    //     location.reload()
    //     openEditer.value = !openEditer.value
    // }).catch(err => {
    //     ElMessage.error("服务器除了一点小问题,稍后再试~")
    // })
}

let tags = ref([])




// 分享链接
function copyShareUrl(postId?: number) {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);

  // 替换路径部分为 /blogDetail/:id
  url.pathname = `/blogDetail/${postId}`;

  const newUrl = url.toString();

  navigator.clipboard.writeText(newUrl)
    .then(() => {
      ElMessage.success('链接已复制到剪贴板');
    })
    .catch(err => {
      console.error('未能复制文本: ', err);
      ElMessage.error('复制链接失败');
    });
}

// 计算时间差
const calculateTime = () => {
const postTs = new Date(blog.value?.createdAt || '').getTime()
const diff = Date.now() - postTs
const m = 60 * 1000,
    h = 60 * m,
    d = 24 * h,
    w = 7 * d

if (diff < h) return `${Math.floor(diff / m)} 分钟前`
if (diff < d) return `${Math.floor(diff / h)} 小时前`
if (diff < w) return `${Math.floor(diff / d)} 天前`
return blog.value?.createdAt
}


</script>

<style scoped>
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid #ebeef5;
  background: #fff;
}

.action-group {
  display: flex;
  align-items: center;
}

.left-group .action-item {
  margin-right: 16px;
}

.right-group .action-item {
  margin-left: 16px;
}

.action-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: background-color 0.2s;
}

.action-item:hover {
  background-color: #f5f7fa;
  border-radius: 4px;
}
</style>
