<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <div class="card card-primary">
          <div class="card-header">
            <div class="row">
              <div class="col">Editar Categoria</div>
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
import apis from '../../services/api'
export default {
  name: 'EditCategory',
  data () {
    return {
      id: null,
      name: ''
    }
  },
  mounted () {
    let id = this.$route.params.id
    this.show(id)
  },
  methods: {
    show (id) {
      apis
        .getCategory(id)
        .then(response => {
          this.id = response.data.data.id
          this.name = response.data.data.name
        })
        .catch(error => {
          alert('Erro: ' + error)
        })
        .finally(() => console.log('end'))
    },
    save () {
      let body = {
        name: this.name
      }
      apis
        .putCategories(this.id, body)
        .then(response => {
          if (response.data.status === 'success') {
            alert(response.data.message)
            this.$router.push('/category')
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
