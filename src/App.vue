<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import useJokesTypesList from '@/composables/useJokesTypesList'
import QUJokesLogo from '@/components/QUJokesLogo.vue'

const { getJokeTyoes, isLoadingJokeTypes } = useJokesTypesList()
const isLoading = ref(true)

onMounted(() => {
  getJokeTyoes()

  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <div v-if="isLoadingJokeTypes || isLoading" class="fixed top-0 left-0 w-screen h-screen bg-[#0c1c32] flex justify-center items-center text-4xl">
    <span class="animate-bounce">
      <QUJokesLogo />
    </span>
  </div>
  <RouterView v-else/>
</template>
