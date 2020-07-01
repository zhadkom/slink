<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <h4 class="form-title">Sign up</h4>
        <b-form @submit.prevent="signUp">
          <b-form-group label="First name" label-for="first_name">
            <b-form-input
              id="first_name"
              v-model="first_name"
              required
              placeholder="Enter your first name"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Last name" label-for="last_name">
            <b-form-input
              id="last_name"
              v-model="last_name"
              required
              placeholder="Enter your last name"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Email" label-for="email">
            <b-form-input
              id="email"
              type="email"
              v-model="email"
              required
              placeholder="Enter your email"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Password" label-for="password">
            <b-form-input
              id="password"
              type="password"
              v-model="password"
              required
              placeholder="Enter your password"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Confirm password"
            label-for="passwordConfirmation"
          >
            <b-form-input
              id="passwordConfirmation"
              type="password"
              v-model="passwordConfirmation"
              required
              placeholder="Confirm your password"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Sign up</b-button>
          <b-link class="flow-link text-secondary" :to="{ name: 'SignIn' }"
            >Already have an account? Then sign in</b-link
          >
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  },

  methods: {
    //TODO: password confirmation
    signUp() {
      let user = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
        image_url: '',
        created_at: new Date(),
        role_id: 1
      }

      this.$store
        .dispatch('signUp', user)
        .then(() => {
          this.$router.push('/profile')
        })
        .catch(error => console.log(error))
    }
  }
}
</script>
