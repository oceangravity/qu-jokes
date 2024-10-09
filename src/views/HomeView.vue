<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import AsideComponent from '@/components/AsideComponent.vue'
import JokeListComponent from '@/components/JokeListComponent.vue'

</script>

<template>
  <div class="flex flex-col min-h-screen text-base font-sans">
    <div class="flex flex-1 mx-auto w-full max-w-1440 bg-white pt-20 lg:pt-0">
      <div class="flex flex-1 h-full">
        <HeaderComponent />

        <AsideComponent />

        <JokeListComponent />
      </div>
    </div>
  </div>
</template>
