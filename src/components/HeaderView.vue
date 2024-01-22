<script setup>
import DrawerView from './DrawerView.vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
defineProps({
  totalPrice: Number,
  loadingRequest: Object
})

const isLoggedIn = ref(false)
const router = useRouter()

let auth

onMounted(async () => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/sign-in')
  })
}
</script>

<template>
  <div class="border-b-2 border-b-slate-300 px-8 py-4 flex justify-between">
    <router-link to="/">
      <div class="flex gap-2 items-center">
        <img src="/public/logo.png" class="w-[32px] h-32px" alt="" />
        <b class="text-2xl text-green-400">VUE Marketplace(Sneakers)</b>
      </div>
    </router-link>
    <div class="drawer drawer-end z-50 fixed">
      <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
      <div class="drawer-side">
        <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="menu p-4 w-96 min-h-full text-base-content bg-white">
          <DrawerView />
        </div>
      </div>
    </div>
    <ul class="flex gap-4 items-center">
      <li>
        <label
          class="cursor-pointer text-[#808080] transition-all hover:text-[#000000] flex items-center gap-2"
          for="my-drawer-4"
        >
          <img class="w-[24px]" src="/public/cart.svg" />
          <p class="font-semibold">${{ totalPrice }}</p>
        </label>
      </li>
      <li>
        <router-link
          to="/favorites"
          class="font-semibold cursor-pointer transition-all text-[#808080] hover:text-[#000000] flex items-center gap-2"
        >
          <img class="w-[24px]" src="/public/favourite.svg" alt="" />
          <p>Закладки</p>
        </router-link>
      </li>
      <li class="dropdown">
        <div
          tabindex="0"
          class="cursor-pointer text-[#808080] transition-all hover:text-[#000000] flex items-center gap-2"
        >
          <img class="w-[24px] text-red-300" src="/public/account.svg" alt="" />
          <p class="font-semibold">Профиль</p>
        </div>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md w-52">
          <li @click="handleSignOut" v-if="isLoggedIn"><a>Log out</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>
