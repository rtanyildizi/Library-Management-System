<template>
  <nav v-if="isAvaliable">
    <v-app-bar elevation="1" flat app color="secondary" hide-on-scroll>
      <v-app-bar-nav-icon
        color="white"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="grey--text">
        <router-link to="/books">
          <span class="google-sans-medium white--text"
            >NRT Library Management System
          </span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout()" text dark>
        <span class="google-sans-medium white--text">Logout</span>
        <v-icon color="white" right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="primary" :width="220">
      <v-row align="center" justify="center">
        <img src="@/assets/nrt-lms-logo.png" width="200" alt="logo" />
      </v-row>

      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.path"
          router
          :to="link.path"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title light class="google-sans-medium white--text">{{
              link.name
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
import router from "@/router";
export default {
  data() {
    return {
      drawer: true,
    };
  },
  methods: {
    ...mapActions("auth", ["logout"]),
  },
  computed: {
    isAvaliable() {
      return this.$route.path !== "/login" && this.$route.path !== "/";
    },

    links() {
      return router.options.routes.filter((route) => !!route.icon);
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>