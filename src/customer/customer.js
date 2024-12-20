import api from "./../api/api.js";
import Cartitem from "./cartitem.js";
import Cart from "./cart.js";

const cart = new Cart();

const getEleId = (id) => document.getElementById(id);

const renderListProduct = (data) => {
  let content = "";
  data.forEach((product) => {
    content += `
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="p-8 rounded-t-lg" src="${product.img}" alt="product image" />
    </a>
    <div class="px-5 pb-5">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${product.name}</h5>
        </a>
        <div class="flex items-center mt-2.5 mb-5">
            <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            </div>
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">$${product.price}</span>
            <button class="add-to-cart text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">Add to cart</button>
        </div>
    </div>
</div>`;
  });

  getEleId("products").innerHTML = content;

  // Them su kien click khi render xong
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      cart.addToCart(getInfoItem(event));
      setLocalStorage();
    });
  });
};

// lấy dữ liệu xuống để render
const getListProduct = () => {
  // lay du lieu xuong tu api
  const promise = api.fetchData();

  promise
    .then((result) => {
      renderListProduct(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

getListProduct();

// xu ly khi khach hang chon loai san pham
getEleId("phone-type").onchange = () => {
  const value = getEleId("phone-type").value;
  const promise = api.fetchData();

  promise
    .then((result) => {
      const data = result.data;

      // Neu la tieu de thi hien thi het
      if (value === "all") {
        renderListProduct(data);
      } else {
        const filterData = data.filter(
          (product) => product.type.toLowerCase() === value
        );
        renderListProduct(filterData);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// Lay thong tin cua san pham va tao doi toi cart item
const getInfoItem = (event) => {
  // Lay gia tri cua các the data
  const id = event.target.dataset.id;
  const name = event.target.dataset.name;
  const price = event.target.dataset.price;
  const img = event.target.dataset.img;

  // Tao ra mot cartitem tu lop doi tuong cartitem
  const cartitem = new Cartitem(id, name, price, img);

  // Tra ve doi tuong cartitem vua moi tao ra
  return cartitem;
};

/**
Mo va dong model 
*/
// Dom toi cac phan tu
const cartIcon = getEleId("cart-icon");
const cartModal = getEleId("cart-modal");
const cartClose = getEleId("close-modal");
const modelContent = getEleId("model-content");

// Mo model khi click vao bieu tuong gio hang
cartIcon.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
  getLocalStorage();
  renderTotal();
});

// Dong model khi click vao dau x
cartClose.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

// Dong model khi click ngoai noi dung model
window.addEventListener("click", (event) => {
  if (event.target === cartModal && event.target !== modelContent) {
    cartModal.classList.add("hidden");
  }
});

/**
 * Luu thong tin gio hang
 */

const setLocalStorage = () => {
  // Dat bien de luu thong tin gio hang
  const dataJSON = cart.array;

  // Chuyen sang dang chuoi (String)
  const dataString = JSON.stringify(dataJSON);

  // Luu thong tin gio hang vao local storage
  localStorage.setItem("cart", dataString);
};

/**
 * Ham render gio hang
 */
const renderCart = (data) => {
  // Tao bien content de luu noi dung html
  let content = "";

  // Duyet qua tung phan tu trong mang va tich luy vao bien content
  data.forEach((item) => {
    content += `<div class="flex items-center bg-gray-100 p-4 gap-4">
            <div class="w-[20%]">
              <img
                src="${item.img}"
                alt=""
              />
            </div>
            <div class="w-[60%] flex flex-col items-start gap-4">
              <h4 class="font-semibold">${item.name}</h4>
              <div>
                <button class="minus w-[4ch]" data-id="${item.id}">-</button>
                <input type="text" class="quantity w-[4ch]" value="${item.quantity}" />
                <button class="plus w-[4ch]" data-id="${item.id}">+</button>
              </div>
            </div>
            <div class="w-[20%] flex flex-col gap-4">
              <i
                class="fa-solid fa-trash text-lg cursor-pointer hover:text-red-600 transition-all duration-300 delete"
                data-id="${item.id}"
              ></i>
              <h4 class="font-semibold">$${item.price}</h4>
            </div>
          </div>`;
  });

  // Gan noi dung html vao model
  getEleId("cart-items").innerHTML = content;

  // Them su kien click khi render xong
  // Nut -
  document.querySelectorAll(".minus").forEach((minusIcon) => {
    minusIcon.addEventListener("click", () => {
      const id = minusIcon.dataset.id;
      cart.decreaseQuantity(id);
      setLocalStorage();
      renderCart(cart.array);
      renderTotal();
    });
  });

  // Nut +
  document.querySelectorAll(".plus").forEach((plusIcon) => {
    plusIcon.addEventListener("click", () => {
      const id = plusIcon.dataset.id;
      cart.increaseQuantity(id);
      setLocalStorage();
      renderCart(cart.array);
      renderTotal();
    });
  });

  // Nut xoa
  document.querySelectorAll(".delete").forEach((trashIcon) => {
    trashIcon.addEventListener("click", () => {
      const id = trashIcon.dataset.id;
      cart.removeProduct(id);
      setLocalStorage();
      renderCart(cart.array);
      renderTotal();
    });
  });
};

// Render tong tien
const renderTotal = () => {
  const total = cart.getTotal();
  getEleId("total-price").innerHTML = `$${total}`;
};

/**
 * Lay thong tin tu local storage de render gio hang
 */
const getLocalStorage = () => {
  // Lay du lieu tu local storage
  const dataString = localStorage.getItem("cart");

  // Kiem tra xem co du lieu khong
  if (dataString == null) return;

  // Convert du lieu tu dang chuoi sang dang doi tuong
  const dataJSON = JSON.parse(dataString);

  // Gan du lieu vao mang
  cart.array = dataJSON;

  // Render gio hang
  renderCart(cart.array);
};

window.onload = () => {
  getLocalStorage();
};

// Xu ly nut thanh toan
getEleId("checkout").addEventListener("click", () => {
  cart.clearCart();
  setLocalStorage();
  cartModal.classList.add("hidden");
});
