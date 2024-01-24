<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import FavoriteViewVue from '../components/FavoriteView.vue'

const favoriteItems = ref([])

onMounted(async () => {
  await fetchFavorites()
})

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get(`https://01b49c08aa7e0ce4.mokky.dev/favorites`)
    favoriteItems.value = data.map((item) => item.favorite)
    console.log(favoriteItems.value)
  } catch (error) {
    console.log(error)
  }
}

const favoriteItemsComputed = computed(() => favoriteItems.value)
</script>

<template>
  <div class="grid grid-cols-4 bl gap-4 h-[500px] overflow-y-scroll p-10" ref="parent">
    <FavoriteViewVue :favoriteItems="favoriteItemsComputed" />
  </div>
</template>
