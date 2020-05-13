<template>
  <div>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handleSubmit">
      <p class="mb-6 text-center text-2xl text-gray-600">
        Sign Up
      </p>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input
          id="username"
          v-model="username"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Username">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
          id="password"
          v-model="password"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="******************">
      </div>
      <div class="flex items-center justify-between">
        <nuxt-link to="/signin" class="text-indigo-500 ">
          Already have an account?
        </nuxt-link>
        <button
          class="
            bg-indigo-500
            hover:bg-indigo-700
            text-white ml-auto
            font-bold py-2
            px-4
            rounded
            focus:outline-none
            focus:shadow-outline"
          type="submit">
          Sign Up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import SIGN_UP_MUTATION from '~/apollo/mutations/signUp'
export default {
  layout: 'center',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: SIGN_UP_MUTATION,
          variables: {
            username: this.username,
            password: this.password
          }
        })
        this.$apolloHelpers.onLogin(data.signUp.id)
        this.$router.push({ path: '/' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
