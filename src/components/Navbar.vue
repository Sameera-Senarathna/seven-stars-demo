<template>
  <nav>
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        Seven Stars
        <span>Inventory Management System</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer absolute temporary v-model="drawer">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" route :to="item.route">
          <v-list-tile-avatar>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        { title: "Dashboard", icon: "dashboard", route: "./" },
        { title: "Categories", icon: "category", route: "/categories" },
        { title: "About", icon: "dashboard", route: "./about" }
      ]
    };
  }
};
</script>

<style>
</style>
