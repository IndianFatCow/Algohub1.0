// 导入request.js请求工具
import request from '@/utils/request.js';

/**
 * 创建新评论
 * @param {Object} commentData - 包含内容(content)、作者(author)、引用ID(refer_id)、引用类型(refer_type)、来源ID(source_id)和来源类型(source_type)等信息的对象
 */
export const createCommentService = (commentData: any) => {
    return request.post('/comment', commentData);
};

/**
 * 查询评论列表
 * @param {number} limit - 返回条目数量限制，默认为10
 * @param {number} offset - 偏移量，默认为0
 * @param {string} referId - 引用ID搜索条件，可选
 * @param {string} referType - 引用类型搜索条件，如'post'或'comment'，可选
 * @param {string} sourceId - 来源ID搜索条件，可选
 */
export const queryCommentsService = (limit = 10, offset = 0, referId?:string, referType?:string, sourceId?:string) => {
    // 构建请求参数对象
    const params = {
        limit,
        offset,
        refer_Id: referId,
        refer_Type: referType,
        source_Id: sourceId
    };

    return request.get('/comment', { params });
};

/**
 * 根据ID获取评论详情
 * @param {number} commentInstanceId - 评论实例ID
 */
export const getCommentByIdService = (commentInstanceId:number) => {
    return request.get(`/comment/${commentInstanceId}`);
};

/**
 * 更新评论
 * @param {number} commentInstanceId - 评论实例ID
 * @param {Object} commentData - 包含要更新的信息的对象，如内容(content)
 */
export const updateCommentService = (commentInstanceId:number, commentData:any) => {
    return request.put(`/comment/${commentInstanceId}`, commentData);
};

/**
 * 删除评论
 * @param {number} commentInstanceId - 要删除的评论实例ID
 */
export const deleteCommentService = (commentInstanceId:number) => {
    return request.delete(`/comment/${commentInstanceId}`);
};