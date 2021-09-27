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
    addresses: [],
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

    getAdresses(state){
      return state.addresses.map((elem) => {
        const { id } = elem;
        const { planningStructure, street } = elem.address;
        return {
          address: `${planningStructure}. ${street}`.toLowerCase(),
          id: id,
        }
      })
    },
    getAdressesWithPhone(state) {
      return state.addresses.map((elem) => {
        const { id, phone } = elem;
        const { planningStructure, street } = elem.address;
        return {
          address: `${planningStructure}. ${street}`.toLowerCase(),
          id: id,
          phone: phone,
        }
      })
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
    },

    SET_ADDRESSES(state, addresses){
      state.addresses = addresses;
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
    },
    fetchAddresses(context){
      axios({
        method: "get",
        url: "${URL_API}/order/stores",
      }).then((response) => {
        const { data } = response;
        context.commit('SET_ADDRESSES', data);
      });
    },
  }
})

export default store;
