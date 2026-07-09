import { defineStore } from "pinia";
import { fetchWrapper } from "@/utils/helpers/fetch-wrapper";

const baseUrl = `${import.meta.env.VITE_API_URL}/converter`;

export const useConvertStore = defineStore("convert", {
  state: () => ({
    loading: false,
  }),

  actions: {
    async convert(masterFile, fleetFile, vehicleField) {
      this.loading = true;

      try {
        const formData = new FormData();

        formData.append("master", masterFile);
        formData.append("fleet", fleetFile);
        formData.append("vehicleField", vehicleField);

        const blob = await fetchWrapper.post(baseUrl, formData);

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${vehicleField}_output_${Date.now()}.csv`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);

        return true;
      } catch (error) {
        console.error(error.message || error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
