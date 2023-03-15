<!-- eslint-disable vue/multi-word-component-names -->
<template>
      <v-container
        fluid
        fill-height
        class="align-center flex-column flex-nowrap"
      >
        <v-row style="width: 100%; display: flex; flex-direction: column">
          <v-row align="center">
            <v-col style="display:flex;align-items:center;white-space:nowrap;font-weight:bolder">
              <v-img src='../assets/1361678679573_.pic.jpg' max-width='100px'></v-img>
              蓝鲸DAO
            </v-col>
            <v-col>
              <v-select
                label="选择一个数据来源"
                :items="selectItems"
                v-model="defaultSelect"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col style="max-width:100vw;overflow:scroll">
              <v-btn-toggle model-value='currentTab' v-model='currentTab' mandatory>
                <v-btn v-for="(item,index) in tabItems" :key="index" :value='item'>
                  {{item}}
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-row>
        <v-row style="width: 100%; overflow: scroll">
          <v-simple-table style="width: 100%; height: 100px" fixed-header>
            <thead>
              <tr>
                <th class="text-center">IP</th>
                <th class="text-center text-no-wrap">总成交额<v-btn icon style="zoom:0.5" @click="sort"><v-icon>{{this.ascendSort?'mdi-arrow-expand-up':'mdi-arrow-expand-down'}}</v-icon></v-btn></th>
                <th class="text-center">订单数</th>
                <th class="text-center">最低价</th>
                <!-- <th class="text-center">挂单率</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in transactions" :key="item.commodityid" class="text-center"
              @click='navigateTo'
              >
                <td>{{ item.name }}</td>
                <td>{{ item.total_amt }}</td>
                <td>{{item.orders}}</td>
                <td>{{item.min_amt}}</td>
                <!-- <td>{{item.rate}}</td> -->
              </tr>
            </tbody>
          </v-simple-table>
        </v-row>
      </v-container>
</template>
<script>
import {request} from '../utils/ajax'
const tabMap = new Map([
  ['5分钟',300],
  ['10分钟',600],
  ['1小时',3600],
  ['4小时',14400],
  ['1天',86400]
]) //负责映射每一个tab对应的秒数
export default {
    data: () => ({
    ascendSort:true,
    selectItems: ["唯一艺术"],
    defaultSelect: "唯一艺术",
    tabItems: ["5分钟", "10分钟", "1小时", "4小时", "1天"],
    currentTab:'1天',
    clientHeight:0,
    scrollHeight:0,
    transactions: []
  }),
  watch:{
    //侦测每一次的tab变动，一旦触发即向后端发送API请求
    currentTab:function(newV){
        this.getTransactions(tabMap.get(newV))
    }
  },
  mounted:function(){
    this.getTransactions(tabMap.get('1天')) //页面加载时默认获取1天前的交易记录
  },
  methods:{
    navigateTo:function(){
        const {$router} = this;
        $router.push({name:'detail'})
    },
    sort:function(){
        this.ascendSort = !this.ascendSort
        const {transactions,ascendSort} = this;
        let sorted = null;
        if(ascendSort) sorted = transactions.sort((a,b)=>a.total_amt-b.total_amt)
        else sorted = transactions.sort((a,b)=>b.total_amt - a.total_amt)
        this.transactions  = sorted
    },
    // tableScroll:function(e){
    // 分页功能，待完成
    //   const {scrollTop} = e.target;
    //   console.log(this.clientHeight,scrollTop,this.scrollHeight)
    //   if(scrollTop + this.clientHeight >= this.scrollHeight){
    //     console.log('trigger')
    //   }
    // },
    getTransactions:function(tabItemInSeconds){
        //接收传入的tab所对应的秒数，例如‘5分钟’对应300秒，然后请求API获取对应数据
        const endDate = Date.now() //当前的时间戳，是以毫秒为单位
        const startDate = endDate - tabItemInSeconds * 1000 //用当前的毫秒数减去tab所表示的毫秒数，就是查询多少分钟前的交易记录
        const parameter = {
          startDate,
          endDate
        }
        request('post','/api/bwt/theOne/data',parameter).then(resolve=>{
          this.transactions = JSON.parse(resolve).data
          this.ascendSort = true //由于每次切换tab默认数据都是按照降序排序，因此这里要将ascendSort这个flag给默认设置为true
          this.sort()
          }).catch(err=>{
          console.error('获取交易数据失败,错误为', err)
          })
    
    }
  }
}
</script>
