<template>
  <div v-if="isBarista">
    <v-row>
      <v-col cols="12">
        <h2>Посмотреть заказы кофейни</h2>
        <v-col cols="3">
          <v-select
            v-model="selectedAddress"
            :items="addresses"
            item-text="address"
            item-value="id"
            filled
            label="Магазин"
            width="500px"
          ></v-select>
        </v-col>

        <v-btn
          class="ma-2"
          @click="getOrderByStore()"
          color="brown lighten-2"
          width="150"
          dark
        >
          Посмотреть
        </v-btn>

        <v-data-table
          :headers="headerOrderStores"
          :items="orders"
          :items-per-page="5"
          v-show="orders.length"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2>Посмотреть заказ</h2>
        <v-col cols="3">
          <v-text-field v-model="orderId" label="Номер заказа"></v-text-field>
        </v-col>

        <v-btn
          class="ma-2"
          @click="getOrder()"
          color="brown lighten-2"
          width="150"
          dark
        >
          Посмотреть
        </v-btn>
        <v-data-table
          :headers="headerOrder"
          :items="order"
          :items-per-page="5"
          hide-default-footer
          v-show="order.length"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-card
        v-for="item in itemsWithColors"
        :key="item.id"
        class="ma-3"
        max-width="200"
        min-height="140"
        outlined
        :color="item.color"
      >
        <v-card-title class="subtitle-1">
          {{ item.name | capitalize }}
        </v-card-title>
        <v-card-subtitle>
          Стоимость: {{ item.cost }} Количество: {{ item.quantity }}
        </v-card-subtitle>
      </v-card>
    </v-row>

    <v-row>
      <v-col>
        <h2>Изменить состояние заказа</h2>
        <v-col cols="3">
          <v-text-field
            v-model="orderIdForChange"
            label="Номер заказа"
          ></v-text-field>

          <v-select
            v-model="newStatus"
            :items="statuses"
            filled
            label="Новый статус"
            width="500px"
          ></v-select>
        </v-col>
        <v-btn
          class="ma-2"
          @click="changeStatus()"
          color="brown lighten-1"
          width="150"
          dark
        >
          Изменить
        </v-btn>
        <v-alert type="success" v-show="showAlert">{{
          responseMessage
        }}</v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import store from "@/store";
import axios from "axios";
import { URL_API } from "@/settings";
import { timeArrToLocaleTime } from "@/assets/utils/time";

export default {
  name: "Barista",

  data() {
    return {
      headerOrder: [
        {
          text: "Aдрес",
          align: "start",
          sortable: false,
          value: "address",
          width: "300px",
        },
        {
          text: "Цена",
          value: "cost",
        },
        {
          text: "Скидка",
          value: "discount",
        },
        {
          text: "Время заказа",
          value: "orderTime",
        },
        {
          text: "Статус",
          value: "status",
        },
      ],
      headerOrderStores: [
        {
          text: "id",
          align: "start",
          sortable: false,
          value: "id",
          width: "300px",
        },
        {
          text: "Цена",
          value: "cost",
        },
        {
          text: "Скидка",
          value: "discount",
        },
        {
          text: "Время заказа",
          value: "time",
        },
        {
          text: "Статус",
          value: "status",
        },
      ],
      order: [],
      orderId: undefined,
      orderItems: [],
      responseMessage: null,
      orderIdForChange: undefined,
      newStatus: undefined,
      showAlert: false,
      statuses: ["TEMPLATE", "FORMING", "COOKING", "READY", "GIVEN"],
      // addressesStore: [],
      orders: [],
      selectedAddress: null,
    };
  },

  filters: {
    capitalize: (v) => v.charAt(0).toUpperCase() + v.slice(1),
  },

  computed: {
    addresses() {
      return store.getters.getAddresses;
    },
    user() {
      return store.getters.getName;
    },
    role() {
      return store.getters.getRole;
    },
    isBarista() {
      return this.role.indexOf("ROLE_BARISTA") >= 0;
    },
    token() {
      return store.getters.getToken;
    },
    itemsWithColors() {
      return this.orderItems.map((elem) => ({
        ...elem,
        color:
          elem.type.toLowerCase() == "coffee"
            ? "brown lighten-4"
            : "red lighten-4",
      }));
    },
  },

  methods: {
    getOrder() {
      axios({
        method: "get",
        url: `${URL_API}/barista/orders/${this.orderId}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then((response) => {
        const { data } = response;

        console.log({ data });
        data.address =
          `${data.coffeeStore.address.planningStructure}. ${data.coffeeStore.address.street}`.toLowerCase();
        data.orderTime = timeArrToLocaleTime(data.orderTime);
        this.orderItems = data.items;
        this.order = [data];
      });
    },

    fetchAddresses() {
      return store.dispatch("fetchAddresses");
    },

    getOrderByStore() {
      axios({
        method: "get",
        url: `${URL_API}/barista/stores/${this.selectedAddress}/orders`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then((response) => {
        const { data } = response;

        this.orders = data.map((elem) => {
          const { id, status, cost, discount } = elem;
          const time = timeArrToLocaleTime(elem.time);
          return {
            id: id,
            status: status,
            cost: cost.toFixed(2),
            discount: discount.toFixed(2),
            time: time,
          };
        });
      });
    },

    changeStatus() {
      axios({
        method: "post",
        url: `${URL_API}/barista/orders/${this.orderIdForChange}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        data: {
          newStatus: this.newStatus,
        },
      }).then((response) => {
        this.responseMessage = response.data.message;
        this.showAlert = true;
        const vm = this;
        setTimeout(() => {
          vm.showAlert = false;
        }, 4000);
      });
    },
  },

  mounted() {
    if (!this.addresses) {
      this.fetchAddresses();
    }
  },

  created() {
    // this.getOrder();
    this.changeStatus();
    // this.getOrderByStore();
  },
};
</script>
