<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/Sesa-fundo-branco.png">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 style="margin: 20px">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" style="margin-top: 10px;margin-bottom: 10px;" id="name"
              v-model="name" placeholder="Your name" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" style="margin-top: 10px;margin-bottom: 10px;" class="form-control" id="password"
              v-model="password" placeholder="Your password" required />
          </div>
          <div class="form-group">
            <button type="submit" style="margin: 10px" class="btn btn-success">Login</button>
          </div>
          <!-- Smart alert para mensagens de erro -->
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
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
      errorMessage: null, // Corrigido para 'errorMessage'
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
          this.errorMessage = 'Login inválido.Tente novamente.';
        } else {
          this.errorMessage = 'Ocorreu um erro. Por favor, tente novamente mais tarde.';
        }
      }
    },
  }
};
</script>

<style scoped>
.container {
  background: #402277;
  width: 120%;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
</style>
