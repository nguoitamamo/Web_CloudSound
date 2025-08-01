"use strict";
exports.id = 826;
exports.ids = [826];
exports.modules = {

/***/ 70826:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ sendRequest)
/* harmony export */ });
const sendRequest = async (props)=>{
    let { url, method, body, // queryParams = {},
    useCredentials = false, headers = {}, nextOption = {} } = props;
    const options = {
        method: method,
        // by default setting the content-type to be json type
        headers: new Headers({
            "content-type": "application/json",
            ...headers
        }),
        body: body ? JSON.stringify(body) : null,
        ...nextOption
    };
    if (useCredentials) options.credentials = "include";
    // if (queryParams) {
    //     url = `${url}?${queryString.stringify(queryParams)}`;
    // }
    return fetch(url, options).then((res)=>{
        if (res.ok) {
            return res.json();
        } else {
            return res.json().then(function(json) {
                // to be able to access error status when you catch the error 
                return {
                    statusCode: res.status,
                    message: json?.message ?? "",
                    error: json?.error ?? ""
                };
            });
        }
    });
};


/***/ })

};
;