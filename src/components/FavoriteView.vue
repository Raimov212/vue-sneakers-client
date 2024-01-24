<script setup>
import FavoriteCartItem from './FavoriteCartItem.vue'

defineProps({
  favoriteItems: Array
})
</script>

<template>
  <FavoriteCartItem
    v-for="item in favoriteItems"
    :key="item.favorite?.id"
    :title="item.favorite?.title"
    :imageUrl="item.image"
    :price="item.price"
    :onAddedFavorite="() => $emit('addToFavorite', item)"
    :onAddedCart="() => $emit('addToCart', item)"
    :isFavorite="item.isFavorite"
    :isAdded="item.isAdded"
  />
</template>

<style lang="scss" scoped></style>
