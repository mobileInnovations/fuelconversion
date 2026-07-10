<script>
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

export default {
  setup() {
    const authStore = useAuthStore();

    const listItem = [
      { title: "logout", action: "logout", icon: "mdi-logout" },
    ];

    return {
      authStore,
      listItem,
    };
  },
  methods: {
    onClick(action) {
      if (action === "logout") {
        this.authStore.logout();
      } else if (action === "edit-profile") {
        router.replace("/edit-profile");
      } else if (action === "change-pwd") {
        router.replace("/change-password");
      }
    },
  },
};
</script>

<template>
  <div class="pa-4">
    <h4 class="greeting">
      Welcome,
      <span class="greeting__name">{{
        authStore?.user?.username || "User"
      }}</span>
      <span class="greeting__company"
        >({{ authStore?.user?.company || "Company" }})</span
      >
    </h4>

    <v-divider />

    <!-- ✅ moved inline style to CSS -->
    <perfect-scrollbar class="profile-scroll">
      <v-divider />
      <v-list class="mt-3">
        <v-list-item
          v-for="list in listItem"
          :key="list.title"
          color="primary"
          rounded="md"
          @click="onClick(list.action)"
        >
          <v-list-item-title class="text-subtitle-2">
            <v-icon size="24">{{ list.icon }}</v-icon> {{ list.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </div>
</template>

<style scoped>
/* ✅ moved inline style here */
.profile-scroll {
  max-height: 515px;
  overflow-y: auto;
}

/* optional: better scrollbar behavior consistency */
.profile-scroll :deep(.ps__rail-y) {
  opacity: 0.3;
}

.profile-scroll :deep(.ps__thumb-y) {
  background-color: rgba(var(--v-theme-primary), 0.6);
}

.greeting {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin: 0;
  line-height: 1.2;
}

.greeting__name {
  font-weight: 500;
  font-size: 16px;
}

.greeting__company {
  font-weight: 400;
  font-size: 13px;
  color: var(--text-secondary, #6b7280);
}
</style>
