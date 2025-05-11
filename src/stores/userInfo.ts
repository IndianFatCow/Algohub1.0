import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import type { userInfo } from "@/lib/types"; // 确保路径正确



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
            ip_address: ""
        },
        isLogin: false,
        isAdmin: false
    }),
    actions: {
        setUserInfo(newUserInfo: userInfo) {
            this.userinfo = newUserInfo;
        },
        setIP(ip: string){
            this.userinfo.ip_address = ip;
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
                profile_url: "",
                ip_address: ""
            };
            this.isLogin = false;
            this.isAdmin = false;
        },

    },


    persist: true // 启用持久化存储
});

export default useUserInfoStore;