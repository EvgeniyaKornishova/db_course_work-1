<template>
  <div>
    <v-col cols="5" >
      <v-text-field 
        outlined
        v-model="nameCoffee"
        label="Название кофе"
      ></v-text-field>
    </v-col>
    <v-row>
      <v-col cols="5">
        <h2>Ингредиенты </h2>
        <v-data-table 
          :headers="headerIngredients"
          :items="ingredients"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.add="{ item }">
            <v-btn
              @click="addProduct(item)"
              small
              outlined
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn> 
          </template>
        </v-data-table>

      </v-col>
      <v-col cols="7">
        <h2>Мое кофе</h2>
        <v-data-table
          :headers="headersCoffee"
          :items="coffee"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.delete="{ item }">
            <v-btn
              @click="deleteIngredient(item)"  
              small
              outlined
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.quantity="{ item }" >
            <CounterInput
              width="150"
              v-model="item.quantity"
              :max="10"
              :min="1"
            />
          </template>
        </v-data-table>

        <v-alert
        border="bottom"
        color="brown lighten-3"
        >
          Стоимость: {{ finalCost }}
        </v-alert>

        <v-btn
          dark
          color="brown lighten-1"
          @click="createCoffe()"
        >
          Создать
        </v-btn>

      </v-col>

      <v-alert
          type="success"
          v-show="showAlert"
        >{{ responseMessage }}</v-alert>
    </v-row>
   
  </div>
</template>
<script>
  import store from "@/store";
  import axios from "axios";
  import { URL_API } from "@/settings";
  import CounterInput from "@/components/CounterInput";

  export default {
    name: "Constructor",

    components: {
      CounterInput,
    },

    data () {
      return {
        headerIngredients: [
          {
            text: 'Название',
            align: 'start',
            sortable: false,
            value: 'name',
            width: "200px",
          }, {
           text: 'Цена',
           value: 'cost' 
          }, {
            text: 'ml',
            value: 'volumeMl',
          }, {
            text: 'Добавить',
            value: 'add',
          }, 
        ],
        headersCoffee: [
          {
            text: 'Название',
            align: 'start',
            sortable: false,
            value: 'name',
            width: "200px",
          }, {
            text: 'Количество',
            value: 'quantity',
          }, {
           text: 'Цена',
           value: 'cost' 
          }, {
            text: 'ml',
            value: 'volumeMl',
          }, {
            text: 'Удалить',
            value: 'delete',
          }, 
        ],

        coffee: [],
        ingredients: [],
        maxProductAmount: 10,
        responseMessage: null,
        nameCoffee: undefined,
       showAlert: false,
      }
    },

    computed: {
      user(){
        return store.getters.getName;
      },
      token(){
        return store.getters.getToken;
      },
      finalCost (){
        return this.coffee.map(item => +item.quantity * +item.cost).reduce((acc, cur) => acc+cur,0);
      },
    
    },

    methods: {
      getingredients(){
        axios({
          method: "get",
          url: `${URL_API}/constructor/ingredients`,
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        .then(response => {
          const { data } = response;

          this.ingredients = data.map(
            elem => {
              const { id, name, cost, volumeMl } = elem;
              
              return {
                id: id,
                name: name,
                cost: cost,
                volumeMl: volumeMl,
              };
            }
          ); 
        })
      },

      createCoffe(){
         axios({
          method: "post",
          url: `${URL_API}/constructor/coffees`,
          headers: {
            'Authorization': `Bearer ${this.token}`
          },
          data:{
            components: this.coffee.map(
              (item, i) => ({
                addingOrder: i,
                ingredientId: item.id,
                quantity: item.quantity,
                volumeMl: item.volumeMl*item.quantity,
              })),
            id: 1000,
            name: `${this.nameCoffee}`,
            photo: "null",
            status: "PUBLISHED",
          }
        })
        .then( response => {
          this.responseMessage = response.data.message;
          this.showAlert = true;
          const vm = this;
          setTimeout( () => {
            vm.showAlert = false;
          }, 4000)
          this.coffee = [];
        })
      },

      addProduct(item){
        item = { ...item, quantity: 1 };
        let found = this.foundProductById(item.id);

        if (!found) 
        this.coffee.push(item);
        else if (found.quantity < this.maxProductAmount) {
          found.quantity = +found.quantity + 1;
        }
      },

      foundProductById(id) {
        return this.coffee.find( item => item.id === id);
      },


      deleteIngredient(item){
        this.coffee = this.coffee.filter( a => a.id !== item.id );
      },
    },



    created() {
      this.getingredients();
    }
  }
</script>