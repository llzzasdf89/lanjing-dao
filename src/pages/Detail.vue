<!-- eslint-disable vue/multi-word-component-names -->
<template>
<v-container fluid class="flex-column flex-nowrap" style='height:100%'>
    <v-row style="width:100%" ref='top'>
        <v-col cosl='6' class='d-flex flex-column' align-self="center">
            
            商品名称:<span style="font-weight:bolder">{{this.commodityName}}</span>
        </v-col>
        <v-col class="d-flex justify-end align-center" cols='6' style="font-weight:bolder">
                <v-img src='../assets/1361678679573_.pic.jpg' max-width='64px'>
                </v-img>
                蓝鲸DAO
        </v-col>
        <v-col cols='12' class='ps-0'>
            <v-tabs v-model='currentTab'>
                <v-tab>
                    在售商品
                </v-tab>
                <v-tab>
                    交易订单
                </v-tab>
            </v-tabs>
        </v-col>
    </v-row>
    <v-row style="width:100%">
        <v-col v-if="(onSale.length === 0 && currentTab===0)|| (saled.length === 0 && currentTab===1)">Woops!这里还什么都没有呢</v-col>
        <v-simple-table :style="{width:'100%',overflow:'scroll',height:this.height + 'px'}">
            <thead>
              <tr>
                <th></th>
                <th class="text-center">IP</th>
                <th class="text-center">{{currentTab === 0?'价格':'成交时间'}}</th>
                <th v-show='currentTab === 1'>成交价格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                <tr v-for='item in onSale' :key='item.id' v-show='currentTab===0 && onSale.length > 0'>
                    <td>
                        <v-img :src="item.cover" max-height='40px' max-width="40px"></v-img>
                    </td>
                    <td class='text-center'>
                        {{item.name}}
                        </td>
                    <td class='text-center'>{{item.price + '¥'}}</td>
                    <td class='text-center'>
                        <v-btn variant="tonal" elevation="0" :href="'https://www.theone.art/goods/'+ item.goodsId">购买</v-btn>
                    </td>
                </tr>
                <tr v-for='item in saled' :key='item.id' v-show='currentTab===1 && saled.length > 0'>
                        <td><v-img :src="item.cover" max-width='40px'></v-img></td>
                        <td class='text-center'>{{item.name}}</td>
                        <td class='text-center'>{{new Date(item.saleTime).toLocaleString()}}</td>
                        <td class='text-center'>{{item.price + '¥'}}</td>
                        <td class='text-center'>
                        <v-btn variant="tonal" elevation="0" :href="'https://www.theone.art/goods/'+ item.goodsId">查看详情</v-btn>
                    </td>
                </tr>
            </tbody>
        </v-simple-table>
    </v-row>
    <v-row style="width:100%;height:198px;" align-content="center">
        <v-col class='d-flex justify-center '>
           <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-on='on' v-bind='attrs' @click="navigateToJoinPage">
                        加入我们
                </v-btn>
            </template>
                <span>加入社群，消息推送实时数据</span>
  </v-tooltip>
        </v-col>
    </v-row>
</v-container>
</template>
<script>
import {request} from '../utils/ajax'
export default {
    data:()=>({
        height:200,
        currentTab:0,
        onSale:null,
        saled:null,
        commodityName:''
    }),
    methods:{
        navigateToJoinPage:function(){
            this.$emit('DetailToJoin')
        }
    },
    watch:{
        onSale:function(newV){
            if(!newV){
                const commodityId = localStorage.getItem('commodityId') //取出缓存，与Market页面的设置缓存相互呼应。这是因为Vue在刷新页面的时候整个组件的数据都会刷新，唯有将这个属性持久化才能保证数据不丢失
                const commodityName = localStorage.getItem('commodityName')
                this.commodityName = commodityName
                const that = this
                const promiseArr = [request('post','dataDetails',{
                    commodityId,
                    'status':1,
                    'cnt':10
                }),request('post','dataDetails',{
                commodityId,
                'status':2,
                'cnt':10
                    })]
                Promise.all(promiseArr).then(resolve=>{
                that.onSale = JSON.parse(resolve[0]).data;
                that.saled = JSON.parse(resolve[1]).data;
        }).catch(err=> console.error('错误',err))
            }
        }
    },
    mounted:function(){
        this.$emit('navigatedToDetail') //告知主页面当前用户已经跳转到详情页了
        //动态计算表格应该设置的高度，预防表格过高导致元素溢出整个app屏幕
        const {onSale,saled,commodityName}  = this.$route.params
        this.commodityName = commodityName
        this.onSale = onSale
        this.saled = saled;
        const appBarHeight = localStorage.getItem('appBarHeight')
        const bottomBarHeight = localStorage.getItem('bottomBarHeight')
        if(!appBarHeight && !bottomBarHeight) return; //如果缓存中不存在获取到的app状态栏高度以及底部状态栏高度那么我们直接返回，相当于使用默认值200px
        const {innerHeight} = window
        const {clientHeight} = this.$refs.top
        const tableHeight = innerHeight - clientHeight - appBarHeight - bottomBarHeight - 200 //表格的高度就是使用视口的高度减去顶部状态栏、底部状态栏以及tab区域（包含头像）以后的高度。注意后面又多减去了200个像素是为了给“立即加入”按钮所预留的高度
        this.height = tableHeight
    }
}
</script>
