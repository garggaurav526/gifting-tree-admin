import axios from "axios";
import "../components/Sys/config";

var apiUrl = global.platformURI;

export class ProductServices {
  constructor() {
    axios.interceptors.request.use(
      function (config) {
        let token = localStorage.getItem("ssoToken");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        console.log("error.response.status", error);
        return error;
      }
    );
  }
  createProduct(payload, id) {
      if(id){
        return axios
        .post(apiUrl + `api/product/update/${id}`, payload)
        .then((res) => res.data);
      
      }else{
      return axios
      .post(apiUrl + "api/product/create", payload)
      .then((res) => res.data);
      }
  }

  getAllProductList() {
    return axios
    .get(apiUrl + "api/products" )
    .then((res) => res.data);
  
}
getAllCategoryWithSubCategory() {
  return axios
  .get(apiUrl + "api/categories-all" )
  .then((res) => res.data);

}
getDetailProduct(id) {
    return axios
    .get(apiUrl + `api/product/${id}` )
    .then((res) => res.data);
  
}


  deleteProduct(id){
    return axios
      .delete(apiUrl + `api/product/delete/${id}`)
      .then((res) => res.data);
  }

}
