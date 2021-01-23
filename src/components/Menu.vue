<template>
  <div>
    <v-row>

      <v-col cols="6">
        <h2>Кофе</h2>
        <v-data-table
          :headers="headerCoffee"
          :items="coffee"
          :items-per-page="5"
          class="elevation-1"
          width="200"
        ></v-data-table>
      </v-col>

      <v-col cols="6">
        <h2>Десерты</h2>
        <v-data-table
          :headers="headersDesserts"
          :items="desserts"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-col>

    </v-row>
  </div>
</template>

<script>
  import axios from "axios";
  import { URL_API } from "@/settings";
  
  export default {
    name: "Menu",
    data() {
      return {
        headerCoffee: [
          {
            text: 'Название',
            align: 'start',
            sortable: false,
            value: 'name',
            width: "300px"
          },
          {
           text: 'Цена',
           value: 'cost' },
          {
            text: 'Рейтинг',
            value: 'avgRating',
          },
        ],
        headersDesserts: [
          {
            text: 'Название',
            align: 'start',
            sortable: false,
            value: 'name',
            width: "500px"
          },
          { text: 'Цена', value: 'cost' },
        ],
        coffee: [],
        desserts: [],
        }
    },
    methods: {
      getCoffee(){
          axios({
          method: "get",
          url: `${URL_API}/order/coffees`,
        })
        .then(response => {
          console.log(response);
          const { data } = response;

          this.coffee = data.map(
            elem => {
              let { id, name, cost, avgRating } = elem;

              avgRating = avgRating ? +avgRating.toFixed(1): "-";
              cost = `${cost} р`;

              return {
                id: id,
                name: name,
                cost: cost,
                avgRating: avgRating,
              };
            }
          );
        })
      },
       getDesserts(){
          axios({
          method: "get",
          url: `${URL_API}/order/desserts`,
        })
        .then(response => {
          console.log(response);
          const { data } = response;

          this.desserts = data.map(
            elem => {
              let { id, name, cost } = elem;
              cost = `${cost} р`;

              return {
                id: id,
                name: name,
                cost: cost,
              };
            }
          );
        })
      }
    },

    created() {
      this.getCoffee(),
      this.getDesserts()
    }
  }
</script>