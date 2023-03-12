<!-- App.vue 是整个App的入口处，内部代码包含整个app的布局以及导航栏和状态栏的逻辑-->
<template>
  <v-app>
    <v-app-bar
      elevation="0"
      style="flex: 0; display: flex; justify-content: center"
      ref="appBar"
    >
      <v-app-bar-title>蓝鲸DAO</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view> <!-- 嵌套路由处，每一个子页面(pages中的文件)都是在这个位置处渲染-->
      </router-view>
    </v-main>
    <v-bottom-navigation grow dark ref='bottomBar'>
      <v-btn v-for="item in bottomBtn" :key="item.key" height="100%" @click='navigateTo(item.key)'>
        {{ item.content }}
        <v-icon> {{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
<script>
export default {
  name: "App",
  mounted:function(){
    const {appBar,bottomBar} = this.$refs;
    const appBarHeight = appBar.computedContentHeight
    const bottomBarHeight = bottomBar.height
    localStorage.setItem('appBarHeight',appBarHeight)
    localStorage.setItem('bottomBarHeight',bottomBarHeight)
  },
  data:()=>({
    bottomBtn: [
      {
        content: "市场",
        icon: "mdi-history",
        key: 'market', //key是每一个底部导航栏的按钮的唯一标识符，以防未来出现重名的组件
      },
      {
        content: "加入蓝鲸",
        icon: "mdi-heart",
        key: 'join',
      },
    ]
  }),
  methods:{
    navigateTo:function(key){
      //接受传入进来的按钮的key作为参数并导航至对应页面
      const {$router} = this;
      $router.push({name:key}) //注意这里调用导航的方法时使用的是组件的命名进行的导航，不是绝对路径导航。具体组件命名可以参考router文件夹中的index.js
    }
  }
};
</script>
