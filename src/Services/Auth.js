import "../components/Sys/config";
var apiUrl = global.platformURI;

export const authServices = {
    userLogin,
   
};

function userLogin(payload) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    };
    console.log('requestOptions', requestOptions);
    return fetch(apiUrl+"api/auth/login", requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

// function forgotPassword(payload) {

//     const requestOptions = {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(payload)
//     };
//     console.log('requestOptions', requestOptions);
//     return fetch(apiUrl+"auth/user/forgot_password/", requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             return user;
//         });
// }

// function verifyEmail(token){
//     const requestOptions = {
//         method: 'GET',
//         headers: {'Content-Type': 'application/json'},
//         // body: JSON.stringify(payload)
//     };
//     console.log('requestOptions', requestOptions);
//     return fetch(apiUrl+`auth/verify_mail/${token}`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             return user;
//         });
//     // return axios.get(apiUrl+`auth/verify_mail/${token}`)
//     //     .then(res => res.data)
// }

// function resetPassword(payload, token) {

//     const requestOptions = {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(payload)
//     };
//     console.log('requestOptions', requestOptions);
//     return fetch(apiUrl+`auth/user/reset_password/${token}`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             return user;
//         });
// }
// function userSignUp(payload) {
//     const requestOptions = {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(payload)
//     };
//     console.log('requestOptions', requestOptions);
//     return fetch(apiUrl+"auth/user/signup/", requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             return user;
//         });
// }



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
            }

            const error = (data) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
