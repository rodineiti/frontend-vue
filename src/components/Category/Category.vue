<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <div class="card card-primary">
          <div class="card-header">
            <div class="row">
              <div class="col">Categorias</div>
              <div class="col text-right">
                <router-link class="btn btn-primary" to="/category/add">Adicionar</router-link>
              </div>
            </div>
          </div>
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Deletar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in categories" :key="index">
                  <th scope="row">{{item.id}}</th>
                  <td>{{item.name}}</td>
                  <td>
                    <router-link
                      :to="{name: 'EditCategory', params: {id: item.id}}"
                      class="btn btn-info"
                    >Editar</router-link>
                  </td>
                  <td>
                    <a href="#" class="btn btn-danger" v-on:click.prevent="destroy(item.id)">Deletar</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apis from "../../services/api";
export default {
  name: "Category",
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    this.index();
  },
  methods: {
    index() {
      apis
        .getCategories()
        .then(response => {
          this.categories = response.data.data;
        })
        .catch(function(error) {
          alert("Erro");
        })
        .finally(() => console.log("end"));
    },
    destroy(id) {
      apis
        .delCategory(id)
        .then(response => {
          if (response.data.status === "success") {
            alert(response.data.message);
            this.index();
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