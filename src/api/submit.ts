// 导入request.js请求工具
import request from '@/utils/request.js';

export function getSubmitList(problem_id?: string, offset: number = 0, limit: number = 100 ) {
  const params = { offset, limit };
  if (problem_id !== undefined) {
      params['problem_id'] = problem_id;
  }
  console.log(params)
  return request.get('/submit/', {
      params
  });
}
export function submitCode(problem_id: string, code: string, language: string) {
  return request.post('/submit', {
    problem_id,
    code,
    language,
  });
}
// 提交代码
export function debugSubmit(problem_id: string, code: string, language: string, cases:any) {
  return request.post('/submit/judge', {
    problem_id,
    code,
    language,
    cases,
  });
}

//获取测试案例
export function getSolution(problem_id:string){
  return request.get(`/problem/${{problem_id}}/solution`)
}