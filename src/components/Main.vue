<template>
  <div class="fill-height">
    <v-app-bar
      dark
      prominent
      src="@/assets/beans.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(191, 123, 64,.3), rgba(230, 203, 179,.3)"
        ></v-img>
      </template>

      <v-app-bar-title
        class="ml-6 display-2"
        width="100%"
      >

        <div>Cup of coffee</div>
      </v-app-bar-title>
    
      <v-row 
        v-if="!user"
        class="mt-5 ma-0" 
        justify="end"
      >
        <v-btn
          class="mr-4"
          to="/login"
        >
        войти
        </v-btn>
        <v-btn
            class="mr-2"
            to="/registration"
          >
          регистрация
        </v-btn>
      </v-row>

      <v-row v-else justify="end" class="ma-4">
        <v-menu
          bottom
          min-width="150px"
          rounded
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-avatar
                class="mt-4"
                color="brown lighten-5"
                rounded
                size="77"
              >
              <v-img
                src="@/assets/cup.png"
              ></v-img>
                <!-- <span class="white--text headline" >{{ user }}</span> -->
              </v-avatar>
            </v-btn>
          </template>
          <v-card class="pa-2">
            <v-btn
              depressed
              text
              to="/profile"
            >
              Мой профиль 
            </v-btn>
            <!-- <v-divider class="my-2"></v-divider>
            <v-btn
              depressed
              text
              to="/favorites"
            >
              Избранное
            </v-btn> -->
            <v-divider class="my-2"></v-divider>

            <div v-if="isBarista">
              <v-btn
              depressed
              text
              to="/barista"
            >
              Бариста
            </v-btn>
            <!-- <v-divider class="my-2"></v-divider>
            <v-btn
              depressed
              text
              to="/barista"
            >
              Изменение меню
            </v-btn> -->
            <v-divider class="my-2"></v-divider>
            </div>
            <div v-if="isBarista">
               <v-btn
                depressed
                text
                to="/admin"
              >
                 Админ
              </v-btn>
              <v-divider class="my-2"></v-divider>
            </div>
           
            
            <v-btn
              depressed
              text
              @click="logout"
            >
              Выйти
            </v-btn>
          </v-card>
        </v-menu>
      </v-row>

     <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
          background-color="#00000070"
        >
          <v-tab
            v-for="tab in tabs"
            :key="tab.to"
            :to="tab.to"
          >{{ tab.title }}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main >
      <v-col class="pa-4">
        <router-view name="contentView">
        </router-view>
      </v-col>

      <v-card height="100" color="#00000000" tile flat/>
    </v-main>

    <v-footer  dark class="mt-5" absolute >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Cup of coffee</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
  import store from "@/store";

  export default {
    name: "Main",

    data() {
      return {

        tab: "",
        tabs: [{
          to: "/addresses",
          title: "Кофейни",
        }, {
          to: "/menu",
          title: "Меню",
        }, {
          to: "/order",
          title: "Заказать",
        }, {
          to: "/constructor",
          title: "Конструктор",
        }]
      }
    },

    computed: {
      user(){
        return store.getters.getName;
      },
      role(){
        return store.getters.getRole;
      },
      isBarista() {
        return this.role.indexOf("ROLE_BARISTA") >= 0;
      },
      isAdmin() {
        return this.role.indexOf("ROLE_ADMIN") >= 0;
      },
    },
    methods: {
      logout(){
        store.dispatch("logout")
      }
    }
  }
</script>