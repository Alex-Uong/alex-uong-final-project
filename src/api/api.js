class Api {
  fetchData() {
    const promise = axios({
      url: "https://675a9ba6099e3090dbe54343.mockapi.io/capstone-js",
      method: "GET",
    });

    return promise;
  }
}

export default new Api();
