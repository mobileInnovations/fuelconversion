<template>
  <v-app>
    <v-app-bar app>
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
