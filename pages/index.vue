<template>
  <div>
    <div v-if="$apollo.queries.allPosts.loading">
      ...loading
    </div>
    <template v-else>
      <div v-if="allPosts.length > 0" class="flex justify-between items-baseline mt-8">
        <h1 class="text-lg text-gray-600">
          All Good News
        </h1>
      </div>
      <Card class="mt-2 mb-8">
        <div v-if="allPosts.length > 0">
          <div v-for="(post, i) in allPosts" :key="i" :class="{'mt-6 border-t-2 pt-4': i > 0}">
            <h1 class="text-gray-600 text-xl">
              {{ post.title }}
            </h1>
            <p class="text-gray-600">
              {{ post.description }}
            </p>
            <p class="text-sm text-indigo-400 mt-4">
              @{{ post.user.username }}
            </p>
          </div>
        </div>
        <div v-else class="text-center text-gray-600">
          <h1 class="text-xl">
            No one has posted anything yet
          </h1>
          <p>Be the first to post some good news!</p>
        </div>
      </Card>
    </template>
  </div>
</template>

<script>
import Card from '~/components/Card'
import ALL_POSTS_QUERY from '~/apollo/queries/allPosts'
export default {
  components: {
    Card
  },
  apollo: {
    allPosts: {
      query: ALL_POSTS_QUERY
      // fetchPolicy: 'cache-and-network'
    }
  }
}
</script>
