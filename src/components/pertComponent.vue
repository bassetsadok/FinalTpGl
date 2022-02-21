<template>
  <div class="container" id="pert"></div>
</template>
<style>
#pert{
  width: 1000px;
  height: 1000px;
}
</style>
<script>
export default {
  created() {
    let data = this.$store.state.data
    anychart.onDocumentReady(function () {

      let chart = anychart.pert();

      chart.data(data, "asTable");


      chart.title("PERT Chart");


      chart.container("pert");

      chart.draw();
    });
  }
}
</script>