<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isAdded: Boolean,
  addToCart: Function
})
</script>

<template>
  <div
    class="relative min-w-[250px] flex gap-1 p-4 justify-center border border-gray-200 rounded-3xl cursor-pointer"
  >
    <img :src="imageUrl" alt="krosovka" class="w-[64px] h-[64px] b" />
    <div class="text-black">
      <div class="flex gap-2">
        <b>{{ title }}</b>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex gap-2">
          <p>Цена :</p>
          <b>{{ price }}$</b>
        </div>
        <img
          @click="addToCart"
          src="/delete.svg"
          alt="heart"
          class="w-[24px] cursor-pointer hover:scale-[1.15] hover:transition-all"
        />
      </div>
    </div>
  </div>
</template>
