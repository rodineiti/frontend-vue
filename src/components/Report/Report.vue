<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <div class="card card-primary">
          <div class="card-header">
            <div class="row">
              <div class="col">Extrato</div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <form method="post" @submit.prevent="getReport">
                  <div class="row">
                    <div class="col">
                      <div class="form-group">
                        <label for="name">Data Início</label>
                        <input
                          class="form-control"
                          type="date"
                          v-model="dateStart"
                          name="dateStart"
                          required
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <label for="name">Data Final</label>
                        <input
                          class="form-control"
                          type="date"
                          v-model="dateEnd"
                          name="dateEnd"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <input class="btn btn-primary" type="submit" name="submit" value="Consultar" />
                  </div>
                </form>
              </div>
            </div>
            <div class="row" v-if="isResults">
              <div class="col-md-12">
                <div class="text-center">
                  <h2>Totais no período</h2>
                  <p>
                    <strong>Recebidos:</strong>
                    R$ {{total_receives}}
                  </p>
                  <p>
                    <strong>Pagos:</strong>
                    R$ {{total_pays}}
                  </p>
                  <p>
                    <strong>Total:</strong>
                    R$ {{(total_receives - total_pays)}}
                  </p>
                </div>
              </div>
              <div class="col-md-12">
                <div class="list-group">
                  <div>
                    <a
                      href="javascript:void(0)"
                      class="list-group-item list-group-item-action"
                      v-for="(item, index) in billPays"
                      :key="index"
                    >
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                          <i class="fas fa-minus"></i>
                          {{item.date_launch}} - {{item.name}}
                        </h5>
                        <span class="badge badge-warning badge-pill">R$ {{item.value}}</span>
                      </div>
                    </a>
                  </div>
                  <hr />
                  <div>
                    <a
                      href="javascript:void(0)"
                      class="list-group-item list-group-item-action"
                      v-for="(item, index) in billReceives"
                      :key="index"
                    >
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">
                          <i class="fas fa-plus"></i>
                          {{item.date_launch}} - {{item.name}}
                        </h5>
                        <span class="badge badge-primary badge-pill">R$ {{item.value}}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apis from "../../services/api";
export default {
  name: "Report",
  data() {
    return {
      isResults: false,
      dateStart: "",
      dateEnd: "",
      billPays: [],
      billReceives: [],
      total_pays: 0,
      total_receives: 0
    };
  },
  methods: {
    getReport() {
      let body = {
        dateStart: this.dateStart,
        dateEnd: this.dateEnd
      };
      apis
        .getStatementByPeriod(body)
        .then(response => {
          if (response.data.status === "success") {
            let {
              billPays,
              billReceives,
              total_pays,
              total_receives
            } = response.data.data;

            this.billPays = billPays;
            this.billReceives = billReceives;
            this.total_pays = total_pays;
            this.total_receives = total_receives;
            this.isResults = true;
          } else {
            alert("Erro ao consultar");
            this.isResults = false;
          }
        })
        .catch(function(error) {
          alert("Erro");
          this.isResults = false;
        })
        .finally(() => console.log("end"));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
