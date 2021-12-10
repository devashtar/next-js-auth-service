import { makeAutoObservable } from 'mobx'

class Store {
  isDark: boolean
  isLoading: boolean
  typeDisplayForm: number // 0 = none; 1 = reg; 2 = auth;

  constructor() {
    this.isDark = false
    this.isLoading = false
    this.typeDisplayForm = 0
    makeAutoObservable(this)
  }

  setIsDarkMode(bool: boolean | void) {
    const curMode = bool === undefined ? !this.isDark : bool
    this.isDark = curMode
    localStorage.setItem('themeMode', curMode ? 'isDark' : '')
  }

  setTypeDisplayForm(num: number) {
    this.typeDisplayForm = num
  }

  setIsLoading(bool: boolean) {
    this.isLoading = bool
  }
}

export default new Store()
