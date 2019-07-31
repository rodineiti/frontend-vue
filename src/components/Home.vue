<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <div class="card card-primary">
          <div class="card-header">Gráfico</div>
          <div class="card-body">
            <h5 class="card-title">Chartjs</h5>
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
    <div class="row mb-3">
      <div class="col">
        <div class="card">
          <div class="card-header">Extrato</div>
          <div class="card-body">
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
import moment from 'moment'
import apis from '../services/api'
export default {
  name: 'Home',
  data () {
    return {
      dateStart: moment()
        .subtract(6, 'months')
        .format('YYYY-MM-DD'),
      dateEnd: moment().format('YYYY-MM-DD'),
      billPays: [],
      billReceives: [],
      total_pays: 0,
      total_receives: 0,
      isResults: false,
      updateArgs: [true, true, { duration: 1000 }],
      chartOptions: {}
    }
  },
  mounted () {
    this.getReport()
    this.getChart()
  },
  methods: {
    getReport () {
      let body = {
        dateStart: this.dateStart,
        dateEnd: this.dateEnd
      }
      apis
        .getStatementByPeriod(body)
        .then(response => {
          if (response.data.status === 'success') {
            /* eslint-disable */
            let {
              billPays,
              billReceives,
              total_pays,
              total_receives
            } = response.data.data

            this.billPays = billPays
            this.billReceives = billReceives
            this.total_pays = total_pays
            this.total_receives = total_receives
            this.isResults = true
          } else {
            alert('Erro ao consultar')
            this.isResults = false
          }
        })
        .catch(function(error) {
          alert('Erro')
          this.isResults = false
        })
        .finally(() => console.log('end'))
    },
    getChart () {
      let body = {
        dateStart: this.dateStart,
        dateEnd: this.dateEnd
      };
      apis
        .sumChartsByPeriod(body)
        .then(response => {
          if (response.data.status === 'success') {
            this.categories = response.data.data
            this.chartOptions = {
              chart: {
                type: 'pie'
              },
              title: {
                text: 'Gráfico de consumo'
              },
              series: [
                {
                  data: this.categories,
                  color: '#6fcd98'
                }
              ]
            };
            this.isResults = true
          } else {
            alert('Erro ao consultar')
            this.isResults = false
          }
        })
        .catch(function(error) {
          alert('Erro')
          this.isResults = false
        })
        .finally(() => console.log('end'))
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
