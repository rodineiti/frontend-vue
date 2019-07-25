<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <div class="card card-primary">
          <div class="card-header">
            <div class="row">
              <div class="col">Gráfico</div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <form method="post" @submit.prevent="getChart">
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
              <div class="row">
                <div class="col-md-12">
                  <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
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
      dateStart: "",
      dateEnd: "",
      categories: [],
      isResults: false,
      updateArgs: [true, true, { duration: 1000 }],
      chartOptions: {}
    };
  },
  methods: {
    getChart() {
      let body = {
        dateStart: this.dateStart,
        dateEnd: this.dateEnd
      };
      apis
        .sumChartsByPeriod(body)
        .then(response => {
          if (response.data.status === "success") {
            this.categories = response.data.data;
            this.chartOptions = {
              chart: {
                type: "pie"
              },
              title: {
                text: "Gráfico de consumo"
              },
              series: [
                {
                  data: this.categories,
                  color: "#6fcd98"
                }
              ]
            };
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
