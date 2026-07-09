<template>
  <v-card class="mx-auto pa-6" max-width="400" width="100%" elevation="4">
    <div class="text-center mb-6">
      <h2 class="text-h5 font-weight-bold">Fule Conversion</h2>
      <p class="text-medium-emphasis">Sign in to continue</p>
    </div>

    <v-form ref="formRef" v-model="isValid" @submit.prevent="handleLogin">
      <v-text-field
        v-model="form.username"
        label="Username"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        :rules="[rules.required]"
      />

      <v-text-field
        v-model="form.password"
        label="Password"
        prepend-inner-icon="mdi-lock"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'"
        variant="outlined"
        :rules="[rules.required]"
        @click:append-inner="showPassword = !showPassword"
      />

      <v-btn
        type="submit"
        block
        color="primary"
        size="large"
        :loading="loading"
        :disabled="!isValid"
      >
        Login
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AlertComponent from "@/components/AlertComponent";

const router = useRouter();
const authStore = useAuthStore();

const formRef = ref();
const isValid = ref(false);
const loading = ref(false);
const showPassword = ref(false);

const form = reactive({
  username: "",
  password: "",
});

const rules = {
  required: (v) => !!v || "This field is required",
};

const handleLogin = async () => {
  const { valid } = await formRef.value.validate();

  if (!valid) return;

  try {
    loading.value = true;

    // TODO: Call Login API
    console.log("Login Payload:", form);

    // Mock Login
    const res = await authStore.login(form.username, form.password);

    console.log("Login Response:", res);

    router.push("/");
  } catch (error) {
    console.error(error);
    AlertComponent.error(
      "Login failed",
      "Please check your username and password and try again.",
    );
  } finally {
    loading.value = false;
  }
};
</script>
