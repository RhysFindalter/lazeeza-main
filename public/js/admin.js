import axios from "axios";
import { showAlertAdmin } from "./alerts";

export const deleteOne = async (ID, subject) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/v1/${
        subject === "category" ? "categories" : "products"
      }/${ID}`,
    });
    if (res.status === 204) {
      showAlertAdmin("success", `Successfully deleted ${subject}!`);
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    showAlertAdmin("error", err.response.data.message);
  }
};

export const createCategory = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/categories",
      data,
    });

    if (res.data.status === "success") {
      showAlertAdmin("success", "Created category!");
      window.setTimeout(() => {
        location.assign("/allCategories");
      }, 1000);
    }
  } catch (err) {
    showAlertAdmin("error", err.response.data.message);
  }
};

export const createProduct = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/products",
      data,
    });

    if (res.data.status === "success") {
      showAlertAdmin("success", "Successfully created product!");
      window.setTimeout(() => {
        location.assign("/allProducts");
      }, 1000);
    }
  } catch (err) {
    showAlertAdmin("error", err.response.data.message);
  }
};

export const editCategory = async (data, id) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `/api/v1/categories/${id}`,
      data,
    });

    if (res.data.status === "success") {
      showAlertAdmin("success", "Successfully edited category!");
      window.setTimeout(() => {
        location.assign("/allCategories");
      }, 1000);
    }
  } catch (err) {
    showAlertAdmin("error", err.response.data.message);
  }
};

export const editProduct = async (data, id) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `/api/v1/products/${id}`,
      data,
    });

    if (res.data.status === "success") {
      showAlertAdmin("success", "Successfully edited product!");
      window.setTimeout(() => {
        location.assign("/allProducts");
      }, 1000);
    }
  } catch (err) {
    showAlertAdmin("error", err.response.data.message);
  }
};
