<script lang="ts" setup>
import { ref } from 'vue'
import request from '@/utils/request';
import emitter from "@/lib/bus";
import { useAuthStore } from '@/store/store'
import { questionStore } from '@/stores/questionStore';
import { reactive, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import aceEditor from './aceEditor.vue';
const props = defineProps(['uid', 'qid']);

// console.log("uid", uid);
const qid = questionStore().$state.currentChoice.unique_id
const router = useRouter()
const dialogVisible = ref(false)//弹窗是否显示
const loadingRecord = ref(true)//加载状态

import { getSubmitList } from '@/api/submit';
onMounted( () => {

    emitter.on('loadRecord',async () => {
        console.log("qid    ", qid);
        const res = await getSubmitList(qid)
        tableData.record_list = res.data
        console.log(res.data);
    });
})


const recorddetial = ref({
    ID: 1,
    instanceID: 1,
    createdAt: "",
    updatedAt: "",
    DeletedAt: null,
    code_text: "int add(int a, int b) { return a + b; }",
    language: "cpp",
    problem_id: "aPlusb",
    status: "pending",
    author: "normal",
    excute_time: 0,
    excute_memory: 0,
    testSample: "1 2",
})
const showRecordDetial = (detial: any) => {
    console.log(detial);
    recorddetial.value = detial

    
    dialogVisible.value = true
}

const tableData = reactive({
    record_list: []
})
const loadRecord =async () => {
    
    const res = await getSubmitList(qid)
    tableData.record_list = res.data.data
    loadingRecord.value = false
    
}
loadRecord()
const toProblemDetial = (question: any) => {
    questionStore().setCurrentChoice(question)
    router.push({ name: 'problemDetial', query: { 'from': 'record' } })
}


</script>

<template>
    <el-table :data="tableData.record_list" stripe style="width: 100%;" v-loading="loadingRecord" element-loading-text="正在拼命加载中...">
        <el-table-column prop="id" label="id" style="width: 5%;" />
        <el-table-column prop="userName" label="用户" style="width: 20%;" />
        <el-table-column prop="questionName" label="题目" style="width: 20%;">
            <template #default="scope">
                <el-button type="primary" @click="toProblemDetial(scope.row)" link>{{ scope.row.questionName }}</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="language" label="语言" style="width: 20%;" />

        <el-table-column #default="scope" label="状态" style="width: 20%;">

            <el-tag v-show="scope.row.status == 'Accept'" type="success" disabled plain>Accept</el-tag>
            <el-tag v-show="scope.row.status != 'Accept'" type="danger" disabled plain>{{ scope.row.title }}</el-tag>

        </el-table-column>

        <el-table-column prop="address" label="操作" style="width: 15%;" #default="scope">
            <el-button type="primary" link @click="showRecordDetial(scope.row)">查看详情</el-button>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="编译记录详情" width="50%" destroy-on-close   v-if="dialogVisible" :visible.sync="dialogVisible">
        <el-descriptions :title="'No.' + recorddetial.ID" :column="3" border>
            <el-descriptions-item label="題目名" label-align="right" align="center" label-class-name="my-label"
                class-name="my-content" width="150px">{{ recorddetial.problem_id }}</el-descriptions-item>
            <el-descriptions-item label="时间" label-align="right" align="center">{{ recorddetial.excute_time }} ms</el-descriptions-item>
            <el-descriptions-item label="空间" label-align="right" align="center">{{ recorddetial.excute_memory }} mb</el-descriptions-item>

            <el-descriptions-item label="状态" label-align="right" align="center">
                <el-tag v-show="recorddetial.problem_id == 'Accept'" type="success" disabled plain>Accept</el-tag>
                <el-tag v-show="recorddetial.problem_id != 'Accept'" type="danger" disabled plain>{{ recorddetial.problem_id }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="语言" label-align="right" align="center">
                {{ recorddetial.language }}
            </el-descriptions-item>
            <el-descriptions-item label="提交日期" label-align="right" align="center">
                {{ recorddetial.createdAt }}
            </el-descriptions-item>
            <el-descriptions-item label="信息"   label-align="right" align="center">
                <el-alert  :type="recorddetial.status == 'Accept' ? 'success' : 'error'" :closable="false" />
            </el-descriptions-item>
        </el-descriptions>
        <br/>
        <aceEditor :mode="'test'" :code="recorddetial.code_text" :testSample="recorddetial.testSample" :title="recorddetial.status"/>
        <template #footer>
            <span class="dialog-footer">

            </span>
        </template>
    </el-dialog>
</template>

<style scoped>
.my-label {
    background: var(--el-color-success-light-9);
}

.my-content {
    background: var(--el-color-danger-light-9);
}
</style>