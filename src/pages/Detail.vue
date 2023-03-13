<!-- eslint-disable vue/multi-word-component-names -->
<template>
<v-container fluid class="flex-column flex-nowrap" style='height:100%'>
    <v-row style="width:100%" ref='top'>
        <v-col cosl='6' class='d-flex' align-self="center">
            <v-icon>
                mdi-ip
            </v-icon>
            192.168.1.1
        </v-col>
        <v-col class="d-flex justify-end" cols='6'>
                <v-icon>mdi-account-multiple</v-icon>
                Richard Lee
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
        <v-simple-table :style="{width:'100%',overflow:'scroll',height:this.height + 'px'}">
            <thead>
              <tr>
                <th class="text-center">IP</th>
                <th class="text-center">{{currentTab === 0?'价格':'成交时间'}}</th>
                <th v-show='currentTab === 1'>成交价格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                <tr v-for='i in 20' :key=i>
                    <td class='text-center'>1</td>
                    <td class='text-center'>2</td>
                    <td class='text-center' v-show='currentTab===1'>3</td>
                    <td class='text-center'>
                        <v-btn variant="tonal" elevation="0">{{currentTab===0?'购买':'查看详情'}}</v-btn>
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
export default {
    data:()=>({
        height:200,
        currentTab:0
    }),
    methods:{
        navigateToJoinPage:function(){
            this.$emit('DetailToJoin')
        }
    },
    mounted:function(){
        this.$emit('navigatedToDetail') //告知主页面当前用户已经跳转到详情页了
        //动态计算表格应该设置的高度，预防表格过高导致元素溢出整个app屏幕
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
