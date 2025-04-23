import request from '@/utils/request'
//调用接口返回
// "data": {
//   "totalItems": 1,
//   "items": ['']
// totalitem即总数
// 获取题目列表
export const getQuestionList =  (offset: number, limit: number = 10) => {
  return request.get(`/problem/?offset=${offset}&limit=${limit}`);
}
/**
 * 搜索题目
 * @param page 当前页码
 * @param searchContent 搜索关键词
 * @return 搜索结果题目列表
 */
export const searchQuestion = (page: number, searchContent: string) => {
  return request({
    url: `/searchQuestion?page=${page}&size=15&searchContent=${searchContent}`,
    method: 'post'
  });
};
export const getQuestionById =  (unique_id: string) => {
  return request.get(`/problem/${unique_id}`);
};
export const addQuestion =  (question: any) => {
  return request({
    url: '/addQuestion',
    method: 'post',
    data: question
  });
};

export const updateQuestion = (question: any) => {
  return request({
    url: '/updateQuestion',
    method: 'post',
    data: question
 });
}
export const deleteQuestion =  (questionId: number) => {
  return request({
    url: `/deleteQuestion/${questionId}`,
    method: 'delete'
  });
};