module.exports = {
  routes: [
    {
      path: '/',
      component: '../layouts/index.js',
      routes: [
        { path: '/', component: './home/index.js', title: '首页' },
        { path: '/playlist', component: './playlist/index.js', title: '播放列表' },
        { path: '/drag', component: './drag/index.js', title: '测试' },
        { path: '/hooks', component: './hooks/index.js', title: '钩子组件' }
      ]
    }
  ]
};
