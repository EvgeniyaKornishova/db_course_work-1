<template>
  <div>
    <v-row>
      <v-col cols="6">
        <h2>Меню</h2>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="panel in panels"
            :key="panel.key"
            v-show="!panel.hide"
          >
            <v-expansion-panel-header>{{
              panel.title
            }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-simple-table fixed-header height="250px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Название</th>
                      <th class="text-left">Цена</th>
                      <th class="text-right">Добавить</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="item in panel.items" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.cost }}</td>
                      <td class="text-right">
                        <v-btn @click="addProduct(item)" small outlined>
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <v-col>
        <h2>Состав заказа</h2>
        <v-simple-table fixed-header height="400px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Название</th>
                <th class="text-left">Количество</th>
                <th class="text-right">Цена</th>
                <th class="text-right">Удалить</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order" :key="item.name">
                <td width="200px">{{ item.name }}</td>
                <td width="150px">
                  <CounterInput v-model="item.amount" :max="10" :min="1" />
                </td>
                <td class="text-right">{{ item.cost }}</td>
                <td class="text-right">
                  <v-btn @click="deleteProduct(item)" small outlined>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-alert border="bottom" color="brown lighten-3">
          Стоимость: {{ finalCost }}
        </v-alert>
      </v-col>
    </v-row>
    <v-divider class="mb-4"></v-divider>
    <v-row>
      <v-col cols="6">
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

      <v-col>
        <v-btn
          x-large
          color="brown"
          :disabled="!token"
          @click="doOrder"
          outlined
        >
          Заказать
        </v-btn>
      </v-col>
    </v-row>

    <v-alert type="success" v-show="showAlert">{{ responseMessage }}</v-alert>
  </div>
</template>
<script>
import store from "@/store";
import axios from "axios";
import { URL_API } from "@/settings";
import CounterInput from "@/components/CounterInput";

export default {
  name: "Order",

  components: {
    CounterInput,
  },

  data() {
    return {
      rules: {
        number: (v) => !isNaN(+v) || "Need to be a number",
      },
      order: [],
      maxProductAmount: 10,
      selectedAddress: null,
      responseMessage: null,
      showAlert: false,
    };
  },

  computed: {
    addresses() {
      return store.getters.getAddresses;
    },
    token() {
      return store.getters.getToken;
    },
    finalCost() {
      return this.order
        .map((item) => +item.costNumber * +item.amount)
        .reduce((acc, cur) => acc + cur, 0);
    },
    panels() {
      return {
        coffee: {
          items: [],
          title: "Кофе",
          key: 1,
        },

        desserts: {
          items: [],
          title: "Десерт",
          key: 2,
        },

        favoriteCoffees: {
          items: [],
          title: "Мой кофе",
          key: 3,
          hide: !this.token,
        },
      };
    },
  },

  methods: {
    getCoffee() {
      axios({
        method: "get",
        url: `${URL_API}/order/coffees`,
      }).then((response) => {
        const { data } = response;

        this.panels.coffee.items = data.map((elem) => {
          let { id, name, cost } = elem;
          let costNumber = cost;
          cost = `${cost} р`;

          return {
            id: id,
            name: name,
            costNumber: costNumber,
            cost: cost,
            type: "Coffee",
          };
        });
      });
    },

    fetchAddresses() {
      return store.dispatch("fetchAddresses");
    },

    getDesserts() {
      axios({
        method: "get",
        url: `${URL_API}/order/desserts`,
      }).then((response) => {
        const { data } = response;

        this.panels.desserts.items = data.map((elem) => {
          let { id, name, cost } = elem;
          let costNumber = cost;
          cost = `${cost} р`;

          return {
            id: id,
            name: name,
            costNumber: costNumber,
            cost: cost,
            type: "Dessert",
          };
        });
      });
    },

    getFavoriteCoffees() {
      axios({
        method: "get",
        url: `${URL_API}/customer/favorite_coffees`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then((response) => {
        const { data } = response;

        this.panels.favoriteCoffees.items = data.map((elem) => {
          let { id, name, cost } = elem;
          let costNumber = cost;
          cost = `${cost} р`;

          return {
            id: id,
            name: name,
            costNumber: costNumber,
            cost: cost,
            type: "Coffee",
          };
        });
      });
    },

    doOrder() {
      axios({
        method: "post",
        url: `${URL_API}/order`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        data: {
          coffeeStoreId: this.selectedAddress,
          orderItems: this.order.map((item) => ({
            productId: item.id,
            quantity: item.amount,
            type: item.type,
          })),
        },
      }).then((response) => {
        this.responseMessage = response.data.message;
        this.showAlert = true;
        const vm = this;
        setTimeout(() => {
          vm.showAlert = false;
        }, 4000);
        this.order = [];
      });
    },

    foundProductById(id) {
      return this.order.find((item) => item.id === id);
    },

    addProduct(item) {
      item = { ...item, amount: 1 };
      let found = this.foundProductById(item.id);

      if (!found) this.order.push(item);
      else if (found.amount < this.maxProductAmount) {
        found.amount = +found.amount + 1;
      }
    },

    deleteProduct(item) {
      this.order = this.order.filter((a) => a.id !== item.id);
    },
  },

  mounted() {
    if (!this.addresses) {
      this.fetchAddresses();
    }
  },

  created() {
    this.getCoffee();
    this.getDesserts();
    this.getFavoriteCoffees();
  },
};
</script>
