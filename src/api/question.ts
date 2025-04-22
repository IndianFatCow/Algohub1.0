import request from '@/utils/request'
/**
 * 获取题目总数量
 * @return 题目总数
 */
export const countQuestion = () => {
  return request.get('/countQuestion');
};

/**
 * 获取题目列表（分页）
 * @param page 当前页码
 * @param username 当前登录用户名（未登录传 "0"）
 * @return 题目列表
 */
export const getQuestionList = async (page: number, size: number = 10, username: string = "0") => {
  return request({
    // url: `/getQuestionList/${page}/${username}`,
    url: `/getQuestionList?page=${page}&size=${size}`,
    method: 'get'
  });
};

/**
 * 搜索题目
 * @param page 当前页码
 * @param searchContent 搜索关键词
 * @return 搜索结果题目列表
 */
export const searchQuestion = async (page: number, searchContent: string) => {
  return request({
    url: `/searchQuestion?page=${page}&size=15&searchContent=${searchContent}`,
    method: 'post'
  });
};

export const addQuestion = async (question: any) => {
  return request({
    url: '/addQuestion',
    method: 'post',
    data: question
  });
};

export const updateQuestion = async (question: any) => {
  return request({
    url: '/updateQuestion',
    method: 'post',
    data: question
 });
}
export const deleteQuestion = async (questionId: number) => {
  return request({
    url: `/deleteQuestion/${questionId}`,
    method: 'delete'
  });
};