<template>
  <div>
    <v-row class="mt-5 ma-0" justify="center">
      <v-card
        v-for="place in addresses"
        :key="place.id"
        class="ma-5"
        max-width="400"
      >
        <v-img :src="place.imgSrc" height="200px"></v-img>

        <v-card-title class="text-capitalize">
          {{ place.address }}
        </v-card-title>

        <v-card-subtitle>
          <v-icon>mdi-phone</v-icon> {{ place.phone }}
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="orange lighten-2" text to="/order"> Закакзать </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "Addresses",

  computed: {
    addresses() {
      return store.getters.getAddressesWithPhone.map((elem) => {
        const { id, phone, address } = elem;
        let randomImage = Math.ceil(Math.random() * 5 + 1);
        return {
          id: id,
          phone: phone,
          address: address,
          imgSrc: require(`../assets/shops/shop${randomImage}.jpg`),
        };
      });
    },
  },

  methods: {
    fetchAddresses() {
      return store.dispatch("fetchAddresses");
    },
  },

  mounted() {
    if (!this.addresses) {
      this.fetchAddresses();
    }
  },
};
</script>
