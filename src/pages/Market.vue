<!-- eslint-disable vue/multi-word-component-names -->
<template>
      <v-container
        fluid
        fill-height
        class="align-center flex-column flex-nowrap"
      >
        <v-row style="width: 100%; display: flex; flex-direction: column">
          <v-row align="center">
            <v-col>
              <v-icon>mdi-history</v-icon>
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
              <v-btn-toggle>
                <v-btn v-for="(item,index) in tabItems" :key="index">
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
                <th class="text-center">总成交额</th>
                <th class="text-center">订单数</th>
                <th class="text-center">最低价</th>
                <th class="text-center">挂单率</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in transactions" :key="item.name" class="text-center"
              @click='navigateTo'
              >
                <td>{{ item.IP }}</td>
                <td>{{ item.totalValue }}</td>
                <td>{{item.orderNum}}</td>
                <td>{{item.minimumValue}}</td>
                <td>{{item.rate}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-row>
      </v-container>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Market',
    data: () => ({
    selectItems: ["唯一艺术"],
    defaultSelect: "唯一艺术",
    tabItems: ["5分钟", "10分钟", "1小时", "4小时", "1天"],
    transactions: [
      {
        IP:"192.168.1.0",
        totalValue:100,
        orderNum:10,
        minimumValue:100,
        rate:"30%"
      },
      {
        IP:"192.168.1.1",
        totalValue:100,
        orderNum:20,
        minimumValue:100,
        rate:"15%"
      },
      {
        IP:"192.168.1.1",
        totalValue:100,
        orderNum:20,
        minimumValue:100,
        rate:"15%"
      },
      {
        IP:"192.168.1.1",
        totalValue:100,
        orderNum:20,
        minimumValue:100,
        rate:"15%"
      },
      {
        IP:"192.168.1.1",
        totalValue:100,
        orderNum:20,
        minimumValue:100,
        rate:"15%"
      },
      {
        IP:"192.168.1.1",
        totalValue:100,
        orderNum:20,
        minimumValue:100,
        rate:"15%"
      },
      {
        IP:"192.168.1.1",
        totalValue:100,
        orderNum:20,
        minimumValue:100,
        rate:"15%"
      },
      {
        IP:"192.168.1.1",
        totalValue:100,
        orderNum:20,
        minimumValue:100,
        rate:"15%"
      }
    ],
  }),
  methods:{
    navigateTo:function(){
        const {$router} = this;
        $router.push({name:'detail'})
    }
  }
}
</script>
