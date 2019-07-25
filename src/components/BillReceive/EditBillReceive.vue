<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <div class="card card-primary">
          <div class="card-header">
            <div class="row">
              <div class="col">Editar Conta a receber</div>
              <div class="col text-right">
                <router-link class="btn btn-warning" to="/billreceive">Voltar</router-link>
              </div>
            </div>
          </div>
          <div class="card-body">
            <form method="post" @submit.prevent="save">
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
  name: "EditBillReceive",
  data() {
    return {
      id: null,
      date_launch: "",
      name: "",
      value: ""
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.show(id);
  },
  methods: {
    show(id) {
      apis
        .getBillReceive(id)
        .then(response => {
          this.id = response.data.data.id;
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
        date_launch: this.date_launch,
        name: this.name,
        value: this.value
      };
      apis
        .putBillReceives(this.id, body)
        .then(response => {
          if (response.data.status === "success") {
            alert(response.data.message);
            this.$router.push("/billreceive");
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