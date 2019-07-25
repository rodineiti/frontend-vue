<template>
  <div>
    <form class="form-signin text-center" @submit.prevent="login">
      <img class="mb-4" src="https://via.placeholder.com/75" alt="img" />
      <h1 class="h3 mb-3 font-weight-normal">Login - Controle de Finanças</h1>
      <div class="form-group">
        <label for="email" class="sr-only">E-mail</label>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <i class="fas fa-envelope-square"></i>
            </div>
          </div>
          <input
            type="text"
            id="email"
            name="email"
            v-model="email"
            class="form-control"
            placeholder="E-mail"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="password" class="sr-only">Senha</label>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <i class="fas fa-unlock-alt"></i>
            </div>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            class="form-control"
            placeholder="Senha"
            required
          />
        </div>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Entrar
        <i class="fas fa-sign-in-alt"></i>
      </button>
    </form>
  </div>
</template>

<script>
import Event from "./Event";
import apis from "../services/api";
import { setUser } from "../services/auth";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      apis
        .getLogin(this.email, this.password)
        .then(response => {
          if (response.data) {
            setUser(response.data);
            this.redirect("Login realizado com sucesso.", 1000, "/");
          } else {
            alert("Usuário ou senha inválidos, favor verificar");
          }
        })
        .catch(function(error) {
          alert("Erro");
        })
        .finally(() => console.log("end"));
    },
    redirect(msg, timeout, url) {
      setTimeout(() => {
        window.location.href = url;
      }, timeout);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-signin {
  width: 100%;
  max-width: 400px;
  padding: 15px;
  margin: auto;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}
</style>
