<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import CardItemView from '../components/CardItemView.vue'

const favoriteItems = ref([])

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get(`https://01b49c08aa7e0ce4.mokky.dev/favorites`)
    favoriteItems.value = data.map((item) => item.favorite)
    console.log(favoriteItems.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchFavorites()
})
</script>

<template>
  <div class="grid grid-cols-4 bl gap-4 h-[500px] overflow-y-scroll p-10" ref="parent">
    <CardItemView
      v-for="item in favoriteItems"
      :key="item.id"
      :title="item.title"
      :imageUrl="item.image"
      :price="item.price"
      :onAddedFavorite="() => emit('addToFavorite', item)"
      :onAddedCart="() => emit('addToCart', item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
</template>
