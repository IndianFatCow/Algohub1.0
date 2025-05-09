import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import type { userInfo } from "@/lib/types"; // 确保路径正确

// interface userinfo {
//     ID: number, // 修改了字段名从'id'到'ID'，类型从'string'改为'number'
//     instanceID: number, // 新增字段
//     createdAt: string, // 新增字段
//     updatedAt: string, // 新增字段
//     DeletedAt: any, // 新增字段，使用'any'类型处理可能为null的情况
//     username: string, // 保持不变
//     password: string, // 保持不变
//     status: string, // 修改了字段名从'role'到'status'
//     nickname: string, // 新增字段
//     email: string, // 保持不变
//     phone: string, // 新增字段
//     avatar: string, // 修改了字段名从'url'到'avatar'，并更新描述为头像链接
//     bio: string, // 修改了字段名从'sign'到'bio'，并更新描述为个人简介
//     company: string, // 新增字段
//     location: string, // 保持不变，但注意实际用途可能是显示用户的地理位置
//     profile_url: string, // 新增字段，用于外部个人资料页面链接
// }

interface UserStateUpdate {
    isLogin: boolean;
    isAdmin: boolean;
}

export const useUserInfoStore = defineStore("userinfo", {
    state: ()  => ({
        userinfo: {
            ID: 0,
            instanceID: 0,
            createdAt: "",
            updatedAt: "",
            DeletedAt: null,
            username: "",
            password: "",
            status: "",
            nickname: "",
            email: "",
            phone: "",
            avatar: "",
            bio: "",
            company: "",
            location: "",
            profile_url: "",
        },
        isLogin: false,
        isAdmin: false
    }),
    actions: {
        setUserInfo(newUserInfo: userInfo) {
            this.userinfo = newUserInfo;
        },
        setState(stateUpdate: UserStateUpdate) {
            this.isLogin = stateUpdate.isLogin;
            this.isAdmin = (stateUpdate.isAdmin);
        },
        chageAvatarUrl( ) {
            // 获取新的和旧的URL头
            const oldPrefix = 'http://minio:9000';
            // const oldPrefix = 'http://minio.orb.192.168.1.166:9000';
            // const newPrefix = 'http://127.0.0.1:9000';
            // const newPrefix = 'http://192.168.1.166:9000';
            const newPrefix = 'http://114.55.235.23:9000';

            // 检查当前URL是否以旧的前缀开头
            if (this.userinfo.avatar.startsWith(oldPrefix)) {
                // 替换为新的前缀
                this.userinfo.avatar = newPrefix + this.userinfo.avatar.substring(oldPrefix.length);
            }
        },
        // updateAvatarFromBlob(objectUrl: string) {
        //     this.userinfo.avatar = objectUrl;
        //   },
        removeUserInfo() {
            this.userinfo = {
                ID: 0,
                instanceID: 0,
                createdAt: "",
                updatedAt: "",
                DeletedAt: null,
                username: "",
                password: "",
                status: "",
                nickname: "",
                email: "",
                phone: "",
                avatar: "",
                bio: "",
                company: "",
                location: "",
                profile_url: ""
            };
            this.isLogin = false;
            this.isAdmin = false;
        },

    },


    persist: true // 启用持久化存储
});

export default useUserInfoStore;