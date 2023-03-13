<!-- App.vue 是整个App的入口处，内部代码包含整个app的布局以及导航栏和状态栏的逻辑-->
<template>
  <v-app>
    <v-app-bar
      elevation="0"
      style="flex: 0; "
      ref="appBar"
    >
      <v-row no-gutters class='justify-space-between'>
        <v-icon :style="{visibility:inDetailPage?'visible':'hidden'}" @click="navigateTo('market')">mdi-arrow-left</v-icon>
        <v-app-bar-title>蓝鲸DAO</v-app-bar-title>
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-row>
    </v-app-bar>
    <v-main>
      <router-view @navigatedToDetail='navigatedCallback' @DetailToJoin='DetailToJoinCallback'> <!-- 嵌套路由处，每一个子页面(pages中的文件)都是在这个位置处渲染,绑定的方法都是回调函数，由各个不同的子页面触发-->
      </router-view>
    </v-main>
    <v-bottom-navigation grow dark ref='bottomBar' mandatory v-model='currentTab'>
      <v-btn v-for="item in bottomBtn" :key="item.key" height="100%" @click='navigateTo(item.key)' :value='item.key'>
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
    inDetailPage:false,
    currentTab:"market",
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
    navigatedCallback(){
      this.inDetailPage = true;//修改inDetailPage变量的值从而让回退箭头显示在标题栏上
    },
    DetailToJoinCallback(){
      this.navigateTo('join')
    },
    navigateTo:function(key){
      //接受传入进来的按钮的key作为参数并导航至对应页面
      const currentRouteName = this.$router.currentRoute.name
      if(this.currentTab === key && currentRouteName !=='detail') return //如果用户多次点击原页面，那么我们直接不理会此次跳转。避免过多的路由跳转造成内存堆积
      const {$router} = this
      this.currentTab = key //同步更新底部导航栏的值，从而使得底部导航栏的图标能够同步跟着用户的跳转操作而高亮
      if(key === 'market') this.inDetailPage = false
      $router.push({name:key,replace:true}) //注意这里调用导航的方法时使用的是组件的命名进行的导航，不是绝对路径导航。具体组件命名可以参考router文件夹中的index.js
    }
  }
};
</script>
