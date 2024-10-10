<script setup lang="ts">
import { onMounted } from 'vue'
import useJokesTypesList from '@/composables/useJokesTypesList'
import { useGlobalStore } from '@/stores/state'

const store = useGlobalStore()

const { isLoadingJokeTypes, jokeTypes } = useJokesTypesList()

const addJoke = () => {
  store.menuActive = false
  store.showAddJokeModal = true
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
  <aside
    class="fixed flex-col top-0 flex-shrink-0 bg-[#0d2a4b] lg:transform-none leading-tight lg:w-80 flex lg:flex-col z-30 h-screen w-full transition-all overflow-auto pb-20"
    :class="[ store.menuActive ? 'flex' : 'lg:flex transform -translate-y-full']"
  >
    <div class="mt-20 flex flex-col gap-12">
      <div>
        <div class="text-white font-black text-3xl px-10 pt-4">Categories</div>

        <ul
          v-if="!isLoadingJokeTypes"
          class="flex flex-col gap-4 px-10 pt-4 select-none w-full"
        >
          <li
            class="px-4 py-1 rounded-full cursor-pointer font-bold hover:text-[#0d2a4b] hover:bg-[#76cedb]"
            :class="[
                    store.activeCategory === undefined
                      ? 'bg-[#76cedb] text-[#0d2a4b]'
                      : 'bg-[#0d2a4b] text-[#76cedb]'
                  ]"
            @mousedown="store.activeCategory = undefined"
          >
            All
          </li>

          <li
            v-for="item in jokeTypes"
            :key="item._id"
            class="px-4 py-1 rounded-full font-bold hover:text-[#0d2a4b] hover:bg-[#76cedb] cursor-pointer"
            :class="[
                    store.activeCategory === item.name
                      ? 'bg-[#76cedb] text-[#0d2a4b]'
                      : 'bg-[#0d2a4b] text-[#76cedb]'
                  ]"
            @mousedown="store.activeCategory = item.name"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>

      <div>
        <div class="text-white font-black text-3xl px-10 pt-4">Sort by</div>

        <ul class="flex flex-col gap-4 px-10 pt-4 select-none w-full">
          <li
            class="px-4 py-1 rounded-full cursor-pointer font-bold hover:text-[#0d2a4b] hover:bg-[#76cedb]"
            :class="[
                    store.sortOrder === 'desc'
                      ? 'bg-[#76cedb] text-[#0d2a4b]'
                      : 'bg-[#0d2a4b] text-[#76cedb]'
                  ]"
            @mousedown="store.sortOrder = 'desc'"
          >
            More voted
          </li>

          <li
            class="px-4 py-1 rounded-full cursor-pointer font-bold hover:text-[#0d2a4b] hover:bg-[#76cedb]"
            :class="[
                    store.sortOrder === 'asc'
                      ? 'bg-[#76cedb] text-[#0d2a4b]'
                      : 'bg-[#0d2a4b] text-[#76cedb]'
                  ]"
            @mousedown="store.sortOrder = 'asc'"
          >
            Less voted
          </li>
        </ul>
      </div>

      <div>
        <div class="text-white font-black text-3xl px-10 pt-4">Add new joke?</div>

        <ul class="flex flex-col gap-4 px-10 pt-4 select-none w-full">
          <li
            class="px-4 py-1 rounded-full cursor-pointer font-bold text-[#0d2a4b] bg-[#76cedb]"
            @mousedown="addJoke"
          >
            Go!
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
