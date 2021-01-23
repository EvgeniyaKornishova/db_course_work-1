<template>
  <div class="hello">
  



    <h1>{{ msg }}</h1>
    <h2>{{ name }}</h2>
    <h3>{{ name2 }}</h3>
    <button
      class="23"
      :class="name"
      @click="changeName()"
    >change</button>
    <v-row justify="center" align="center" class="mr-8">
      <v-col
        v-for="user in 7"
        :key="user"
        cols="12"
        lg="4"
        xl="3"
      >
        <v-card
          height="300"
          width="100%"
          class="ma-6"
          color="red lighten-4"
        >
          <v-card-title>
            {{ user }}
          </v-card-title>
          <v-card-actions>
            <v-btn
              color="secondary"
              rounded
              outlined
              width="100%"
            >
              телки
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      name : "coffe",
      users: ["Ivan", "Igor"]      
    }
  },
  computed: {
    name2(){
      return `Hello ${this.name}`;
    }
  },
  methods:{
    getName2() {
      return this.name2;
    },
    changeName(newName) {
      this.name = newName ?? "noname";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
