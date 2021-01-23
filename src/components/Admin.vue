<template>
  <div v-if="isAdmin">
    <v-row>
      <v-col cols="12">
        <h2>Просмотр пользователей</h2>
        
        <v-data-table 
          :headers="headers"
          :items="users"
          :items-per-page="5"
          v-show="users.length"
          class="elevation-1"
        >
          <template v-slot:item.roles="{ item }">
            <v-chip
              v-for="role in item.roles"
              :key="role.name"
              class="ma-1"
            >
              {{role.name}}
            </v-chip>
          </template>

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
    name: "Admin",

    data () {
      return {
        headers: [
          {
            text: 'id',
            align: 'start',
            sortable: false,
            value: 'id',
            width: "30px"
          }, {
           text: 'Имя',
           value: 'firstName' 
          }, {
            text: 'Фамилия',
            value: 'lastName',
          }, {
            text: 'Пол',
            value: 'sex',
          }, {
            text: 'Почта',
            value: 'email',
          }, {
            text: 'Телефон',
            value: 'phone',
          }, {
            text: 'Роли',
            value: 'roles',
          },
        ],
        users: [],
      }
    },

    computed: {
      user(){
        return store.getters.getName;
      },
      role(){
        return store.getters.getRole;
      },
      isAdmin() {
        return this.role.indexOf("ROLE_ADMIN") >= 0;
      },
      token(){
        return store.getters.getToken;
      },
     
    },

    methods: {
      getUsers(){
        axios({
          method: "get",
          url: `${URL_API}/admin/users`,
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
         .then(response => {
          const { data } = response;

          this.users = data.map(
            elem => {
              const { id, firstName, lastName, sex, email, phone, roles } = elem;

              return {
                id: id,
                firstName: firstName,
                lastName: lastName,
                sex: sex,
                email: email,
                phone: phone,
                roles: roles,
              };
            }
          ); 
        })
      },
    },

    created() {
      this.getUsers();
    }
  }
</script>