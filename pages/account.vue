<template>
  <div>
    <h1 class="text-center text-gray-600 text-2xl mt-8">
      Your Account
    </h1>
    <div v-if="$apollo.queries.me.loading">
      ...loading
    </div>
    <template v-else>
      <div v-if="me.yourPosts.length > 0" class="flex justify-between items-baseline">
        <h1 class="text-lg text-gray-600">
          Your Good News
        </h1>
        <button class="py-1 px-2 text-white rounded bg-indigo-400" @click="toggleForm">
          Add Good News
        </button>
      </div>
      <form v-if="isOpen" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4" @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Title
          </label>
          <input
            id="title"
            v-model="title"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Won a milion dollars">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Description
          </label>
          <textarea
            id="description"
            v-model="description"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="I won the lottery today" />
        </div>
        <div class="flex items-center justify-between">
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
            Submit
          </button>
        </div>
      </form>
      <Card class="mt-2 mb-8">
        <div v-if="me.yourPosts.length > 0">
          <div v-for="(post, i) in me.yourPosts" :key="i" :class="{'mt-6 border-t-2 pt-4': i > 0}">
            <h1>{{ post.title }}</h1>
            <p>{{ post.description }}</p>
          </div>
        </div>
        <div v-else class="text-center text-gray-600">
          <h1 class="text-xl">
            This is where all the magic happens
          </h1>
          <p>You haven’t posted any good news yet..let’s change that</p>
          <button class="px-6 py-3 mt-4 text-white rounded bg-indigo-400" @click="toggleForm">
            Add Some Good News
          </button>
        </div>
      </Card>
    </template>
  </div>
</template>

<script>
import ME from '~/apollo/queries/me'
import CREATE_POST_MUTATION from '~/apollo/mutations/createPost'
import Card from '~/components/Card'
export default {
  components: {
    Card
  },
  apollo: {
    me: {
      query: ME
    }
  },
  data() {
    return {
      isOpen: false,
      title: '',
      description: ''
    }
  },
  methods: {
    toggleForm() {
      this.isOpen = !this.isOpen
    },
    async handleSubmit() {
      try {
        await this.$apollo.mutate({
          mutation: CREATE_POST_MUTATION,
          variables: {
            title: this.title,
            description: this.description
          },
          update: (store, { data: { createPost } }) => {
            const data = store.readQuery({
              query: ME
            })

            data.me.yourPosts.push({
              ...createPost
            })

            store.writeQuery({
              query: ME,
              data
            })
          }
        })
        this.title = ''
        this.description = ''
        this.toggleForm()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
