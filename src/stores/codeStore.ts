import {defineStore} from 'pinia'

export const useCodeStore = defineStore('code', {
  state: () => ({
      code: '',
      language: '',

  }),
  actions: {
    // 设置代码
    setCode(code: string) {
      this.code = code
    },
  // 设置语言
    setLanguage(language: string) {
        this.language = language
    },
},
  persist: true
})