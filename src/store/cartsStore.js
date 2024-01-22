import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useCartStore = defineStore('carts', {
  state: () => {
    return { count: 0, name: 'John' }
  },
  getters: {
    doubleCount: computed((state) => state.count + 1),
    reName: (state) => ({ ...state, name: 'Artur' })
  },
  actions: {
    increment() {
      this.count++
    },
    reNameFn() {
      this.name = 'asdasd'
    }
  }
})
