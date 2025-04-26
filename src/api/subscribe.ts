//导入请求
import request from '@/utils/request'

//订阅用户
export const subscribeUser = (username: string) => {
    return request(`/subscribe/user/${username}`)
}
//取消订阅
