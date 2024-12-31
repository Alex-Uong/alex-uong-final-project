export default class Validation {
  // Check phone name
  checkPhoneName(name, existingProducts = []) {
    if (!name.trim()) {
      return "phone name cannot be empty!";
    }
    if (name.length < 3) {
      return "phone name must be at least 3 characters long!";
    }
    const isDuplicate = existingProducts.some(
      (product) => product.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (isDuplicate) {
      return "phone name already exists!";
    }
    return "";
  }

  // Check price
  checkPrice(price) {
    if (!price.trim()) {
      return "please enter price!";
    }
    if (isNaN(price)) {
      return "price has to be number!";
    }
    if (price <= 0) {
      return "price has to be greater than 0!";
    }
    return "";
  }

  // Check screen
  checkScreen(screen) {
    if (!screen.trim()) {
      return "screen specification cannot be empty!";
    }
    return "";
  }

  // Check back camera
  checkBackCamera(backCamera) {
    if (!backCamera.trim()) {
      return "back camera specification cannot be empty!";
    }
    return "";
  }

  // Check front camera
  checkFrontCamera(frontCamera) {
    if (!frontCamera.trim()) {
      return "front camera specification cannot be empty!";
    }
    return "";
  }

  // Check image link
  checkImageLink(img) {
    if (!img.trim()) {
      return "please enter image link!";
    }
    const regex = /^(http|https):\/\/[^ "]+$/;
    if (!regex.test(img)) {
      return "invalid image link!";
    }
    return "";
  }

  // Check description
  checkDescription(desc) {
    if (!desc.trim()) {
      return "description cannot be empty!";
    }
    if (desc.length < 10) {
      return "description must be at least 10 characters long!";
    }
    return "";
  }

  // Check brand
  checkBrand(type) {
    if (!type || type.trim() === "") {
      return "please select a brand!";
    }
    return "";
  }
}
