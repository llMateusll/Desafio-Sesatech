<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 style="margin: 20px">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" style="margin: 10px; text-align: center" id="name" v-model="name"
              placeholder="Your name" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" style="margin: 10px; text-align: center" class="form-control" id="password"
              v-model="password" placeholder="Your password" required />
          </div>
          <div class="form-group">
            <button type="submit" style="margin: 10px" class="btn btn-success">Login</button>
          </div>
          <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = ''; // Limpa a mensagem de erro antes de tentar logar
      try {
        const response = await axios.post('http://localhost:8000/login', {
          name: this.name,
          password: this.password,
        });
        localStorage.setItem('token', response.data.accessToken);
        this.$router.push('/dashboard'); // Certifique-se de que essa rota esteja definida no seu Vue Router
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Login inválido. Por favor, tente novamente.';
        } else {
          this.errorMessage = 'Ocorreu um erro. Por favor, tente novamente mais tarde.';
        }
      }
    },
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding-top: 100px;
}
</style>
