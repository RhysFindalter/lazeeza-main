import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      if (res.data.data.user.role === "admin") {
        showAlert("success", "Redirecting to the admin page");
        window.setTimeout(() => {
          location.assign("/allCategories");
        }, 1500);
      } else {
        showAlert("success", "Logged in successfully!");
        window.setTimeout(() => {
          location.assign("/");
        }, 1500);
      }
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });

    if (res.data.status === "success") location.assign("/");
  } catch (err) {
    console.log(err.response);
    showAlert("error", "Unable to sign out at this time. Try again later");
  }
};
