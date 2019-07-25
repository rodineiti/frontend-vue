<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <div class="card card-primary">
          <div class="card-header">
            <div class="row">
              <div class="col">Adicionar Categoria</div>
              <div class="col text-right">
                <router-link class="btn btn-warning" to="/category">Voltar</router-link>
              </div>
            </div>
          </div>
          <div class="card-body">
            <form method="post" @submit.prevent="save">
              <div class="form-group">
                <label for="name">Nome</label>
                <input class="form-control" type="text" name="name" v-model="name" required />
              </div>
              <div class="form-group">
                <input class="btn btn-primary" type="submit" name="submit" value="Salvar" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apis from "../../services/api";
export default {
  name: "AddCategory",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    save() {
      let body = {
        name: this.name
      };
      apis
        .postCategories(body)
        .then(response => {
          if (response.data.status === "success") {
            alert(response.data.message);
            this.$router.push("/category");
          } else {
            alert(response.data.message);
          }
        })
        .catch(function(error) {
          alert("Erro");
        })
        .finally(() => console.log("end"));
    }
  }
};
</script>