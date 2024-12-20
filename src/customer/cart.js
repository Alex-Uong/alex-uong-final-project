class Cart {
  constructor() {
    this.array = [];
  }

  // Ham them cart item vao cart
  addToCart(item) {
    // Kiem tra xem san pham da co trong cart chua
    const existingItem = this.array.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Neu co, tang so luong san pham
      existingItem.quantity++;
    } else {
      // Neu chua, them vao mang cart voi so luong sp la 1
      this.array.push(item);
    }
  }

  // Ham tim index cuar id san pham trong cart
  findIndexProduct(id) {
    let index = -1;
    for (let i = 0; i < this.array.length; i++) {
      const product = this.array[i];
      if (product.id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  // Ham xoa san pham trong cart
  removeProduct(id) {
    const index = this.findIndexProduct(id);

    // Xoa san pham
    if (index !== -1) {
      this.array.splice(index, 1);
    }
  }

  // Ham tang so luong san pham
  increaseQuantity(id) {
    const index = this.findIndexProduct(id);

    if (index !== -1) {
      this.array[index].quantity++;
    }
  }

  // Ham giam so luong san pham
  decreaseQuantity(id) {
    const index = this.findIndexProduct(id);

    if (index !== -1) {
      this.array[index].quantity--;

      // Kiem tra so luong co ve 0 chua
      if (this.array[index].quantity <= 0) {
        const isConfirmed = confirm("Bạn có muốn xóa sản phẩm này không?");
        if (isConfirmed) {
          this.array.splice(index, 1);
        } else {
          this.array[index].quantity = 1;
        }
      }
    }
  }

  // Ham tinh tong tien
  getTotal() {
    let total = 0;
    if (this.array.length > 0) {
      for (let i = 0; i < this.array.length; i++) {
        total += this.array[i].quantity * this.array[i].price;
      }
    } else {
      total = 0;
    }

    return total;
  }

  // Ham xoa tat ca san pham trong cart
  clearCart() {
    this.array = [];
  }
}

export default Cart;
