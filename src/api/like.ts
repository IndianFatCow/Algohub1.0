//导入request.js请求工具
import request from '@/utils/request.js'

// 提供调用对某个资源进行点赞的函数
export const likeResourceService = (resourceId:number, resourceType:string) => {
    return request.post(`/like/${resourceId}/${resourceType}`);
};

// 提供调用取消对某个资源点赞的函数
export const unlikeResourceService = (resourceId:number, resourceType:string) => {
    return request.delete(`/like/${resourceId}/${resourceType}`);
};

// 提供调用获取某个资源点赞数量的函数
export const getLikesCountService = (resourceId:number, resourceType:string) => {
    return request.get(`/like/${resourceId}/${resourceType}`);
};

// 提供调用获取用户点赞列表的函数
export const getUserLikesService = (username:string, limit = 10, offset = 0) => {
    return request.get(`/user/${username}/like`, {
        params: { limit, offset }
    });
};

//提供调用获取用户是否点赞的函数
export const getUserisLikedService = (resourceId:number, resourceType:string) => {
    return request.get(`/like/${resourceType}/${resourceId}/check`)
}