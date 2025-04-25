import {defineStore} from 'pinia'

export const useCodeStore = defineStore('code', {
  state: () => {
    return {
      code: '',
      language: '',
      cases: [],
    }


  },
  actions: {
    // 设置代码
    setCode(code: string) {
        this.code = code
    },
  // 设置语言
    setLanguage(language: string) {
        this.language = language
    },
    // 设置测试用例
    setCases(cases: any) {
        this.cases = cases
    },
}

})