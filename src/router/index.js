import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'validate',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('@/views/Echarts.vue'),
  },
  {
    path: '/a',
    name: 'echartsTest',
    component: () => import('@/views/TestEcharts.vue'),
  },
  {
    path: '/Echarts-Single',
    name: 'echartsSingle',
    component: () => import('@/views/Echarts-Single.vue'),
  },
  {
    path: '*',
    redirect: '/a'
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
