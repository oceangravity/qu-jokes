<script setup lang="ts">
import { onMounted } from 'vue'
import QUJokesLogo from '@/components/QUJokesLogo.vue'
import { useGlobalStore } from '@/stores/state'
const store = useGlobalStore()

onMounted(() => {
  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      store.menuActive = false
    }
  })
})
</script>

<template>
  <header
    class="fixed h-20 w-full lg:w-80 top-0 bg-[#0d2a4b] flex z-50 items-center justify-between lg:justify-center px-8"
  >
    <div
      class="h-full w-8 cursor-pointer flex items-center lg:hidden text-[#76cedb] select-none transition-all"
      :class="[ store.menuActive && 'rotate-45']"
      @mousedown="store.menuActive = !store.menuActive"
    >
      <svg
        class="ast-mobile-svg ast-menu2-svg"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="28"
        viewBox="0 0 24 28"
      >
        <path
          d="M24 21v2c0 0.547-0.453 1-1 1h-22c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h22c0.547 0 1 0.453 1 1zM24 13v2c0 0.547-0.453 1-1 1h-22c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h22c0.547 0 1 0.453 1 1zM24 5v2c0 0.547-0.453 1-1 1h-22c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h22c0.547 0 1 0.453 1 1z"
        ></path>
      </svg>
    </div>

    <QUJokesLogo />
  </header>
</template>
