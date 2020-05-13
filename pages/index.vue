<template>
  <h1>{{ user.name }}</h1>
</template>

<script>
import USER_QUERY from '~/apollo/queries/user.gql'
export default {
  apollo: {
    user: {
      query: USER_QUERY
    }
  }
}
</script>
