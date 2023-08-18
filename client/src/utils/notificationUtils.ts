
import { toast, ToastContainer, ToastOptions } from "react-toastify";

export const notify = (msg: string, type: string) => {
  const options: ToastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  };

  if (type === "error") {
    toast.error(msg, options);
  } else {
    toast.success(msg, options);
  }
};

export { ToastContainer };
