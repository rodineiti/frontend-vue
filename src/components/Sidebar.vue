<template>
  <nav id="sidebar" v-if="auth">
    <div class="sidebar-header">
      <h3>
        <img src="https://via.placeholder.com/210x40" alt="logo" />
      </h3>
    </div>

    <ul class="list-unstyled components">
      <li class="active">
        <router-link to="/">
          <i class="fas fa-home"></i> Home
        </router-link>
      </li>
      <li>
        <router-link to="/category">
          <i class="fas fa-briefcase"></i> Categorias
        </router-link>
      </li>
      <li>
        <router-link to="/billpay">
          <i class="fas fa-briefcase"></i> Conta a Pagar
        </router-link>
      </li>
      <li>
        <router-link to="/billreceive">
          <i class="fas fa-briefcase"></i> Conta a Receber
        </router-link>
      </li>
      <li>
        <router-link to="/report">
          <i class="fas fa-briefcase"></i> Extrato
        </router-link>
      </li>
      <li>
        <router-link to="/graphic">
          <i class="fas fa-paper-plane"></i> Gráfico
        </router-link>
      </li>
      <li>
        <router-link to="/calendar">
          <i class="fas fa-paper-plane"></i> Calendário
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { isLoggedIn } from '../services/auth'
export default {
  name: 'Sidebar',
  data () {
    return {
      auth: isLoggedIn()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
