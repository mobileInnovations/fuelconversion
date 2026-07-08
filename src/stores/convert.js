import router from "@/router";
import { defineStore } from "pinia";
import { formatSuccess, formatError } from "@/utils/helpers/response";
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
        const fileName = `${vehicleField}_output_${Date.now()}.csv`;
        const formData = new FormData();

        formData.append("master", masterFile);
        formData.append("fleet", fleetFile);
        formData.append("vehicleField", vehicleField);

        const response = await fetchWrapper.post(`${baseUrl}`, formData, {
          responseType: "blob",
        });

        // Download CSV
        const blob = new Blob([response.data], {
          type: "text/csv",
        });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();

        window.URL.revokeObjectURL(url);

        return true;
      } finally {
        this.loading = false;
      }
    },
  },
});
