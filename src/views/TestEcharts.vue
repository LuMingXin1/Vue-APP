<template>
  <div style="width: 100%; height: 90vh" ref="myCharts"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.setEcharts();
  },
  methods: {
    setEcharts() {
      const domContainer = this.$refs.myCharts;
      const instance = this.$echarts.init(domContainer);
      const options = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      instance.setOption(options);
    },
  },
};
</script>

<style lang='' scoped>
</style>