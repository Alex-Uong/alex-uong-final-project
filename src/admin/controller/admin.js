import api from "./../services/api.js";
import Product from "../models/productApi.js";
import PhoneList from "../models/product-list.js";
import Validation from "../models/validation.js";

const getEleId = (id) => document.getElementById(id);

// Hiển thị thông báo
const showToast = (text, success = true) => {
  Toastify({
    text,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: success
        ? "linear-gradient(to right, #00b09b, #96c93d)"
        : "linear-gradient(to right, #ff5f6d, #ffc371)",
    },
  }).showToast();
};

// Hiển thị danh sách sản phẩm
const renderListProduct = (data) => {
  getEleId("tablePhone").innerHTML = data
    .map(
      (product, i) => `
      <tr class="border">
        <td class="border px-4 py-2 text-center">${i + 1}</td>
        <td class="border px-4 py-2 text-center">${product.name}</td>
        <td class="border px-4 py-2 text-center">$${
          product.price
        }</td> <!-- Thêm ký hiệu $ ở đây -->
        <td class="border px-4 py-2 text-center">
          <img src="${
            product.img
          }" alt="phone-img" class="mx-auto rounded-lg shadow" width="100" height="100">
        </td>
        <td class="border px-4 py-2 text-center">${product.desc}</td>
        <td class="border px-4 py-2 text-center">
          <button class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onclick="handleEdit('${
            product.id
          }')">Edit</button>
          <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onclick="handleDelete('${
            product.id
          }')">Delete</button>
        </td>
      </tr>`
    )
    .join("");
};

const validateAddForm = (existingProducts) => {
  const validation = new Validation();

  const fields = [
    {
      id: "name",
      value: getEleId("name").value,
      method: (value) => validation.checkPhoneName(value, existingProducts),
      errorId: "tbname",
    },
    {
      id: "price",
      value: getEleId("price").value,
      method: validation.checkPrice,
      errorId: "tbprice",
    },
    {
      id: "screen",
      value: getEleId("screen").value,
      method: validation.checkScreen,
      errorId: "tbscreen",
    },
    {
      id: "backCamera",
      value: getEleId("backCamera").value,
      method: validation.checkBackCamera,
      errorId: "tbbackCam",
    },
    {
      id: "frontCamera",
      value: getEleId("frontCamera").value,
      method: validation.checkFrontCamera,
      errorId: "tbfrontCam",
    },
    {
      id: "img",
      value: getEleId("img").value,
      method: validation.checkImageLink,
      errorId: "tbimg",
    },
    {
      id: "desc",
      value: getEleId("desc").value,
      method: validation.checkDescription,
      errorId: "tbdesc",
    },
    {
      id: "type",
      value: getEleId("type").value,
      method: validation.checkBrand,
      errorId: "tbtype",
    },
  ];

  let isValid = true;

  fields.forEach(({ value, method, errorId }) => {
    const errorMessage = method(value);
    const errorField = getEleId(errorId);

    if (errorMessage) {
      errorField.innerHTML = errorMessage;
      errorField.classList.add("text-red-500", "text-sm", "mt-1");
      errorField.style.display = "block";
      isValid = false;
    } else {
      errorField.innerHTML = "";
      errorField.style.display = "none";
    }
  });

  return isValid;
};

const validateUpdateForm = (existingProducts) => {
  const validation = new Validation();

  const fields = [
    {
      id: "phoneName",
      value: getEleId("phoneName").value,
      method: (value) => validation.checkPhoneName(value, existingProducts),
      errorId: "thongbaoname",
    },
    {
      id: "phonePrice",
      value: getEleId("phonePrice").value,
      method: validation.checkPrice,
      errorId: "thongbaoprice",
    },
    {
      id: "phoneScreen",
      value: getEleId("phoneScreen").value,
      method: validation.checkScreen,
      errorId: "thongbaoscreen",
    },
    {
      id: "phoneBackCamera",
      value: getEleId("phoneBackCamera").value,
      method: validation.checkBackCamera,
      errorId: "thongbaobackCam",
    },
    {
      id: "phoneFrontCamera",
      value: getEleId("phoneFrontCamera").value,
      method: validation.checkFrontCamera,
      errorId: "thongbaofrontCam",
    },
    {
      id: "phoneImg",
      value: getEleId("phoneImg").value,
      method: validation.checkImageLink,
      errorId: "thongbaoimg",
    },
    {
      id: "phoneDesc",
      value: getEleId("phoneDesc").value,
      method: validation.checkDescription,
      errorId: "thongbaodesc",
    },
    {
      id: "phoneType",
      value: getEleId("phoneType").value,
      method: validation.checkBrand,
      errorId: "thongbaotype",
    },
  ];

  let isValid = true;

  fields.forEach(({ value, method, errorId }) => {
    const errorMessage = method(value);
    const errorField = getEleId(errorId);

    if (errorMessage) {
      errorField.innerHTML = errorMessage;
      errorField.classList.add("text-red-500", "text-sm", "mt-1");
      errorField.style.display = "block";
      isValid = false;
    } else {
      errorField.innerHTML = "";
      errorField.style.display = "none";
    }
  });

  return isValid;
};

// Đóng modal
const closeModal = () => {
  getEleId("activeModal").classList.add("hidden");

  // Reset các thông báo lỗi
  const errorFields = document.querySelectorAll("[id^='thongbao']");
  errorFields.forEach((field) => {
    field.innerHTML = ""; // Xóa nội dung thông báo lỗi
    field.style.display = "none"; // Ẩn phần tử
  });
};

// Mở modal chỉnh sửa
const handleEdit = (id) => {
  // Mở modal
  getEleId("activeModal").classList.remove("hidden");
  const errorFields = document.querySelectorAll("[id^='thongbao']");
  errorFields.forEach((field) => {
    field.innerHTML = ""; // Xóa nội dung thông báo lỗi
    field.style.display = "none"; // Ẩn phần tử
  });

  // Xóa giá trị cũ trong các trường nhập liệu
  [
    "phoneName",
    "phonePrice",
    "phoneScreen",
    "phoneBackCamera",
    "phoneFrontCamera",
    "phoneImg",
    "phoneDesc",
    "phoneType",
  ].forEach((id) => {
    const input = getEleId(id);
    if (input) input.value = "";
  });

  // Cập nhật nội dung modal-footer
  document.querySelector(
    ".modal-edit-footer"
  ).innerHTML = `<div class="flex justify-end space-x-2">
      <button onclick="handleUpdate(${id})"
        class="focus:outline-none text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        Update
      </button>
      <button id="closeModal"
        class="focus:outline-none text-gray-900 bg-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        Close
      </button>
    </div>`;

  // Đăng ký sự kiện đóng modal
  getEleId("closeModal").addEventListener("click", closeModal);

  // Lấy dữ liệu sản phẩm từ API
  api
    .getDataById(id)
    .then(({ data }) => {
      Object.entries(data).forEach(([key, value]) => {
        const input = getEleId(
          `phone${key.charAt(0).toUpperCase() + key.slice(1)}`
        );
        if (input) input.value = value;
      });
    })
    .catch(console.error);
};

window.handleEdit = handleEdit;

// Cập nhật sản phẩm
const handleUpdate = (id) => {
  api.fetchData().then(({ data }) => {
    const existingProducts = data;

    if (validateUpdateForm(existingProducts)) {
      const product = new Product(
        id,
        getEleId("phoneName").value,
        getEleId("phonePrice").value,
        getEleId("phoneScreen").value,
        getEleId("phoneBackCamera").value,
        getEleId("phoneFrontCamera").value,
        getEleId("phoneImg").value,
        getEleId("phoneDesc").value,
        getEleId("phoneType").value
      );

      api
        .updateData(product)
        .then(() => {
          showToast("Cập nhật sản phẩm thành công!");
          getListProduct();
          closeModal();
        })
        .catch(() => showToast("Lỗi khi cập nhật sản phẩm!", false));
    }
  });
};
window.handleUpdate = handleUpdate;

// Xóa sản phẩm
const handleDelete = (id) => {
  api
    .deleteDataById(id)
    .then(() => {
      showToast("Xóa sản phẩm thành công!");
      getListProduct();
    })
    .catch(() => showToast("Lỗi khi xóa sản phẩm!", false));
};
window.handleDelete = handleDelete;

// Lấy danh sách sản phẩm
const getListProduct = () => {
  api
    .fetchData()
    .then(({ data }) => renderListProduct(data))
    .catch(console.error);
};
getListProduct();

// Mở modal thêm sản phẩm
getEleId("addPhoneForm").addEventListener("click", () => {
  // Reset giá trị các trường nhập liệu
  [
    "name",
    "price",
    "screen",
    "backCamera",
    "frontCamera",
    "img",
    "desc",
    "type",
  ].forEach((id) => {
    const input = getEleId(id);
    if (input) input.value = "";
  });
  const errorFields = document.querySelectorAll("[id^='tb']");
  errorFields.forEach((field) => {
    field.innerHTML = ""; // Xóa nội dung thông báo lỗi
    field.style.display = "none"; // Ẩn phần tử
  });

  // Cập nhật nội dung modal-footer
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button class="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" onclick="handleAdd()">Add Phone</button>`;
});

// Thêm sản phẩm mới
const handleAdd = () => {
  api.fetchData().then(({ data }) => {
    const existingProducts = data;

    if (validateAddForm(existingProducts)) {
      const product = new Product(
        "",
        getEleId("name").value,
        getEleId("price").value,
        getEleId("screen").value,
        getEleId("backCamera").value,
        getEleId("frontCamera").value,
        getEleId("img").value,
        getEleId("desc").value,
        getEleId("type").value
      );

      api
        .addData(product)
        .then(() => {
          showToast("Thêm sản phẩm thành công!");
          getListProduct();
          document.getElementsByClassName("close")[0].click();
        })
        .catch(() => showToast("Lỗi khi thêm sản phẩm!", false));
    }
  });
};

window.handleAdd = handleAdd;

// Tìm kiếm
const phoneList = new PhoneList();

const getListPhone = () => {
  api
    .fetchData()
    .then(({ data }) => {
      phoneList.setPhones(data);
      renderListProduct(data);
    })
    .catch(console.error);
};

getListPhone();

// Thêm sự kiện tìm kiếm
getEleId("default-search").addEventListener("keyup", function () {
  const keyword = getEleId("default-search").value.trim();
  const findPhone = phoneList.searchPhone(keyword);
  renderListProduct(findPhone);
});

// Lắng nghe sự kiện thay đổi lựa chọn sắp xếp

const handleSort = async () => {
  const sortOption = getEleId("priceChange")?.value;
  if (!sortOption) return;

  try {
    const { data } = await api.fetchData();
    const sortedData =
      sortOption === "tangdan"
        ? [...data].sort((a, b) => a.price - b.price)
        : sortOption === "giamdan"
        ? [...data].sort((a, b) => b.price - a.price)
        : data;
    renderListProduct(sortedData);
  } catch (error) {
    console.error("Lỗi khi sắp xếp:", error);
  }
};

getEleId("priceChange")?.addEventListener("change", handleSort);
