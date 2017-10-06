<template>
  <div>
  <v-navigation-drawer
    persistent
    app
    light
    temporary
    clipped
    isActive="drawer"
    v-model="drawer"
    class="white"
  >
    <v-divider></v-divider>
    <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="primary">directions_bus</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link :to="'/'">Lines</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="red">favorite</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link :to="'/favorite'">Favorites</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="orange">face</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link :to="'/about'">About</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar
    class="primary elevation-0"
    dark
    app
    extended
  >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3 grey--text text--lighten-4">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      Bus PWA
    </v-toolbar-title>
    <!--<v-text-field
      solo
      prepend-icon="search"
      placeholder="Search"
    ></v-text-field>-->
  </v-toolbar>
  </div>
  <!--<v-toolbar dark class="primary elevation-0" extended>
    <v-toolbar-side-icon></v-toolbar-side-icon>
-->

      <!--<v-list>
        <v-list-tile>
          <v-icon>directions_bus</v-icon>
          <span><router-link :to="'/'">Lines</router-link></span>
        </v-list-tile>

        <v-list-tile>
          <v-icon>favorite</v-icon>
          <span><router-link :to="'/favorite'">Favorites</router-link></span>
        </v-list-tile>

        <v-list-tile>
          <v-icon>favorite</v-icon>
          <span><router-link :to="'/about'">About</router-link></span>
        </v-list-tile>
      </v-list>-->
  <!--</v-toolbar>-->
</template>

<script>
  export default {
    name: 'TheNavigation',
    data () {
      return {
        drawer: true
      }
    }
  }
</script>
