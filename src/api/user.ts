//导入request.js请求工具
import request from '@/utils/request.js'
//提供调用注册接口的函数
import axios from 'axios';
import { ElMessage } from 'element-plus';
// import { useNamespace } from 'element-plus';

// 创建一个避免拦截器的Axios实例用于登录
const loginRequest = axios.create({
  baseURL: '/v1', // 根据实际情况调整
});
// 注册拦截器
export const userRegisterService = (registerData:any)=>{
    return request.post('/user',registerData)//请求路径接口
}

//提供调用登录接口的函数
export const userLoginService = (Auth: any)=>{
    return loginRequest.post('/login', {}, {
        headers: {
            'Authorization': Auth // 设置正确的Authorization头
        }
    }).then(response => {
        // 处理登录成功后的逻辑
        // console.log("登录成功", response.data);
        return response; // 返回登录成功的响应数据
    }).catch(error => {
        // 处理登录失败的逻辑
        // console.log("登录失败", error.response.data.message);
        ElMessage.error(error.response.data.message);
    });
    // const response = request.post('/login', {}, {
    //     headers: {
    //         'Authorization': Auth // 设置正确的Authorization头
    //     }
    // })
    // console.log("response",response)
    // return response
}
//提供调用退出登录接口的函数
export const userLogoutService = ()=>{
    return request.post('/logout')
}

//获取用户详细信息
export const userInfoService = (username:string)=>{
    return request.get(`/user/${username}`)
}
//获取用户列表
export const userListService = (offset:any,limit:any)=>{
    return request.get('/user/list',{
        params:{
            offset,
            limit
        }
    })
}
//修改个人信息
export const userInfoUpdateService = (username:string,userInfoData:any)=>{
    console.log("userInfoData",userInfoData)
   return request.put(`/user/${username}`,userInfoData)
}

//修改头像
export const userAvatarUpdateService = (username:string, avatarFile: File) => {
    // 创建一个FormData对象并添加文件
    // const formData = new FormData();
    // formData.append('avatar', avatarFile);
    // return request.put(`/user/${username}/avatar`, formData,{
    //     headers: {
    //         'Content-Type': 'multipart/form-data' // 设置正确的Content-Type
    //     }
    // });
    console.log("avatarFile",avatarFile)
    return request.put(`/user/${username}/avatar`, avatarFile, {
        headers: {
            'Content-Type': 'image/png',
          }
          
    });
}

//获取用户头像
// export const userAvatarService = (username:string)=>{
//     return request.get(`/user/${username}/avatar`,{
//         responseType: 'blob' // 设置响应类型为blob
//     })
//     // return request.get(`/user/${username}/avatar`)
// }
//修改密码
export const userResetPasswordService = (username:string,passwordData:any)=>{
    return request.put(`/user/${username}`,passwordData)
}
//搜索用户
export const SearchUserService = (username:string, offset?:number,limit?:number)=>{
    return request.get('/user',{
        params:{
            username,
            offset: offset !== undefined ? offset : 0, // 如果offset未提供，则使用0
            limit: limit !== undefined ? limit : 10   // 如果limit未提供，则使用10
        }
    })
}
//
export const  chageAvatarUrl = (avatar:string)=> {
    // 获取新的和旧的URL头
    const oldPrefix = 'http://minio:9000';
    const newPrefix = 'http://127.0.0.1:9000';

    // 检查当前URL是否以旧的前缀开头
    if (avatar.startsWith(oldPrefix)) {
        // 替换为新的前缀
        return newPrefix + avatar.substring(oldPrefix.length);
    }
    else{
        return avatar
    }
}