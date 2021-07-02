<template>
  <div ref="myChart" style="width: 100%; height: 90vh"></div>
</template>

<script>
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  BarChart,
  CanvasRenderer,
]);
export default {
  data() {
    return {
			num: 10,
      echartsInstance: null, // echarts实例
      option: null, // 配置对象
			dataset: {
				date: [],
				turnBack: [],
				security: [],
				crust: [],
				service: [],
				other: [],
			},
			labelOption: {
				show: true,
				formatter: (params) => {
					const {seriesId, value, dataIndex} = params
					const {turnBack, security, crust, service, other} = this.dataset
					this.dataset[seriesId][dataIndex]
					const sum = turnBack[dataIndex] + security[dataIndex] + crust[dataIndex] + service[dataIndex] + other[dataIndex]
					// console.log(params);
					return `${Math.round(value/sum*100)}%`
        }
			},
    };
  },
  mounted() {
		this.initEcharts()
		this.fetchData()
	},
  methods: {
    // 初始化 echarts
    initEcharts() {
      const dom = this.$refs.myChart;
      this.echartsInstance = echarts.init(dom);
      this.option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
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
						id: 'turnBack',
            name: "折返",
            type: "bar",
						barWidth: '40',
						stack: 'stack',
            emphasis: {
              focus: "series",
            },
            data: [],
						label: this.labelOption,
          },
          {
						id: 'security',
            name: "内保",
            type: "bar",
						barWidth: '40',
            stack: "stack",
            emphasis: {
              focus: "series",
            },
            data: [],
						label: this.labelOption,
          },
          {
						id: 'crust',
            name: "外皮",
            type: "bar",
						barWidth: '40',
            stack: "stack",
            emphasis: {
              focus: "series",
            },
            data: [],
						label: this.labelOption,
          },
          {
						id: 'service',
            name: "乘服",
            type: "bar",
						barWidth: '40',
            stack: "stack",
            emphasis: {
              focus: "series",
            },
            data: [],
						label: this.labelOption,
          },
          {
						id: 'other',
            name: "其他",
            type: "bar",
						barWidth: '40',
						stack: 'stack',
            data: [],
            emphasis: {
              focus: "series",
            },
						label: this.labelOption,
          },
        ],
      };
			this.echartsInstance.setOption(this.option)
			window.addEventListener("resize",  () => {
        this.echartsInstance.resize(); //页面大小变化后Echarts也更改大小
      });
    },
		// async
		asyncApi() {
			return new Promise((resolve) => {
				setTimeout(() => {
					const result = {
						date: ['12-21','12-22','12-23','12-24','12-25','12-26','12-27',],
						turnBack: [320, 332, 301, 334, 390, 330, 320],
						security: [120, 132, 101, 134, 90, 230, 210],
						crust: [220, 182, 191, 234, 290, 330, 310],
						service: [150, 232, 201, 154, 190, 330, 410],
						other: [86, 101, 96, 102, 167, 160, 157],
					}
					resolve(result)
				}, 2000);
			})
		},
		fetchData() {
			this.echartsInstance.showLoading()
			this.asyncApi()
			.then(res => {
				this.dataset = res
				this.echartsInstance.setOption({
					xAxis: {
						data: res.date
					},
					series:[
						{
							id: 'turnBack',
							data: res.turnBack
						},
						{
							id: 'security',
							data: res.security
						},
						{
							id: 'crust',
							data: res.crust
						},
						{
							id: 'service',
							data: res.service
						},
						{
							id: 'other',
							data: res.other
						},
					]
				})
				this.echartsInstance.hideLoading()
			})
		}
  },
};
</script>

<style lang='' scoped>
</style>