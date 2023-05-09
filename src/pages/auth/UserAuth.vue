<template>
  <base-card>
    <form @submit.prevent="submitForm" class="form-control">
      <div>
        <label for="email">E-Mail: </label>
        <input type="text" id="email" v-model.trim="email" />
      </div>
      <div>
        <label for="password">Password: </label>
        <input type="password" id="Password" v-model="password" />
      </div>
      <p v-if="!formIsValid">
        Please enter a valid email and password (must be at least 6 charecter
        long)
      </p>
      <base-button>{{ submitButtonCaption }}</base-button>
      <base-button type="button" mode="flat" @click="switchAuthMode">{{
        switchModeButtonCaption
      }}</base-button>
    </form></base-card
  >
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      // send http request...
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
  display: block;
}

input {
  width: 95%;
}

button {
  margin-top: 0.5rem;
}
</style>
