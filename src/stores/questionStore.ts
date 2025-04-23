import {defineStore} from 'pinia'



export const questionStore = defineStore('question',{
    state:()=>{
        return {
            currentChoice:{
                "ID": 1,
                "instanceID": 1,
                "createdAt": "2025-04-22T12:37:47.145Z",
                "updatedAt": "2025-04-22T12:37:47.145Z",
                "DeletedAt": null,
                "unique_id": "示例代码",
                "title": "示例代码",
                "descrition": "示例描述",
                "author": "作者",
                "time_limit": 1,
                "memory_limit": 128,
                "tag": "math,test,example,easy",
                "level": 1,
                totalPass: 1,
                totalAttempt: 1
            },
            editQuestionId:'0'
        }
    },
    getters:{},
    actions:{
        // 设置当前选择的题目
        setCurrentChoice(data:any){
            this.currentChoice = data
        },
        setEditQuestionId(id:any){
            this.editQuestionId = id
        }

    },
    persist:true
})