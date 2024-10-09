import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('globalState', () => {
  const sortBy = ref('rating')
  const sortOrder = ref<'asc' | 'desc'>('desc')
  const page = ref(1)
  const limit = ref(10)
  const activeCategory = ref<string | undefined>(undefined)
  const menuActive = ref(false)
  const showAddJokeModal = ref(false)

  return { sortBy, sortOrder, page, limit, activeCategory, menuActive, showAddJokeModal }
})
