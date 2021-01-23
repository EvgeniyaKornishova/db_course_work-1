<template>
  <div>
    <v-row>

      <v-col cols="6">
        <h2>Мое кофе</h2>
        <v-data-table
          :headers="headersCoffees"
          :items="favoriteСoffees"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.cancel>
            <v-btn
              @click="deleteFavoriteCoffee(item.id)"
              small
              outlined
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
     <!--  <v-col cols="6">
        <h2>Мои расписания</h2>
        <v-data-table
          :headers="headersSchedules"
          :items="ordefavorite_schedulesrs"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.cancel>
            <v-btn
              @click="deleteFavoriteSchedule(item.id)"
              small
              outlined
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col> -->

    </v-row>
  </div>
</template>

<script>
  import store from "@/store";
  import axios from "axios";
  import { URL_API } from "@/settings";

  export default {
    name: "Favorites",

    data() {
      return {
        headersCoffees: [
          {
            text: 'Название',
            align: 'start',
            sortable: false,
            value: 'name',
            width: "300px"
          }, {
           text: 'Рейтинг',
           value: 'avgRating'
          }, {
            text: 'Цена',
            value: 'cost',
          }, {
            text: 'Удалить',
            value: 'cancel',
          }
        ],
        // headersSchedules: [
        //   {
        //     text: 'Название',
        //     align: 'start',
        //     sortable: false,
        //     value: 'name',
        //     width: "300px"
        //   }, {
        //    text: 'Рейтинг',
        //    value: 'avgRating'
        //   }, {
        //     text: 'Онисание',
        //     value: 'discription',
        //   }
        // ],
       
        favoriteСoffees: [],
        // favorite_schedules: [],
        }
    },

     computed: {
      token(){
        return store.getters.getToken;
      },
  
    },

    methods: {
      getFevoriteCoffees(){
        axios({
          method: "get",
          url: `${URL_API}/customer/favorite_coffees`,
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        .then(response => {
          const { data } = response;

          this.favoriteСoffees.items = data.map(
            elem => {
              let { id, name, cost, avgRating } = elem;
              cost = `${cost} р`;

              return {
                id: id,
                name: name,
                cost: cost,
                avgRating: avgRating,
              };
            }
          );
        });
      },
      // getFevoriteSchedules(){
      //   axios({
      //     method: "get",
      //     url: `${URL_API}/customer/favorite_schedules`,
      //     headers: {
      //       'Authorization': `Bearer ${this.token}`
      //     }
      //   })
      //   .then(response => {
      //     const { data } = response;

      //     this.panels.favorite_schedules.items = data.map(
      //       elem => {
      //         let { id, name, avgRating, description } = elem;

      //         return {
      //           id: id,
      //           name: name,
      //           avgRating: avgRating,
      //           description: description,
      //         };
      //       }
      //     );
      //   });
      // },
      deleteFavoriteCoffee(id){
        axios({
          method: "delete",
          url: `${URL_API}/customer/favorite_coffees`,
          headers: {
            'Authorization': `Bearer ${this.token}`
          },
          data:{
            id: id,
          }
        })
      },  
      // deleteFavoriteSchedule(id){
      //   axios({
      //     method: "delete",
      //     url: `${URL_API}/customer/favorite_schedules`,
      //     headers: {
      //       'Authorization': `Bearer ${this.token}`
      //     },
      //     data:{
      //       id: id,
      //     }
      //   })
      // }

    },
    created() {
      this.getFevoriteCoffees();
      this.getFevoriteSchedules();
    }
  }
</script>