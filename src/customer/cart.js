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
}

export default Cart;
