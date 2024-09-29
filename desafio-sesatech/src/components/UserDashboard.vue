<template>
  <div class="container mt-4">
    <h1 class="mb-4 title">Dashboard</h1>


    <div class="mb-3 d-flex justify-content-between">
      <div class="me-2">
        <label for="filter" class="form-label filter-label">Filtrar por Status:</label>
        <select v-model="statusFilter" id="filter" class="form-select">
          <option value="">Todos</option>
          <option value="in progress">Em andamento</option>
          <option value="Concluded">Concluído</option>
        </select>
      </div>

      <div class="ms-2 flex-grow-1">
        <label for="search" class="form-label filter-label">Buscar por Nome:</label>
        <input type="text" v-model="searchQuery" id="search" placeholder="Buscar por Nome" class="form-control" />
      </div>

      <div class="ms-2">
        <label for="ordem" class="form-label filter-label">Filtrar por Ordem de Serviço:</label>
        <input type="text" v-model="ordemFilter" id="ordem" placeholder="Ordem de Serviço" class="form-control" />
      </div>

      <div class="ms-2">
        <label for="matricula" class="form-label filter-label">Filtrar por Matrícula:</label>
        <input type="text" v-model="matriculaFilter" id="matricula" placeholder="Matrícula" class="form-control" />
      </div>
    </div>
    <div class="d-flex justify-content-between mt-4" style="margin-bottom: 18px;">
      <button class="btn btn-primary" @click="changePage(-1)" :disabled="page <= 1">Anterior</button>
      <span class="page-info">Página {{ page }}</span>
      <button class="btn btn-primary" @click="changePage(1)" :disabled="page >= totalPages">Próxima</button>
    </div>
    <table class="table table-bordered table-striped">
      <thead class="table-light">
        <tr>
          <th>Ordem de Serviço</th>
          <th>Nome</th>
          <th>Matrícula</th>
          <th>Serviço</th>
          <th>Status do Serviço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredItems.length === 0">
          <td colspan="5" class="text-center">Nenhum dado encontrado</td>
        </tr>
        <tr v-for="item in filteredItems" :key="item.ordemServiceNumber">
          <td>{{ item.ordemServiceNumber }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.registration }}</td>
          <td>{{ item.service }}</td>
          <td>{{ item.statusService }}</td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-between mt-4">
      <button class="btn btn-primary" @click="changePage(-1)" :disabled="page <= 1">Anterior</button>
      <span class="page-info">Página {{ page }}</span>
      <button class="btn btn-primary" @click="changePage(1)" :disabled="page >= totalPages">Próxima</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [], // Dados da tabela
      statusFilter: '', // Filtro de status
      searchQuery: '', // Filtro de busca por nome
      ordemFilter: '', // Filtro de busca por ordem de serviço
      matriculaFilter: '', // Filtro de busca por matrícula
      page: 1, // Página atual
      totalPages: 3 // Total de páginas (ajustar conforme a resposta da API)
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:8000/dashboard/${this.page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.items = response.data[`page${this.page}`] || []; // Acesso ao array de valores
        this.totalPages = response.data.totalPages || 3; // Atualiza o total de páginas se disponível
        console.log('Dados recebidos:', this.items); // Para depuração
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      }
    },
    changePage(direction) {
      const newPage = this.page + direction;
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.page = newPage;
        this.fetchData(); // Recarrega os dados ao mudar de página
      }
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        const matchesStatus = this.statusFilter ? item.statusService === this.statusFilter : true;
        const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesOrdem = this.ordemFilter ? item.ordemServiceNumber.toString().includes(this.ordemFilter) : true;
        const matchesMatricula = this.matriculaFilter ? item.registration.toString().includes(this.matriculaFilter) : true;
        return matchesStatus && matchesSearch && matchesOrdem && matchesMatricula;
      });
    }
  },
};
</script>

<style scoped>
.container {
  background: #402277;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.title {
  color: #01D87A;
  font-weight: bold;
}

.filter-label {
  color: #01D87A;
  font-weight: bold;
}

.page-info {
  color: #01D87A;
  font-weight: bold;
}

.text-center {
  text-align: center;
}
</style>
