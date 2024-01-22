<script setup>
import axios from 'axios'
import { inject, ref } from 'vue'
import DrawerCartItem from './DrawerCartItem.vue'
import CardInfo from './CardInfo.vue'
import debounce from 'lodash.debounce'

const { carts, addAndDeleteToCart, totalPrice, vatPrice, loadingRequest } = inject('props-cart')

const orderId = ref(null)

const debounceCartOrderId = debounce(() => {
  orderId.value = null
}, 5000)

const createOrder = async () => {
  try {
    loadingRequest.isCreatingOrder = true
    const data = await axios.post(`https://01b49c08aa7e0ce4.mokky.dev/orders`, {
      order: carts.value,
      total: totalPrice.value
    })

    if (data.status > 200) {
      orderId.value = data?.data?.id
      debounceCartOrderId()
      carts.value = []
    }

    console.log(data)

    return data
  } catch (error) {
    console.log(error)
  } finally {
    loadingRequest.isCreatingOrder = false
  }
}
</script>

<template>
  <div>
    <div class="flex flex-col h-full">
      <div class="flex gap-4">
        <label for="my-drawer-4" class="cursor-pointer">
          <img src="/left-arrow.svg" class="w-8 h-8" />
        </label>
        <h2 class="text-2xl font-bold mb-4">Корзина</h2>
      </div>
      <div>
        <div v-if="totalPrice">
          <div v-auto-animate class="h-[500px] overflow-hidden overflow-y-scroll">
            <div class="flex flex-col gap-4 overflow-hidden" v-auto-animate>
              <DrawerCartItem
                v-for="cart in carts"
                :key="cart.id"
                :imageUrl="cart.image"
                :title="cart.title"
                :price="cart.price"
                :isAdded="cart.isAdded"
                :addToCart="() => addAndDeleteToCart(cart)"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2 mt-4">
            <div class="flex items-center gap-2">
              <p class="w-[80px] font-semibold">Итого :</p>
              <p class="w-full border border-b-1 border-dotted"></p>
              <b>${{ totalPrice }}</b>
            </div>
            <div class="flex items-center gap-2">
              <p class="w-[110px] font-semibold">Налог 5%:</p>
              <p class="w-full border border-b-1 border-dotted"></p>
              <b>${{ vatPrice }}</b>
            </div>
            <span
              v-if="loadingRequest.isCreatingOrder"
              class="loading text-primary ml-40 mt-4 loading-dots loading-lg"
            ></span>
            <button
              v-else
              @click="createOrder"
              :disabled="totalPrice ? false : true"
              class="btn btn-block rounded-xl"
            >
              Оформить заказ
            </button>
          </div>
        </div>
        <div v-if="!totalPrice || orderId" v-auto-animate>
          <CardInfo
            v-if="!totalPrice && !orderId"
            image-url="/folder-empty.svg"
            title="Корзина пустая"
            description="Добавбте хотя бы одну пару кроссовокб чтобы сделать заказю"
          />
          <CardInfo
            v-if="orderId"
            image-url="/success-order.svg"
            title="Заказ оформлен!"
            :description="`Ваш заказ #${orderId} скоро будет передан`"
          />
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
