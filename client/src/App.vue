<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.form-title {
  margin-top: 25px;
  margin-bottom: 25px;
}

label {
  text-align: left;
}

.flow-link {
  margin-top: 15px;
  font-size: 12px;
  display: block;
}
</style>
