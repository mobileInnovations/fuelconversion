import Swal from "sweetalert2";

const AlertComponent = {
  success(title = "Success", text = "") {
    return Swal.fire({
      icon: "success",
      title,
      text,
      confirmButtonText: "OK",
    });
  },

  error(title = "Error", text = "") {
    return Swal.fire({
      icon: "error",
      title,
      text,
      confirmButtonText: "OK",
      footer: "Please check the console for more details.",
    });
  },

  warning(title = "Warning", text = "") {
    return Swal.fire({
      icon: "warning",
      title,
      text,
      confirmButtonText: "OK",
    });
  },

  info(title = "Information", text = "") {
    return Swal.fire({
      icon: "info",
      title,
      text,
      confirmButtonText: "OK",
    });
  },

  confirm(
    title = "Are you sure?",
    text = "",
    confirmButtonText = "Yes",
    cancelButtonText = "Cancel",
  ) {
    return Swal.fire({
      icon: "question",
      title,
      text,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true,
    });
  },

  toast(icon = "success", title = "") {
    return Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },
};

export default AlertComponent;
