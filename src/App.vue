<!-- App.vue 是整个App的入口处，内部代码包含整个app的布局以及导航栏和状态栏的逻辑-->
<template>
  <v-app>
    <!-- <v-app-bar
      elevation="0"
      style="flex: 0; "
      ref="appBar"
    >
      <v-row no-gutters class='justify-space-between'>
        <v-icon :style="{visibility:inMarketPage?'hidden':'visible'}" @click="()=>{this.$router.go(-1)}">mdi-arrow-left</v-icon>
        <v-app-bar-title>蓝鲸DAO</v-app-bar-title>
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-row>
    </v-app-bar> -->
    <v-main>
      <router-view> <!-- 嵌套路由处，每一个子页面(pages中的文件)都是在这个位置处渲染,绑定的方法都是回调函数，由各个不同的子页面触发-->
      </router-view>
    </v-main>
    <v-bottom-navigation grow dark ref='bottomBar' mandatory :value='currentTab' fixed>
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
    const {bottomBar} = this.$refs;
    // const appBarHeight = appBar.computedContentHeight
    const bottomBarHeight = bottomBar.height
    // localStorage.setItem('appBarHeight',appBarHeight)
    localStorage.setItem('bottomBarHeight',bottomBarHeight)
  },
  computed:{
    currentTab:function(){
      const {name} = this.$route
      if(name === 'detail') return 'market'
      return name
    },
    inMarketPage:function(){
      const {name} = this.$route
      if(name === 'market') return true
      return false
    }
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
    DetailToJoinCallback(){
      this.navigateTo('join')
    },
    navigateTo:function(key){
        const {$router} = this
        $router.push({name:key})
    }
  }
};
</script>
