import {defineStore} from 'pinia'



export const judgerStore = defineStore('judge',{
    state:()=>{
        return {
            type:100,//选择的题目类型
            lasttime:0//上次判题的时间
        }
    },
    getters:{},
    actions:{
        // 设置当前选择的题目
        setJudgeType(data:any){
            this.type = data
        },
        setLastTime(data:any){
            this.lasttime = data
        }

    },
    persist:true
})