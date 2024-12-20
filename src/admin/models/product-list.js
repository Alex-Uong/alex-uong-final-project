class PhoneList {
  constructor() {
    this.arr = [];
  }

  // Thêm dữ liệu vào danh sách phone
  setPhones(phones) {
    this.arr = phones; // Gán dữ liệu danh sách sản phẩm vào this.arr
  }

  searchPhone(keyword) {
    let result = [];
    const keywordLowerCase = keyword.toLowerCase();

    for (let i = 0; i < this.arr.length; i++) {
      const phone = this.arr[i];
      const phoneNameLowerCase = phone.name.toLowerCase();

      if (phoneNameLowerCase.indexOf(keywordLowerCase) !== -1) {
        result.push(phone);
      }
    }
    return result;
  }
}

export default PhoneList;
