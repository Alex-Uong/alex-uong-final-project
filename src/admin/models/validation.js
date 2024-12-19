export default class Validation {
  // Kiểm tra tên điện thoại
  checkPhoneName(name, existingProducts = []) {
    if (!name.trim()) {
      return "Tên điện thoại không được để trống!";
    }
    if (name.length < 3) {
      return "Tên điện thoại phải có ít nhất 3 ký tự!";
    }
    const isDuplicate = existingProducts.some(
      (product) => product.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (isDuplicate) {
      return "Tên sản phẩm này đã tồn tại!";
    }
    return "";
  }

  // Kiểm tra giá
  checkPrice(price) {
    if (!price.trim()) {
      return "Vui lòng nhập giá!";
    }
    if (isNaN(price)) {
      return "Giá phải là số!";
    }
    if (price <= 0) {
      return "Vui lòng nhập số dương cho giá!";
    }
    return "";
  }

  // Kiểm tra màn hình
  checkScreen(screen) {
    if (!screen.trim()) {
      return "Thông số màn hình không được để trống!";
    }
    return "";
  }

  // Kiểm tra camera sau
  checkBackCamera(backCamera) {
    if (!backCamera.trim()) {
      return "Thông số camera sau không được để trống!";
    }
    return "";
  }

  // Kiểm tra camera trước
  checkFrontCamera(frontCamera) {
    if (!frontCamera.trim()) {
      return "Thông số camera trước không được để trống!";
    }
    return "";
  }

  // Kiểm tra link hình ảnh
  checkImageLink(img) {
    if (!img.trim()) {
      return "Vui lòng nhập link hình ảnh!";
    }
    const regex = /^(http|https):\/\/[^ "]+$/;
    if (!regex.test(img)) {
      return "Link hình ảnh không hợp lệ!";
    }
    return "";
  }

  // Kiểm tra mô tả
  checkDescription(desc) {
    if (!desc.trim()) {
      return "Mô tả không được để trống!";
    }
    if (desc.length < 10) {
      return "Mô tả phải có ít nhất 10 ký tự!";
    }
    return "";
  }

  // Kiểm tra thương hiệu
  checkBrand(type) {
    if (!type || type.trim() === "") {
      return "Vui lòng chọn thương hiệu!";
    }
    return "";
  }
}
