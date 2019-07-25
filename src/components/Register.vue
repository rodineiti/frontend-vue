<template>
  <div>
    <form class="form-signup text-center" @submit.prevent="register">
      <img class="mb-4" src="https://via.placeholder.com/75" alt="img" />
      <h1 class="h3 mb-3 font-weight-normal">Registro - Controle de Finanças</h1>
      <div class="form-group">
        <label for="name" class="sr-only">Nome</label>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <i class="fas fa-user"></i>
            </div>
          </div>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            class="form-control"
            placeholder="Nome"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="email" class="sr-only">E-mail</label>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <i class="fas fa-envelope-square"></i>
            </div>
          </div>
          <input
            type="email"
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
      <div class="form-group">
        <label for="password" class="sr-only">Confirmar Senha</label>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <i class="fas fa-unlock-alt"></i>
            </div>
          </div>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            v-model="password_confirmation"
            class="form-control"
            placeholder="Confirmar Senha"
            required
          />
        </div>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Cadastrar
        <i class="fas fa-user-plus"></i>
      </button>
    </form>
  </div>
</template>

<script>
import router from "../router";
import Event from "./Event";
import apis from "../services/api";
import { getUser } from "../services/auth";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    register() {
      let body = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      };
      apis
        .postRegister(body)
        .then(response => {
          if (response.data) {
            this.redirect("Cadastro realizado com sucesso.", 1000, "Login");
          } else {
            alert("Erro ao tentar cadastrar, favor verificar");
          }
        })
        .catch(function(error) {
          alert("Erro");
        })
        .finally(() => console.log("end"));
    },
    redirect(msg, timeout, url) {
      alert(msg);
      setTimeout(() => {
        router.push({ name: url });
      }, timeout);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-signup {
  width: 100%;
  max-width: 600px;
  padding: 15px;
  margin: auto;
}

.form-signup .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signup .form-control:focus {
  z-index: 2;
}
</style>
