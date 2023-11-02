import { login, logout } from "./login";
import { register } from "./register";
import { orderProduct } from "./stripe";
import {
  deleteOne,
  createCategory,
  createProduct,
  editCategory,
  editProduct,
} from "./admin";

// USER
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const logOutBtn = document.querySelectorAll(".logoutBtn");
const quantityIncrementBtn = document.querySelector(".increment-btn");
const quantityDecrementBtn = document.querySelector(".decrement-btn");
const addToCartBtn = document.querySelector(".add-to-cart-btn");

// ADMIN

// Create
const createCategoryForm = document.querySelector(".create-category-form");
const createProductForm = document.querySelector(".create-product-form");

// Delete
const deleteProductBtn = document.querySelectorAll(".delete-product-btn");
const deleteCategoryBtn = document.querySelectorAll(".delete-category-btn");

// Edit
const editCategoryForm = document.querySelector(".edit-category-form");
const editProductForm = document.querySelector(".edit-product-form");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    register(name, email, password, confirmPassword);
  });
}

if (logOutBtn) {
  logOutBtn.forEach((el) => {
    el.addEventListener("click", logout);
  });
}

// ADMIN

// Create
if (createCategoryForm) {
  createCategoryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", document.getElementById("categoryName").value);
    form.append("status", document.getElementById("categoryStatus").checked);
    form.append("image", document.getElementById("categoryImage").files[0]);

    createCategory(form);
  });
}

if (createProductForm) {
  createProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const form = new FormData();

    const categorySelectBox = document.querySelector(
      ".create-product-category"
    );
    const categoryOption =
      categorySelectBox.options[categorySelectBox.selectedIndex];
    const category = categoryOption.value;
    form.append("category", category);

    form.append("name", document.querySelector(".create-product-name").value);
    form.append(
      "smallDescription",
      document.querySelector(".create-product-small-description").value
    );
    form.append(
      "description",
      document.querySelector(".create-product-description").value
    );
    form.append(
      "originalPrice",
      document.querySelector(".create-product-original-price").value
    );
    form.append(
      "sellingPrice",
      document.querySelector(".create-product-selling-price").value
    );
    form.append(
      "image",
      document.querySelector(".create-product-image").files[0]
    );
    form.append(
      "quantity",
      document.querySelector(".create-product-quantity").value
    );
    form.append(
      "status",
      document.querySelector(".create-product-status").checked
    );
    form.append(
      "trending",
      document.querySelector(".create-product-trending").checked
    );

    createProduct(form);
  });
}

// Delete
if (deleteProductBtn) {
  deleteProductBtn.forEach((el) =>
    el.addEventListener("click", () => {
      const prodID = el.value;

      deleteOne(prodID, "product");
    })
  );
}

if (deleteCategoryBtn) {
  deleteCategoryBtn.forEach((el) =>
    el.addEventListener("click", () => {
      const categoryID = el.value;

      deleteOne(categoryID, "category");
    })
  );
}

// Edit
if (editCategoryForm) {
  editCategoryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", document.querySelector(".edit-category-name").value);
    form.append(
      "status",
      document.querySelector(".edit-category-status").checked
    );

    if (!document.querySelector(".edit-category-image").files[0]) {
      form.append(
        "image",
        document.querySelector(".edit-category-old-image").value
      );
    } else {
      form.append(
        "image",
        document.querySelector(".edit-category-image").files[0]
      );
    }

    const id = document.querySelector(".edit-category-id").value;

    editCategory(form, id);
  });
}

if (editProductForm) {
  editProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const form = new FormData();

    const categorySelectBox = document.querySelector(".edit-product-category");
    const categoryOption =
      categorySelectBox.options[categorySelectBox.selectedIndex];
    const category = categoryOption.value;
    form.append("category", category);

    form.append("name", document.querySelector(".edit-product-name").value);
    form.append(
      "smallDescription",
      document.querySelector(".edit-product-small-description").value
    );
    form.append(
      "description",
      document.querySelector(".edit-product-description").value
    );
    form.append(
      "originalPrice",
      document.querySelector(".edit-product-original-price").value
    );
    form.append(
      "sellingPrice",
      document.querySelector(".edit-product-selling-price").value
    );
    form.append(
      "quantity",
      document.querySelector(".edit-product-quantity").value
    );
    form.append(
      "status",
      document.querySelector(".edit-product-status").checked
    );
    form.append(
      "trending",
      document.querySelector(".edit-product-trending").checked
    );
    if (!document.querySelector(".edit-product-image").files[0]) {
      form.append(
        "image",
        document.querySelector(".edit-product-old-image").value
      );
    } else {
      form.append(
        "image",
        document.querySelector(".edit-product-image").files[0]
      );
    }

    const id = document.querySelector(".edit-product-id").value;

    editProduct(form, id);
  });
}

if (quantityIncrementBtn && quantityDecrementBtn && addToCartBtn) {
  const inputQty = document.querySelector(".input-qty");
  let qty = 0;

  quantityIncrementBtn.addEventListener("click", () => {
    qty === 10 ? (qty = 10) : qty++;

    inputQty.value = qty.toString();
    addToCartBtn.value = qty;
  });

  quantityDecrementBtn.addEventListener("click", () => {
    qty === 1 ? (qty = 1) : qty--;

    inputQty.value = qty.toString();
    addToCartBtn.value = qty;
  });

  addToCartBtn.addEventListener("click", (e) => {
    e.target.textContent = "Processing...";
    const { productId } = e.target.dataset;
    orderProduct(productId, qty);
  });
}
