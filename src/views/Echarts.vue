<template>
  <div>
    <div ref="myChart" style="width: 100%; height: 90vh" id="myChart"></div>
    <button @click="changeDate">changeData</button>
    <button @click="add">add</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
      chartData: {
        blueBar: [],
        greenBar: [],
        yellowBar: [],
        redBar: [],
      },
    };
  },
  mounted() {
    this.setEcharts();
    this.getData();
  },

  methods: {
    // 初始化echarts
    setEcharts() {
      const dom = this.$refs.myChart; // 获取dom节点
      const myChart = this.$echarts.init(dom); //利用原型调取Echarts的初始化方法
      this.chartInstance = myChart;
      let app = {};
      let posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight",
      ];
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90,
        },
        align: {
          options: {
            left: "left",
            center: "center",
            right: "right",
          },
        },
        verticalAlign: {
          options: {
            top: "top",
            middle: "middle",
            bottom: "bottom",
          },
        },
        position: {
          options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            console.log(map);
            return map;
          }, {}),
        },
        distance: {
          min: 0,
          max: 100,
        },
      };
      app.config = {
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 15,
        onChange: function () {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance,
            },
          };
          myChart.setOption({
            series: [
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
            ],
          });
        },
      };
      let labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: (params) => {
          const { data, dataIndex } = params
          const { blueBar, greenBar, yellowBar, redBar } = this.chartData
          const sum = blueBar[dataIndex] + greenBar[dataIndex] + yellowBar[dataIndex] + redBar[dataIndex]
          return  `${Math.round((data/sum*10000))/100}%`
        },
        // formatter: "{c}  {name|{a}}",
        fontSize: 16,
        rich: {
          name: {},
        },
      };
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["blueBar", "greenBar", "yellowBar", "redBar"],
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["line", "bar", "stack", "tiled"],
            },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: [],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "blueBar",
            type: "bar",
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.chartData.blueBar,
            itemStyle: {
              color: '#9A8AD8',
              fontSize: '0'
            }
          },
          {
            name: "greenBar",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.chartData.greenBar,
          },
          {
            name: "yellowBar",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.chartData.yellowBar,
          },
          {
            name: "redBar",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.chartData.redBar,
          },
        ],
      }; //{}内写需要图表的各种配置，可以在官方案例中修改完毕后复制过来
      myChart.setOption(option); //将编写好的配置项挂载到Echarts上
      window.addEventListener("resize", function () {
        myChart.resize(); //页面大小变化后Echarts也更改大小
      });
      return myChart;
    },
    // 异步获取数据
    asyncApi() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const result = {
            date: ["2012", "2013", "2014", "2015", "2016"],
            blueBar: [320, 332, 301, 334, 390],
            greenBar: [220, 182, 191, 234, 290],
            yellowBar: [150, 232, 201, 154, 190],
            redBar: [98, 77, 101, 99, 40],
          };
          resolve(result);
        }, 2000);
      });
    },
    // 获取数据
    getData() {
      this.chartInstance.showLoading();
      this.asyncApi().then((res) => {
        this.chartData = res;
        this.chartInstance.setOption({
          xAxis: {
            data: res.date,
          },
          series: [
            {
              name: "blueBar",
              data: res.blueBar,
            },
            {
              name: "greenBar",
              data: res.greenBar,
            },
            {
              name: "yellowBar",
              data: res.yellowBar,
            },
            {
              name: "redBar",
              data: res.redBar,
            },
          ],
        });
        this.chartInstance.hideLoading();
      });
    },
    asyncDateChange() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const result = {
            date: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
            blueBar: [320, 332, 301, 334, 390, 400, 418, 425],
            greenBar: [220, 182, 191, 234, 290, 201, 190 ,290],
            yellowBar: [150, 232, 201, 154, 190, 180, 202, 200],
            redBar: [98, 77, 101, 99, 40, 50, 48, 60],
          };
          resolve(result);
        }, 2000);
      });
    },
    // 调整日期
    changeDate() {
      this.chartInstance.showLoading()
      this.asyncDateChange()
      .then(res => {
        this.chartData = res
        this.chartInstance.setOption({
          xAxis: {
            data: res.date
          },
          series: [
            {
              name: "blueBar",
              data: res.blueBar,
            },
            {
              name: "greenBar",
              data: res.greenBar,
            },
            {
              name: "yellowBar",
              data: res.yellowBar,
            },
            {
              name: "redBar",
              data: res.redBar,
            },
          ],
        })
        this.chartInstance.hideLoading()
      })
    },
    // 添加
    add() {
      this.chartInstance.setOption({
        series: [{
          data: [150, 230, 224, 218, 135],
          type: 'line'
        }]
      })
    },
  },
};
</script>

<style lang='' scoped>
</style>