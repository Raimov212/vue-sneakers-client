<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()
const errMsg = ref('')

const register = async (e) => {
  e.preventDefault()
  await createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((res) => {
      console.log('success', res)
      router.push('/sign-in')
    })
    .catch((err) => {
      console.log(err.code)
      switch (err.code) {
        case 'auth/email-already-in-use':
          errMsg.value = 'Email already in use'
          break

        case 'auth/user-not-found':
          errMsg.value = 'No account with email was found'
          break

        case 'auth/wrong-password':
          errMsg.value = 'Incorrect password'
          break

        default:
          errMsg.value = 'An error occurred while logging in.'
          break
      }
    })

  try {
    await axios.post(`https://1f80988ef93046ce.mokky.dev/register`, {
      email: email.value,
      password: password.value
    })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="flex justify-center items-center mt-32" v-auto-animate>
    <div class="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form @submit="register" class="">
        <div class="identity-input mb-4">
          <label for="identity" class="block text-gray-700 text-sm font-bold mb-2"> Email</label>
          <input
            id="identity"
            class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Email"
            aria-describedby="emailHelp"
            v-model="email"
          />
          <span class="text-xs text-red-700" id="emailHelp"></span>
        </div>

        <div class="password-input mb-4">
          <label for="identity" class="block text-gray-700 text-sm font-bold mb-2">Password</label>

          <input
            aria-describedby="passwordHelp"
            v-model="password"
            class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*******"
          />

          <span class="text-xs text-red-700" id="passwordHelp"></span>
        </div>
        <p class="text-red-400 mb-4 text-center">{{ errMsg }}</p>
        <div class="flex flex-col w-full items-center justify-between gap-4">
          <button
            class="hover:scale-105 w-full py-1 transition-all bg-black text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
          <!-- <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a> -->
        </div>
      </form>
      <button
        @click="() => router.push('sign-in')"
        class="hover:scale-105 bg-blue-600 w-full mt-4 py-1 transition-all text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Sign In
      </button>
    </div>
  </div>
</template>
