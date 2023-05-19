<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating" fixed>
      <p>Authenticating...</p>
      <base-spinner></base-spinner>
    </base-dialog>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
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
    async submitForm() {
      this.formIsValid = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      };
      try {
        if (
          this.email === '' ||
          !this.email.includes('@') ||
          this.password.length < 6
        ) {
          this.formIsValid = false;
          return;
        }

        this.isLoading = true;

        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error =
          err.message ||
          'Failed to authenticate, try later. Check your login data.';
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
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
