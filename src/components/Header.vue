<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button type="button" id="sidebarCollapse" class="navbar-btn" v-if="auth">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <button
          class="btn btn-dark d-inline-block d-lg-none ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-align-justify"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav navbar-nav ml-auto">
            <li v-if="auth" class="nav-item active">
              <button class="btn btn-default" @click="logout">Logout</button>
            </li>
            <li v-if="!auth" class="nav-item active">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li v-if="!auth" class="nav-item">
              <router-link class="nav-link" to="/register">Registro</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Event from "./Event";
import { logout, isLoggedIn } from "../services/auth";
import router from "../router";
export default {
  name: "Header",
  data() {
    return {
      auth: isLoggedIn()
    };
  },
  methods: {
    logout() {
      logout();
      window.location.href = "/";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
