import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import { URL_API } from "@/settings";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    name: null,
    role: [],
    token: null,
    phone: null,

  },
  getters: {
    getName(state){
      return state.name;
    },
    getRole(state){
      return state.role;
    },
    getToken(state){
      return state.token;
    },
  },
  mutations: {
    SET_USER (state, {name, role, phone}) {
      state.name = name;
      state.role = role;
      state.phone = phone;
    },

    SET_TOKEN (state, payload){
      state.token = payload;
    }
  },

  actions: {
    login(context, {phone, password}) {
      axios({
        method: "post",
        url: `${URL_API}/auth/signin`,
        data:{
          password: password,
          phone: phone,
        }
      }).then(response => {
        const { name, roles, phone, accessToken} = response.data;
        context.commit('SET_USER', {name, role: roles, phone});
        context.commit('SET_TOKEN', accessToken);
      })
    },
    logout(context){
      context.commit('SET_USER', {name: null, role: null, phone: null})
      context.commit('SET_TOKEN', null);
    }
  }
})

export default store;
