<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import useJokesList from '@/composables/useJokesList'
import useJokesAction from '@/composables/useJokesAction'
import { useGlobalStore } from '@/stores/state'
import DeleteJoke from '@/components/DeleteJoke.vue'
import AddJoke from '@/components/AddJoke.vue'

const store = useGlobalStore()

const showDeleteJokeModal = ref(false)
const selected = ref('')

const onRemoved = () => {
  refetch()
}

const { incrementJokeRating } = useJokesAction()

const {
  jokes,
  isLoading,
  isError,
  error,
  refetch,
  nextPage: next,
  prevPage: prev,
  totalPages,
  currentPage,
  sortBy: composableSortBy,
  sortOrder: composableSortOrder,
  onlyJokeType
} = useJokesList({
  page: store.page,
  limit: store.limit,
  sortBy: store.sortBy,
  sortOrder: store.sortOrder,
  onlyJokeType: store.activeCategory
})

watch([() => store.sortBy, () => store.sortOrder, () => store.activeCategory], () => {
  composableSortBy.value = store.sortBy
  composableSortOrder.value = store.sortOrder
  onlyJokeType.value = store.activeCategory
  store.page = 1
  currentPage.value = 1
  store.menuActive = false
  refetch()
})

const nextPage = () => {
  next()
  refetch()
}

const prevPage = () => {
  prev()
  refetch()
}

const openDeleteModal = (id: string) => {
  selected.value = id
  showDeleteJokeModal.value = true
}

const addPoint = (id: string) => {
  const element = document.querySelector(`#add-point-button-${id}`)

  if (element) {
    element.classList.add('animate-bounce')
  }
  incrementJokeRating(id)
  refetch()

  setTimeout(() => {
    if (element) {
      element.classList.remove('animate-bounce')
    }
  }, 2000)
}

onMounted(() => {
  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      store.menuActive = false
    }
  })
})
</script>

<template>
  <div class="w-full flex-1 lg:ml-80 overflow-x-hidden h-full">
    <div class="flex flex-col p-10 md:px-24 md:pb-24 gap-8">
      <main class="w-full min-h-full">
        <div v-if="isLoading" class="flex flex-col gap-8">
          <div
            v-for="id in 10"
            :key="id"
            class="bg-neutral-100 shadow rounded-lg p-6 md:p-14 h-52 animate-pulse"
          >
            <p class="mb-2 bg-gray-300 w-96 h-7 rounded-md"></p>
            <p class="mb-2 bg-gray-300 w-60 h-7 rounded-md"></p>
            <p class="mb-2 bg-gray-300 w-36 h-7 rounded-md"></p>
          </div>
        </div>
        <div v-else-if="isError" class="text-center text-red-500">Error: {{ error }}</div>
        <div v-else class="flex flex-col gap-8">
          <div
            v-for="joke in jokes"
            :key="joke._id"
            class="relative bg-neutral-50 shadow rounded-lg p-6 md:p-14 h-52"
          >
            <p class="text-lg font-semibold mb-2">{{ joke.setup }}</p>
            <p class="text-gray-600 mb-4">{{ joke.punchline }}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">Type: {{ joke.type.name }}</span>
              <div
                :id="`add-point-button-${joke._id}`"
                class="text-sm font-bold flex items-center gap-1 select-none group cursor-pointer"
                @click="addPoint(joke._id.toString())"
              >
                <span class="text-xl group-hover:opacity-100 opacity-30">🤣</span>
                <span>{{ joke.rating }} laughs</span>
              </div>
            </div>

            <button
              class="absolute opacity-20 hover:opacity-100 top-0 right-0 p-4 select-none cursor-pointer"
              @mousedown="openDeleteModal(joke._id.toString())"
            >
              ❌
            </button>
          </div>
        </div>
      </main>

      <footer class="flex justify-end">
        <div class="flex items-center space-x-2">
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Prev
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  </div>

  <DeleteJoke v-model:show="showDeleteJokeModal" @onremoved="onRemoved" :id="selected" />
  <AddJoke v-model:show="store.showAddJokeModal" />
</template>
