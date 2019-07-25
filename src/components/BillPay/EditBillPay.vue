<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <div class="card card-primary">
          <div class="card-header">
            <div class="row">
              <div class="col">Editar Conta a pagar</div>
              <div class="col text-right">
                <router-link class="btn btn-warning" to="/billpay">Voltar</router-link>
              </div>
            </div>
          </div>
          <div class="card-body">
            <form method="post" @submit.prevent="save">
              <div class="form-group">
                <label for="name">Categoria</label>
                <select name="category_id" v-model="category_id" class="form-control" required>
                  <option value>Selecione</option>
                  <option
                    v-for="(item, index) in categories"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="date_launch">Data de Lançamento</label>
                <input
                  class="form-control"
                  type="date"
                  name="date_launch"
                  v-model="date_launch"
                  required
                />
              </div>
              <div class="form-group">
                <label for="name">Nome</label>
                <input class="form-control" type="text" name="name" v-model="name" required />
              </div>
              <div class="form-group">
                <label for="value">Valor</label>
                <input class="form-control" type="text" name="value" v-model="value" required />
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
  name: "EditBillPay",
  data() {
    return {
      categories: [],
      id: null,
      category_id: "",
      date_launch: "",
      name: "",
      value: ""
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.getCategories();
    this.show(id);
  },
  methods: {
    getCategories() {
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
    show(id) {
      apis
        .getBillPay(id)
        .then(response => {
          this.id = response.data.data.id;
          this.category_id = response.data.data.category_id;
          this.date_launch = response.data.data.date_launch;
          this.name = response.data.data.name;
          this.value = response.data.data.value;
        })
        .catch(function(error) {
          alert("Erro");
        })
        .finally(() => console.log("end"));
    },
    save() {
      let body = {
        category_id: this.category_id,
        date_launch: this.date_launch,
        name: this.name,
        value: this.value
      };
      apis
        .putBillPays(this.id, body)
        .then(response => {
          if (response.data.status === "success") {
            alert(response.data.message);
            this.$router.push("/billpay");
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