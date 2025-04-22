//导入request.js请求工具
import request from '@/utils/request.js'
//提供调用注册接口的函数
import axios from 'axios';
import { useNamespace } from 'element-plus';

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
    })
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
export const userAvatarService = (username:string)=>{
    return request.get(`/user/${username}/avatar`,{
        responseType: 'blob' // 设置响应类型为blob
    })
    // return request.get(`/user/${username}/avatar`)
}
//修改密码
export const userResetPasswordService = (username:string,passwordData:any)=>{
    return request.put(`/user/${username}`,passwordData)
}
export const SearchUserService = (username:string,offset:any,limit:any)=>{
    return request.get('/user',{
        params:{
            username,
            offset,
            limit
        }
    })
}