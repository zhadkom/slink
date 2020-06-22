<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand :to="{ name: 'Home' }">SLINK</b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item :to="{ name: 'Home' }">Home</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" right>
        <b-nav-item v-if="isLoggedIn" :to="{ name: 'Profile' }"
          >Profile</b-nav-item
        >
        <b-nav-item v-if="!isLoggedIn" :to="{ name: 'SignIn' }"
          >Sign in</b-nav-item
        >
        <b-nav-item v-if="!isLoggedIn" :to="{ name: 'SignUp' }"
          >Sign up</b-nav-item
        >
        <b-nav-item v-if="isLoggedIn" @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import store from '../store'
export default {
  computed: {
    isLoggedIn() {
      return store.getters.isLoggedIn
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ name: 'SignIn' }).catch(() => {})
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
