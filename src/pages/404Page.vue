<script setup></script>

<template>
  <v-empty-state
    headline="Whoops, 404"
    title="Page not found"
    text="The page you were looking for does not exist"
    image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg"
  >
  </v-empty-state>

  <div class="d-flex justify-center">
    <v-btn
      class="mt-4"
      color="primary"
      variant="flat"
      @click="$router.push('/')"
      >Back to Home Page</v-btn
    >
  </div>
</template>
