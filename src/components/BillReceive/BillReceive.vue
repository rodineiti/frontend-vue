<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <div class="card card-primary">
          <div class="card-header">
            <div class="row">
              <div class="col">Contas a receber</div>
              <div class="col text-right">
                <router-link class="btn btn-primary" to="/billreceive/add">Adicionar</router-link>
              </div>
            </div>
          </div>
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Data Lançamento</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Valor</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Deletar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in billreceives" :key="index">
                  <th scope="row">{{item.id}}</th>
                  <td>{{item.date_launch}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.value}}</td>
                  <td>
                    <router-link
                      :to="{name: 'EditBillReceive', params: {id: item.id}}"
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
import apis from '../../services/api'
export default {
  name: 'BillReceive',
  data () {
    return {
      billreceives: []
    }
  },
  mounted () {
    this.index()
  },
  methods: {
    index () {
      apis
        .getBillReceives()
        .then(response => {
          this.billreceives = response.data.data
        })
        .catch(error => {
          alert('Erro: ' + error)
        })
        .finally(() => console.log('end'))
    },
    destroy (id) {
      apis
        .delBillReceive(id)
        .then(response => {
          if (response.data.status === 'success') {
            alert(response.data.message)
            this.index()
          } else {
            alert(response.data.message)
          }
        })
        .catch(error => {
          alert('Erro: ' + error)
        })
        .finally(() => console.log('end'))
    }
  }
}
</script>
