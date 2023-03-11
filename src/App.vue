<template>
  <v-app>
    <v-app-bar
      elevation="0"
      style="flex: 0; display: flex; justify-content: center"
    >
      <v-app-bar-title>蓝鲸DAO</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <Market>

      </Market>
    </v-main>
    <v-bottom-navigation grow dark>
      <v-btn v-for="item in bottomBtn" :key="item.key" height="100%">
        {{ item.content }}
        <v-icon> {{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
<script>
import Market from './pages/Market.vue'
export default {
  name: "App",
  components:{
    Market
  },
  data:()=>({
    bottomBtn: [
      {
        content: "市场",
        icon: "mdi-history",
        key: 1,
      },
      {
        content: "加入蓝鲸",
        icon: "mdi-heart",
        key: 2,
      },
    ]
  })
};
</script>
