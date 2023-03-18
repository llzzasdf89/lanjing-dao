<!-- eslint-disable vue/multi-word-component-names -->
<template>
<v-container fluid class="flex-column flex-nowrap" style='height:100%'>
    <v-row style="width:100%" ref='top'>
        <v-col cosl='6' class='d-flex flex-column' align-self="center">
            
            品牌馆:<span style="font-weight:bolder">{{commodityName}}</span>
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
        <v-simple-table :style="{width:'100%',overflow:'scroll',height:height + 'px'}" v-else>
            <thead>
              <tr>
                <th></th>
                <th class="text-center">商品名称</th>
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
                    <td class='text-center' style="white-space:nowrap">
                        {{item.name}}
                        </td>
                    <td class='text-center'>{{item.price + '¥'}}</td>
                    <td class='text-center'>
                        <v-btn variant="tonal" elevation="0" :href="'https://www.theone.art/goods/'+ item.goodsId">购买</v-btn>
                    </td>
                </tr>
                <tr v-for='item in saled' :key='item.id' v-show='currentTab===1 && saled.length > 0'>
                        <td><v-img :src="item.cover" max-width='40px'></v-img></td>
                        <td class='text-center' style="white-space:nowrap">{{item.name}}</td>
                        <td class='text-center'>{{new Date(item.saleTime).toLocaleString()}}</td>
                        <td class='text-center'>{{item.price + '¥'}}</td>
                        <td class='text-center'>
                        <v-btn variant="tonal" elevation="0" :href="'https://www.theone.art/goods/'+ item.goodsId">详情</v-btn>
                    </td>
                </tr>
            </tbody>
        </v-simple-table>
    </v-row>
</v-container>
</template>
<script>
import {request} from '../utils/ajax'
export default {
    data:()=>({
        currentTab:0,
        onSale:[],
        saled:[]
    }),
    computed:{
        height:function(){
            //动态计算表格应该设置的高度，预防表格过高导致元素溢出整个app屏幕
            const appBarHeight = localStorage.getItem('appBarHeight')
            const bottomBarHeight = localStorage.getItem('bottomBarHeight')
            if(!appBarHeight || !bottomBarHeight) return 200; //如果缓存中不存在获取到的app状态栏高度以及底部状态栏高度那么我们直接返回，相当于使用默认值200px
            const {innerHeight} = window
            const {clientHeight} = this.$refs.top
            const tableHeight = innerHeight - clientHeight - appBarHeight - bottomBarHeight//表格的高度就是使用视口的高度减去顶部状态栏、底部状态栏以及tab区域（包含头像）以后的高度。
            return tableHeight
        },
        commodityName:function(){
            const commodityName =localStorage.getItem('commodityName')
            return commodityName?commodityName:''
        }
    },
    methods:{
        getCommodities:function(commodityId){
            const onSaleParameter = {
            commodityId,
            'status': 1,
            'cnt':10
          }
          const saledParameter = {
            commodityId,
            'status':2,
            'cnt':10
          }
        const PromiseArr = [request('post','dataDetails',onSaleParameter),request('post','dataDetails',saledParameter)]  
        return Promise.all(PromiseArr)
        }
    },
    mounted:function(){
        const {commodityId}  = this.$route.params
        const that = this 
        this.getCommodities(commodityId).then(resolve=>{
            const onSale = JSON.parse(resolve[0]).data
            const saled = JSON.parse(resolve[1]).data
            that.onSale = onSale;
            that.saled = saled
            localStorage.setItem('commodityId',commodityId) //将商品的id缓存起来，这一点很重要，如果用户在想在页面刷新的话没有这个缓存那么页面会变空白
        }).catch(err=>{
                    console.error('获取商品详情错误',err)
                })
    }
}
</script>
