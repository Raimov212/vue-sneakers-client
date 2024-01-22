<script setup>
import CardItemView from './CardItemView.vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

defineProps({
  items: Array,
  changeSort: Function,
  changeSearchInput: Function
})

const [parent] = useAutoAnimate()

const emit = defineEmits(['addToFavorite', 'addToCart'])

// const addFavorite = inject('addFavorite') //prop drilling
</script>

<template>
  <div class="p-10">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-3xl font-bold mb-4 text-black">Все кроссовки</h2>
      <div class="flex items-center gap-4">
        <select
          @change="changeSort"
          class="select select-bordered rounded-xl bg-white w-[200px] h-2 max-w-xs"
        >
          <option value="title" selected>По названию</option>
          <option value="price">По цена(Дешевые)</option>
          <option value="-price">По цена(дорогие)</option>
        </select>
        <input
          type="text"
          @input="changeSearchInput"
          placeholder="Поиск..."
          class="input rounded-xl bg-white input-bordered w-[300px]"
        />
      </div>
    </div>
    <div class="grid grid-cols-4 pt-2 bl gap-4 h-[500px] overflow-y-scroll" ref="parent">
      <CardItemView
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :imageUrl="item.image"
        :price="item.price"
        :onAddedFavorite="() => emit('addToFavorite', item)"
        :onAddedCart="() => emit('addToCart', item)"
        :isFavorite="item.isFavorite"
        :isAdded="item.isAdded"
        :isWatched="item.isWatched"
      />
    </div>
  </div>
</template>
