<template>
  <v-app>
    <!-- <v-navigation-drawer v-model="drawer" app>
      <v-list nav>
        <v-list-item to="/" title="Dashboard" />
        <v-list-item to="/devices" title="Devices" />
        <v-list-item to="/playback" title="Playback" />
        <v-list-item to="/settings" title="Settings" />
      </v-list>
    </v-navigation-drawer> -->

    <v-app-bar app>
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer" /> -->
      <v-app-bar-title>Fule Conversion</v-app-bar-title>

      <v-spacer />

      <!-- ---------------------------------------------- -->
      <!-- User Profile -->
      <!-- ---------------------------------------------- -->
      <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn
            class="text-primary"
            color="lightprimary"
            variant="flat"
            rounded="pill"
            v-bind="props"
          >
            <SettingsIcon stroke-width="1.5" />
          </v-btn>
        </template>
        <v-sheet rounded="md" width="330" elevation="12">
          <ProfileDD />
        </v-sheet>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { SettingsIcon, Menu2Icon } from "vue-tabler-icons";
import ProfileDD from "./ProfileDD.vue";

const drawer = ref(true);
</script>
