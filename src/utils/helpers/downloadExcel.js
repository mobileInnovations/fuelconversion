import Swal from "sweetalert2";
import dayjs from "dayjs";
import { formatReportFilename } from "@/utils/formatReportFilename";

/**
 * Generic report downloader
 * @param {Object} options
 * @param {Function} options.apiCall - Function that returns a Blob when called with { startDate, endDate }
 * @param {String} options.filenamePrefix - Prefix for the downloaded file name
 * @param {String|Date} options.startDate
 * @param {String|Date} options.endDate
 */
export async function downloadReport({
  apiCall,
  filenamePrefix,
  startDate,
  endDate,
}) {
  try {
    if (!apiCall || typeof apiCall !== "function") {
      throw new Error("Invalid API call function provided");
    }
    if (!filenamePrefix || typeof filenamePrefix !== "string") {
      throw new Error("Invalid filename prefix provided");
    }
    if (!startDate || !endDate) {
      throw new Error("Start date and end date are required");
    }

    const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");

    const response = await apiCall({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    if (!(response instanceof Blob)) {
      Swal.fire({
        title: "Export failed",
        text: response.message || "Something is wrong, please try again later.",
        icon: "error",
        draggable: true,
      });
      throw new Error("Invalid file format returned from API");
    }

    const url = window.URL.createObjectURL(response);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      formatReportFilename(startDate, endDate, filenamePrefix)
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    Swal.fire({
      icon: "success",
      title: "Export started",
      text: "Check your downloads folder",
      timer: 5000,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      title: "Export failed",
      text: error?.message || String(error),
      icon: "error",
      draggable: true,
    });
  }
}
