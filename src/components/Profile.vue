<template>
  <div>
    <v-row>

      <v-col cols="6">
        <h2>Мои заказы</h2>
        <v-data-table
          :headers="header"
          :items="orders"
          :items-per-page="5"
          class="elevation-1"
        >
        </v-data-table>
      </v-col>

    </v-row>
  </div>
</template>

<script>
  import store from "@/store";
  import axios from "axios";
  import { URL_API } from "@/settings";

  export default {
    name: "Profile",

    data() {
      return {
        header: [
          {
            text: 'Дата и время',
            align: 'start',
            sortable: false,
            value: 'time',
            width: "300px"
          },
          {
           text: 'Скидка',
           value: 'discount' },
          {
            text: 'Цена',
            value: 'cost',
          },
          {
            text: 'Статус',
            value: 'status',
          },
        ],
        
        orders: [],
        }
    },
     computed: {
      token(){
        return store.getters.getToken;
      },
  
    },

    methods: {
      dateToDateStr(date) {
        const localeDateStr = date.toLocaleDateString();
        const time = date.toLocaleTimeString();
        return `${localeDateStr} ${time}`;
      },
      getOrders(){
          axios({
          method: "get",
          url: `${URL_API}/customer/orders`,
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        .then(response => {
          const { data } = response;

          this.orders = data.map(
            elem => {
              let { id, status, cost, time, discount } = elem;

              cost = `${cost} р`;

              time = time.slice(0, -1);
              time[1] -= 1;

              return {
                id: id,
                discount: discount,
                cost: cost,
                status: status,
                time: (new Date(...time)).toLocaleString()
              };
            }
          );
        })
      }
    },
    created() {
      this.getOrders();
    }
  }
</script>