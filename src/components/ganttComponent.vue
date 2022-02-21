<template>
  <div id="gantt"></div>
</template>

<style>
#gantt{
  width: 1000px;
  height: 1000px;
}
</style>

<script>
export default {
  mounted: function () {
    let tempData = this.$store.state.data
      anychart.onDocumentReady(function () {

        var data = []
        for (const temp of tempData) {
          if(temp.dependsOn == undefined)
          {
            var t = {
              id: temp.id,
              name: temp.name,
              duration : temp.duration,
              actualStart: (new Date().toISOString().slice(0,10)),
              actualEnd: new Date(Date.now() + temp.duration * 24*60*60*1000),
              children : []
            }
            data.push(t)
          }
        }

        for (const temp of tempData) {
          var k = []
          var b= 0
          if(temp.dependsOn !== undefined)
          {
            for (const dep of temp.dependsOn) {
              for (var r of tempData)
              {
                if(r.id == dep)
                {

                  k.push(r)
                }
              }
            }
            for (var e of k)
            {
              let tf = e.duration
              if(tf > b)
              {
                b = tf
              }
            }

            for (const dep of temp.dependsOn) {
              for (var i = 0;i<data.length;i++) {
                if(data[i].id == dep && data[i].duration == b)
                {
                  var t = {
                    id: `${data[i].id}_${(data[i].children.length + 1).toString()}`,
                    name: temp.name,
                    actualStart: data[i].actualEnd,
                    actualEnd: new Date(Date.parse(data[i].actualEnd)+ temp.duration * 24*60*60*1000),
                  }
                  data[i].children.push(t)
                  b = 0
                }
              }
            }
          }
          k = []
          b = 0
        }

        // create a data tree
        var treeData = anychart.data.tree(data, "as-tree");
        // create a chart
        var chart = anychart.ganttProject();
        // set the data
        chart.data(treeData);
        // set the container id
        chart.container("gantt");
        // initiate drawing the chart
        chart.draw();
        // fit elements to the width of the timeline
        chart.fitAll();
      });
  }
}
</script>