module.exports = {
  routes: [
    {
      path: '/',
      component: '../layouts/index.js',
      routes: [
        { path: '/home', component: './home/index.js', title: '主页33' },
        { path: '/playlist', component: './playlist/index.js', title: '播放列表'},
        { path: '/drag', component: './drag/index.js', title: '测试' }
      ]
    }
  ]
};
