option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  series: [
    {
      showSymbol: false,
      name: 'aaa',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#F1667D',
      },
      itemStyle: {
        color: '#F1667D',
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#FEEDF0', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#fff', // 100% 处的颜色
            },
          ],
        },
      },
    },
    {
      name: 'bbb',
      data: [920, 1032, 801, 994, 1490, 1530, 1620],
      type: 'line',
      smooth: true,
      showSymbol: false,
      lineStyle: {
        color: '#9A8AD8',
      },
      itemStyle: {
        color: '#9A8AD8',
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#F2EFFA', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#fff', // 100% 处的颜色
            },
          ],
        },
      },
    },
  ],
};
