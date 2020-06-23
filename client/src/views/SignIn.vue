<template>
  <div>
    <b-form @submit.prevent="signIn">
      <b-form-group id="email-group" label="Email address:" label-for="email">
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="password-group" label="Password: " label-for="password">
        <b-form-input
          id="password"
          type="password"
          v-model="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Sign in</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn() {
      let email = this.email
      let password = this.password
      this.$store
        .dispatch('signIn', { email, password })
        .then(() => {
          this.$router.push({ name: 'Profile' })
        })
        .catch(error => console.log(error.response))
    }
  }
}
</script>

<style lang="scss" scoped></style>
