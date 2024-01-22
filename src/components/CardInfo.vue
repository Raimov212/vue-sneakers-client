<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String
})
</script>

<template>
  <div class="flex flex-col gap-2 items-center mx-auto w-72 mt-40">
    <img :src="imageUrl" height="70" width="70" alt="" />
    <p class="text-2xl font-bold">{{ title }}</p>
    <p class="text-md text-primary">
      {{ description }}
    </p>
  </div>
</template>
