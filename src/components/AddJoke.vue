<script setup lang="ts">
import useJokesTypesList, { type JokeType } from '@/composables/useJokesTypesList'
import { computed, ref } from 'vue'
import useJokesAction from '@/composables/useJokesAction'

const show = defineModel('show', { default: false })
const emit = defineEmits(['onadded'])

const { jokeTypes } = useJokesTypesList()
const { createJoke } = useJokesAction()

const currentType = ref<JokeType>(jokeTypes.value[0])
const punchline = ref('')
const setup = ref('')

const create = () => {
  show.value = false
  createJoke({
    typeId: currentType.value._id,
    punchline: punchline.value,
    setup: setup.value,
    rating: 0
  })
  emit('onadded')
}

const closeDropdown = () => {
  const dropdown = document.querySelector('#dropdown-1')
  if (dropdown) (dropdown as HTMLElement).hidePopover()
}

const canAdd = computed(() => punchline.value.length === 0 || setup.value.length === 0)
</script>

<template>
  <transition>
    <div v-if="show" class="fixed top-0 left-0 w-screen h-screen z-50 bg-black/50">
      <div class="flex min-h-full justify-center p-4 text-center items-center">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl w-full lg:max-w-96 lg:min-w-96 transition-all sm:my-8"
        >
          <div
            v-if="currentType"
            class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col gap-4"
          >
            <div class="relative group">
              <span class="text-xs">Category</span>
              <div class="relative group">
                <button
                  class="dropdown-button flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                  popovertarget="dropdown-1"
                >
                  <span class="mr-2">{{ currentType.name }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 ml-2 -mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>

                <div
                  id="dropdown-1"
                  class="dropdown-menu z-50 flex-col w-full mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1"
                  @mousedown="closeDropdown"
                  popover
                >
                  <div
                    v-for="item in jokeTypes"
                    :key="item._id"
                    class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                    @mousedown="currentType = item"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>

            <div class="relative group">
              <span class="text-xs">Setup</span>
              <div class="relative group">
                <textarea
                  v-model="setup"
                  class="flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                />
              </div>
            </div>

            <div class="relative group">
              <span class="text-xs">Punchline</span>
              <div class="relative group">
                <textarea
                  v-model="punchline"
                  class="flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              :class="[ canAdd ? 'opacity-10 cursor-not-allowed' : '' ]"
              @click="create"
              :disabled="canAdd"
            >
              Add
            </button>
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              @click="show = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.dropdown-button {
  anchor-name: --dropdown-button;
}

.dropdown-menu {
  position-anchor: --dropdown-button;
  position-area: bottom center;
  position-try-fallbacks: top center;
  position-try-order: most-height;
}
</style>
