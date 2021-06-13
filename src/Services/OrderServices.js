import axios from "axios";
import "../components/Sys/config";

var apiUrl = global.platformURI;

export class OrderServices {
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
//   createCategory(payload, id) {
//       if(id){
//         return axios
//         .post(apiUrl + `api/category/update/${id}`, payload)
//         .then((res) => res.data);
      
//       }else{
//       return axios
//       .post(apiUrl + "api/category/create", payload)
//       .then((res) => res.data);
//       }
//   }

  getAllOrderList() {
    return axios
    .get(apiUrl + "api/orders" )
    .then((res) => res.data);
  
}
// getDetailCategory(id) {
//     return axios
//     .get(apiUrl + `api/category/${id}` )
//     .then((res) => res.data);
  
// }


//   deleteCategory(id){
//     return axios
//       .delete(apiUrl + `api/category/delete/${id}`)
//       .then((res) => res.data);
//   }

}
