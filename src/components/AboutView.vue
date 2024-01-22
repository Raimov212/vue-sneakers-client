<script setup>
import { useCartStore } from '@/store/cartsStore'
import { computed } from 'vue'

const store = useCartStore()

const doubleCount = computed(() => store.doubleCount)
</script>

<template>
  <div class="m-4" style="border: 2px solid blue; width: 200px; text-align: center">
    <div class="text-red-500">Title : {{ title }}</div>
    <div>Price : {{ console.log(store.count) }}</div>
    <div>Added : {{ isAdded }}</div>
    <button class="btn" @click="doubleCount">doubleCount</button>
  </div>
</template>
