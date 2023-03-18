<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container fluid fill-height class="flex-column">
    <v-row style="width: 100%">
      <v-col>
        <v-col class="word-break title"> 蓝鲸DAO是什么？ </v-col>
        <v-col class="word-break"> 蓝鲸DAO聚集了一群志同道合的人才，我们是Web3.0探索者。<br/>国内最早一批去中心化社区，立志建设成为高影响力，为WEB3持续输出复合型人才，为大环境献一份力。 </v-col>
        <v-col class="word-break title"> 如何加入？ </v-col>
        <v-col class="word-break"> 社区已聚集投研分析，技术支持，社区运营，IP运营，营销推广等复合型人才。<br/>
        无准入门槛，没有强制性规定，无论是web3新人还是大牛，都可以来社区找到组织实现个人价值。
           </v-col>
        <v-col class="word-break title"> 进入DODO，获取实时通知 </v-col>
        <v-row align="center">
          <v-col cols='12'><v-btn block href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzkwMjQyNDU5NQ==&scene=117#wechat_redirect" outlined rounded>
          点击访问蓝鲸公众号
    </v-btn></v-col>
          <v-col cols='12'>
            <v-btn block href="https://imdodo.com/s/136488?inv=UVIA" outlined rounded>
          点击进入DODO群
    </v-btn>
          </v-col>
          <v-col cols='6'>
              <v-img
            src="../assets/4541679124743_.pic.jpg"
            max-width='150px'></v-img>
          </v-col>
          <v-col cols='6'>
              <v-img
            src="../assets/4471679124584_.pic.jpg"
            max-width='150px'></v-img>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.word-break {
  word-wrap: break-word;
}
.title {
  font-weight:bolder;

}
</style>