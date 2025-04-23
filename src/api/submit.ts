// 导入request.js请求工具
import request from '@/utils/request.js';

export function getSubmitList(problem_uniqueId: string, offset: number=0, limit: number=10) {
  return request.get(`/submit/?&problem_uniqueId=${problem_uniqueId}&offset=${offset}&limit=${limit}`);
}