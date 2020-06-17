<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="#">SLINK</b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item :to="{ name: 'Home' }">Home</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" right>
        <b-nav-item :to="{ name: 'Home' }">Sign in</b-nav-item>
        <b-nav-item :to="{ name: 'Home' }">Sign up</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
