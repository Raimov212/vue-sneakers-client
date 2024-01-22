<script setup>
import axios from 'axios'
import { inject, onMounted, reactive, ref, watch } from 'vue'
import debounce from 'lodash.debounce'
import CardView from '@/components/CardView.vue'

const { carts, addAndDeleteToCart } = inject('props-cart')

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})
const onChangeSort = (e) => {
  filters.sortBy = e.target.value
}

const onChangeSearchInput = debounce((e) => {
  filters.searchQuery = e.target.value
}, 500)

const addFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        favorite: item
      }

      const arr = await axios.get(`https://01b49c08aa7e0ce4.mokky.dev/favorites`)
      arr.data.map((item) => {
        if (item.parentId === item.id) {
          return
        }
      })
      item.isFavorite = true
      const { data } = await axios.post(`https://01b49c08aa7e0ce4.mokky.dev/favorites`, obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://01b49c08aa7e0ce4.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://01b49c08aa7e0ce4.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const fetchItems = async () => {
  const params = {
    sortBy: filters.sortBy
  }

  if (filters.searchQuery) {
    Object.assign(params, { title: `*${filters.searchQuery}*` })
  }

  try {
    const { data } = await axios.get(`https://01b49c08aa7e0ce4.mokky.dev/sneakers`, {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('carts')
  carts.value = localCart ? JSON.parse(localCart) : []
  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: carts.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(filters, fetchItems)

watch(carts, () => {
  items.value = items.value.map((item) => ({ ...item, isAdded: false }))
})
</script>

<template>
  <CardView
    :items="items"
    :changeSort="onChangeSort"
    :changeSearchInput="onChangeSearchInput"
    @addToFavorite="addFavorite"
    @addToCart="addAndDeleteToCart"
  />
</template>
