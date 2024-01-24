<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onAddedFavorite: Function,
  onAddedCart: Function,
  isWatched: Boolean
})
</script>

<template>
  <div
    class="relative min-w-[250px] max-h-[400px] flex flex-col p-4 justify-center border border-gray-200 rounded-3xl cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-all"
  >
    <img
      @click="onAddedFavorite"
      :src="!isFavorite ? 'heart-1.svg' : '/heart.svg'"
      alt="img"
      class="w-[24px] hover:scale-110 r transition-all rounded-md cursor-pointer absolute top-4 left-4"
    />
    <div class="pt-8">
      <img
        :src="imageUrl"
        v-if="imageUrl"
        alt="krosovka"
        class="w-[250px] h-[230px] object-cover"
      />
      <div class="text-black">
        <div class="flex gap-2">
          <b v-if="title">{{ title }}</b>
          <div v-else class="skeleton h-4 w-full"></div>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex gap-2">
            <p>Цена :</p>
            <b>{{ price }}$</b>
          </div>
          <img
            :src="!isAdded ? '/plus.svg' : '/check.svg'"
            alt="heart"
            @click="onAddedCart"
            class="w-[32px] h-[32px] cursor-pointer hover:scale-[1.15] hover:transition-all"
          />
        </div>
      </div>
    </div>
  </div>
</template>
