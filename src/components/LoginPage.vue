<template>
  <div>
    <h2>Вход в аккаунт</h2>
    <v-col cols="5" >
        <v-text-field
          v-model="phone"
          label="Телефон"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Пароль"

        ></v-text-field>
 
        <v-btn
          class="mr-4"
          @click="login"
          color="brown lighten-1"
          dark
        >
          войти
        </v-btn>
      </v-col>
  </div>
</template>

<script>
  import router from "@/router";
  import store from "@/store";

  export default {
    name: "LoginPage",
    data: () => ({
      phone: '',
      password: '',
  }),
    computed: {
      getRoles(){
        return store.getters.getRole;
      }
    },
   
   methods: {
    login(){
      const { phone, password } = this;
      store.dispatch("login", {phone, password})
      router.push("/order");
    }
   }

  }
</script>