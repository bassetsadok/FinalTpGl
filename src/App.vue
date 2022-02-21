<template>
  <div id="app">
    <div class="container justify-content-center align-content-center">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tâche</th>
          <th scope="col">Durée</th>
          <th scope="col">Antécédent(s)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(value,index) in data" :key="index">

          <td>{{index + 1}}</td>
          <td><input type="text" class="none" v-model="value.name" /> </td>
          <td><input type="text" class="none" v-model="value.duration" /> Jours</td>
          <td>
            <input v-if="value.dependsOn !== undefined" class="none" type="text" v-model="value.dependsOn"></input>
          </td>
        </tr>
        </tbody>
      </table>
      <button @click="change" class="btn btn-success">Modifier</button>
      <div v-if="!progress" class="charts">
        <div class="d-flex align-items-start">
          <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-pert" type="button" role="tab" aria-controls="v-pills-pert" aria-selected="true">PERT</button>
            <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-gantt" type="button" role="tab" aria-controls="v-pills-gantt" aria-selected="false">GANTT</button>
          </div>
          <div class="tab-content" id="v-pills-tabContent">
            <div class="tab-pane fade show active" id="v-pills-pert" role="tabpanel" aria-labelledby="v-pills-pert-tab"><pert-component /> </div>
            <div class="tab-pane fade" id="v-pills-gantt" role="tabpanel" aria-labelledby="v-pills-gantt-tab"><gantt-component /> </div>
          </div>
        </div>
      </div>
      <div v-else="progress" class="spinner-border container justify-content-center" role="status">
        <span class="sr-only"></span>
      </div>
  </div>
  </div>
</template>
<style>
.none{
  border: none;
}
</style>
<script>
import pertComponent from './components/pertComponent'
import ganttComponent from './components/ganttComponent'
import json from '../data/data.json'
export default {
  data : () =>{
    return{
      progress : false,
      data : []
    }
  },
  components : {
    pertComponent,
    ganttComponent
  },
  methods : {
    change()
    {
      localStorage.setItem('data',JSON.stringify(this.data))
      this.$store.commit('SET_DATA',JSON.parse(localStorage.getItem('data')))
      window.location.reload()
    }
  },
  created() {
    if(localStorage.getItem('data') == undefined)
    {
      localStorage.setItem('data',JSON.stringify(json))
      this.$store.commit('SET_DATA',JSON.parse(localStorage.getItem('data')))
      this.data = this.$store.state.data
    }else{
      this.$store.commit('SET_DATA',JSON.parse(localStorage.getItem('data')))
      this.data = this.$store.state.data
    }
  }
}
</script>
