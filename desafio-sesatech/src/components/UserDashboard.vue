<template>
  <div>
    <h1>Página do Dashboard</h1>
    <table>
      <thead>
        <tr>
          <th>Ordem de Serviço</th>
          <th>Nome</th>
          <th>Matrícula</th>
          <th>Serviço</th>
          <th>Status do Serviço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.ordemServiceNumber">
          <td>{{ item.ordemServiceNumber }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.registration }}</td>
          <td>{{ item.service }}</td>
          <td>{{ item.statusService }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [], // Dados da tabela
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const token = localStorage.getItem('token');
      const page = this.$route.params.page; // Pega o número da página da rota
      try {
        const response = await axios.get(`http://localhost:8000/dashboard/${page}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        });
        this.items = response.data; // Armazena os dados recebidos na variável items
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      }
    },
  },
};
</script>
