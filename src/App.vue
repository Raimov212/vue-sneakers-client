<script setup></script>

<script setup>
import HeaderView from './components/HeaderView.vue'

import { computed, provide, reactive, ref, watch } from 'vue'

/* Korzina start */
const carts = ref([])
const loadingRequest = reactive({
  isCreatingOrder: false,
  count: 0
})

const totalPrice = computed(() => carts.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => (totalPrice.value * 3) / 100)

const addAndDeleteToCart = (item) => {
  if (!item.isAdded) {
    carts.value.push(item)
    item.isAdded = true
  } else {
    carts.value.splice(carts.value.indexOf(item), 1)
    item.isAdded = false
  }
}

/* Korzina end*/

watch(
  carts,
  () => {
    localStorage.setItem('carts', JSON.stringify([...carts.value]))
  },
  { deep: true }
)

provide('props-cart', {
  carts,
  addAndDeleteToCart,
  totalPrice,
  vatPrice,
  loadingRequest
}) //prop drilling
</script>

<template>
  <div class="bg-white w-4/5 m-auto h-screen rounded-md shadow-xl my-10 overflow-hidden">
    <header>
      <HeaderView :totalPrice="totalPrice" :loadingRequest="loadingRequest" />
    </header>
    <nav v-auto-animate>
      <router-view></router-view>
    </nav>
  </div>
</template>
