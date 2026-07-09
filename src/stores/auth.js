import router from "@/router";
import { defineStore } from "pinia";
import { formatSuccess, formatError } from "@/utils/helpers/response";
import { fetchWrapper } from "@/utils/helpers/fetch-wrapper";

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const useAuthStore = defineStore("auth", {
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("USER") || "null"),
    access_token: JSON.parse(localStorage.getItem("ACCESS_TOKEN") || "null"),
    returnUrl: null,
  }),
  actions: {
    async login(username, password) {
      const user = await fetchWrapper.post(`${baseUrl}/login`, {
        username,
        password,
      });
      console.log("Login successful:", user);
      this.user = user;
      localStorage.setItem("USER", JSON.stringify(user));

      router.push("/");
    },

    async changePassword({ currentPassword, newPassword }) {
      try {
        const body = { old: currentPassword, new: newPassword };
        const { data } = await fetchWrapper.post(
          `${baseUrl}/changePassword`,
          body,
        );
        return formatSuccess("Change password successfully", data);
      } catch (error) {
        return formatError("Failed to change password", error);
      }
    },

    logout() {
      this.user = null;
      this.access_token = null;
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("USER");

      router.replace("/login");

      // Give Vue router a moment to finish before reload (optional delay)
      setTimeout(() => location.reload(), 100);
    },

    async refresh() {
      try {
        const { data } = await fetchWrapper.post(`${baseUrl}/refresh`);
        this.access_token = data.access_token;
        localStorage.setItem("ACCESS_TOKEN", JSON.stringify(data.access_token));
      } catch (error) {
        console.error("Failed to refresh token:", error);
        this.logout(); // Optionally auto-logout on failure
      }
    },
  },
});
