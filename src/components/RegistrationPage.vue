<template>
  <div>
    <h2>Регистрация</h2>

    <v-col cols="5" >
        <v-text-field
          v-model="name"
          label="Имя"
        ></v-text-field>
        <v-text-field
          v-model="surname"
          label="Фамилия"
        ></v-text-field>
        <v-text-field
          v-model="phone"
          label="Телефон"
        ></v-text-field>
        <v-radio-group
          v-model="sex"
          row
        > 
          <v-radio
            label="Женщина"
            value="F"
          ></v-radio>
          <v-radio
            label="Мужчина"
            value="M"
          ></v-radio>
        </v-radio-group>
        <v-text-field
          v-model="password"
          label="Пароль"
        ></v-text-field>
 
        <v-btn
          class="mr-4"
          @click="registration"
          color="brown lighten-1"
          dark
        >
          зарегистрироваться
        </v-btn>
        <p></p>
    </v-col>
  </div>
</template>

<script>
  import router from "@/router";
  import axios from "axios";
  import { URL_API } from "@/settings";

  export default {
    name: "Registration",
    data: () => ({
      name: '',
      surname: '',
      sex: '',
      phone: '',
      password: '',
    }),
   
   methods: {
    registration(){
      const { name, surname, phone, sex, password } = this;
      axios({
        method: "post",
        url: `${URL_API}/auth/signup`,
        data:{
          name: name,
          password: password,
          phone: phone,
          sex: sex,
          surname: surname,
        }
      })
      .then( () => {
        router.push("/login");
      })
      .catch( error => {
        console.log({error});
      })
    },
  }

  }
</script>