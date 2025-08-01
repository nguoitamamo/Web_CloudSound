exports.id = 661;
exports.ids = [661];
exports.modules = {

/***/ 10456:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 31232, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 52987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 50831, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 56926, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 44282, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 16505, 23))

/***/ }),

/***/ 45103:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 15622));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 17421, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 98557));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 73475));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 61290));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 63310));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 92509));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 6722))

/***/ }),

/***/ 15622:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NextAuth)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74284);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ default auto */ 

function NextAuth({ children }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_auth_react__WEBPACK_IMPORTED_MODULE_1__.SessionProvider, {
        children: children
    });
}


/***/ }),

/***/ 63310:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_nprogress_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50119);
/* __next_internal_client_entry_do_not_use__ default auto */ 

const ProgressProviders = ({ children })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_nprogress_bar__WEBPACK_IMPORTED_MODULE_1__/* .AppProgressBar */ .Cd, {
                height: "2px",
                color: "#1d1d14ff",
                options: {
                    showSpinner: false
                },
                shallowRouting: true
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProgressProviders);


/***/ }),

/***/ 16002:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ Toast)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17421);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



// https://mui.com/material-ui/react-snackbar/#consecutive-snackbars
const Toast = ({ message, onExited, autoHideDuration, ...props })=>{
    const [open, setOpen] = react__WEBPACK_IMPORTED_MODULE_1__.useState(true);
    const handleClose = (_event, reason)=>{
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Snackbar, {
        open: open,
        onClose: handleClose,
        TransitionProps: {
            onExited
        },
        anchorOrigin: {
            vertical: "top",
            horizontal: "right"
        },
        autoHideDuration: autoHideDuration ?? 3000,
        ...props,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Alert, {
            severity: message.severity,
            children: message.message
        })
    }, message.key);
};


/***/ }),

/***/ 6722:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastContext: () => (/* binding */ ToastContext),
/* harmony export */   ToastProvider: () => (/* binding */ ToastProvider),
/* harmony export */   useToast: () => (/* binding */ useToast)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16002);
/* __next_internal_client_entry_do_not_use__ ToastContext,ToastProvider,useToast auto */ 


const ToastContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const ToastProvider = ({ children, ...props })=>{
    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const removeMessage = (key)=>setMessages((arr)=>arr.filter((m)=>m.key !== key));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ToastContext.Provider, {
        value: {
            addMessage (message) {
                setMessages((arr)=>[
                        ...arr,
                        message
                    ]);
            }
        },
        children: [
            children,
            messages.map((m)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Toast__WEBPACK_IMPORTED_MODULE_2__/* .Toast */ .F, {
                    message: m,
                    onExited: ()=>removeMessage(m.key),
                    ...props
                }, m.key))
        ]
    });
};
const useToast = ()=>{
    const { addMessage } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ToastContext);
    const show = (message, options)=>{
        addMessage({
            message,
            ...options,
            key: new Date().getTime()
        });
    };
    return {
        show,
        info (message) {
            show(message, {
                severity: "info"
            });
        },
        success (message) {
            show(message, {
                severity: "success"
            });
        },
        warning (message) {
            show(message, {
                severity: "warning"
            });
        },
        error (message) {
            show(message, {
                severity: "error"
            });
        }
    };
};


/***/ }),

/***/ 27819:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $g: () => (/* binding */ SetSelectedChat),
/* harmony export */   ZP: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export SetChats */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73020);

const chatSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__/* .createSlice */ .oM)({
    name: "chat",
    initialState: {
        chats: [],
        selectedChat: null
    },
    reducers: {
        SetChats: (state, action)=>{
            state.chats = action.payload;
        },
        SetSelectedChat: (state, action)=>{
            state.selectedChat = action.payload;
        }
    }
});
const { SetChats, SetSelectedChat } = chatSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chatSlice);


/***/ }),

/***/ 92509:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ redux_provider)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/react-redux/dist/react-redux.mjs
var react_redux = __webpack_require__(25699);
// EXTERNAL MODULE: ./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs + 4 modules
var redux_toolkit_modern = __webpack_require__(73020);
// EXTERNAL MODULE: ./src/components/redux/chatSlice.ts
var chatSlice = __webpack_require__(27819);
// EXTERNAL MODULE: ./src/components/redux/userSlice.ts
var userSlice = __webpack_require__(95134);
;// CONCATENATED MODULE: ./src/components/redux/store.ts



const store = (0,redux_toolkit_modern/* configureStore */.xC)({
    reducer: {
        user: userSlice/* default */.ZP.reducer,
        chat: chatSlice/* default */.ZP.reducer
    }
});
/* harmony default export */ const redux_store = (store);

;// CONCATENATED MODULE: ./src/components/redux/redux-provider.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 



function ReduxProvider({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(react_redux/* Provider */.zt, {
        store: redux_store,
        children: children
    });
}
/* harmony default export */ const redux_provider = (ReduxProvider);


/***/ }),

/***/ 95134:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZP: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   cx: () => (/* binding */ SetOnlineUsers),
/* harmony export */   pw: () => (/* binding */ SetCurrentUser)
/* harmony export */ });
/* unused harmony export SetCurrentUserId */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73020);

const userSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__/* .createSlice */ .oM)({
    name: "user",
    initialState: {
        currentUserData: null,
        currentUserId: "",
        onlineUsers: []
    },
    reducers: {
        SetCurrentUser: (state, action)=>{
            state.currentUserData = action.payload;
        },
        SetCurrentUserId: (state, action)=>{
            state.currentUserId = action.payload;
        },
        SetOnlineUsers: (state, action)=>{
            state.onlineUsers = action.payload;
        }
    }
});
const { SetCurrentUser, SetCurrentUserId, SetOnlineUsers } = userSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userSlice);


/***/ }),

/***/ 98557:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ThemeRegistry)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/styles/index.js
var styles = __webpack_require__(83476);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/CssBaseline/index.js
var CssBaseline = __webpack_require__(98331);
// EXTERNAL MODULE: ./node_modules/@emotion/cache/dist/emotion-cache.esm.js + 7 modules
var emotion_cache_esm = __webpack_require__(68941);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(57114);
// EXTERNAL MODULE: ./node_modules/@emotion/react/dist/emotion-element-6bdfffb2.esm.js + 1 modules
var emotion_element_6bdfffb2_esm = __webpack_require__(7904);
;// CONCATENATED MODULE: ./src/components/theme-registry/emotion.cache.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 




// Adapted from https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
function NextAppDirEmotionCacheProvider(props) {
    const { options, CacheProvider = emotion_element_6bdfffb2_esm.C, children } = props;
    const [registry] = react_.useState(()=>{
        const cache = (0,emotion_cache_esm["default"])(options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted = [];
        cache.insert = (...args)=>{
            const [selector, serialized] = args;
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push({
                    name: serialized.name,
                    isGlobal: !selector
                });
            }
            return prevInsert(...args);
        };
        const flush = ()=>{
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return {
            cache,
            flush
        };
    });
    (0,navigation.useServerInsertedHTML)(()=>{
        const inserted = registry.flush();
        if (inserted.length === 0) {
            return null;
        }
        let styles = "";
        let dataEmotionAttribute = registry.cache.key;
        const globals = [];
        inserted.forEach(({ name, isGlobal })=>{
            const style = registry.cache.inserted[name];
            if (typeof style !== "boolean") {
                if (isGlobal) {
                    globals.push({
                        name,
                        style
                    });
                } else {
                    styles += style;
                    dataEmotionAttribute += ` ${name}`;
                }
            }
        });
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Fragment, {
            children: [
                globals.map(({ name, style })=>/*#__PURE__*/ jsx_runtime_.jsx("style", {
                        "data-emotion": `${registry.cache.key}-global ${name}`,
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML: {
                            __html: style
                        }
                    }, name)),
                styles && /*#__PURE__*/ jsx_runtime_.jsx("style", {
                    "data-emotion": dataEmotionAttribute,
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML: {
                        __html: styles
                    }
                })
            ]
        });
    });
    return /*#__PURE__*/ jsx_runtime_.jsx(CacheProvider, {
        value: registry.cache,
        children: children
    });
}

// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"src\\components\\theme-registry\\theme.ts","import":"Roboto","arguments":[{"weight":["300","400","500","700"],"subsets":["latin"],"display":"swap"}],"variableName":"roboto"}
var target_path_src_components_theme_registry_theme_ts_import_Roboto_arguments_weight_300_400_500_700_subsets_latin_display_swap_variableName_roboto_ = __webpack_require__(35858);
var target_path_src_components_theme_registry_theme_ts_import_Roboto_arguments_weight_300_400_500_700_subsets_latin_display_swap_variableName_roboto_default = /*#__PURE__*/__webpack_require__.n(target_path_src_components_theme_registry_theme_ts_import_Roboto_arguments_weight_300_400_500_700_subsets_latin_display_swap_variableName_roboto_);
;// CONCATENATED MODULE: ./src/components/theme-registry/theme.ts


const theme = (0,styles.createTheme)({
    palette: {
        mode: "light"
    },
    typography: {
        fontFamily: (target_path_src_components_theme_registry_theme_ts_import_Roboto_arguments_weight_300_400_500_700_subsets_latin_display_swap_variableName_roboto_default()).style.fontFamily
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: ({ ownerState })=>({
                        ...ownerState.severity === "info" && {
                            backgroundColor: "#60a5fa"
                        }
                    })
            }
        }
    }
});
/* harmony default export */ const theme_registry_theme = (theme);

;// CONCATENATED MODULE: ./src/components/theme-registry/theme.registry.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 





function ThemeRegistry({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(NextAppDirEmotionCacheProvider, {
        options: {
            key: "mui"
        },
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(styles.ThemeProvider, {
            theme: theme_registry_theme,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(CssBaseline["default"], {}),
                children
            ]
        })
    });
}


/***/ }),

/***/ 73475:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SongProvider: () => (/* binding */ SongProvider),
/* harmony export */   useSongContext: () => (/* binding */ useSongContext)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ SongProvider,useSongContext auto */ 

const SongContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const SongProvider = ({ children })=>{
    const [currentSong, setCurrentSong] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SongContext.Provider, {
        value: {
            currentSong,
            setCurrentSong
        },
        children: children
    });
};
// Hook sử dụng context
const useSongContext = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SongContext);
    if (!context) {
        throw new Error("useSongContext must be used within a SongProvider");
    }
    return context;
};


/***/ }),

/***/ 61290:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WaveSurferProvider: () => (/* binding */ WaveSurferProvider),
/* harmony export */   useWaveSurfer: () => (/* binding */ useWaveSurfer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ WaveSurferProvider,useWaveSurfer auto */ 

const WaveSurferContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const WaveSurferProvider = ({ children })=>{
    const wavesurferRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(WaveSurferContext.Provider, {
        value: {
            wavesurferRef
        },
        children: children
    });
};
const useWaveSurfer = ()=>{
    const ctx = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(WaveSurferContext);
    if (!ctx) throw new Error("useWaveSurfer must be used within WaveSurferProvider");
    return ctx;
};


/***/ }),

/***/ 49425:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(61363);
;// CONCATENATED MODULE: ./src/components/theme-registry/theme.registry.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`D:\Web_Sound\nextjs-mui-ts-starter\src\components\theme-registry\theme.registry.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const theme_registry = (__default__);
;// CONCATENATED MODULE: ./src/app/(user)/lib/next.auth.wrapper.tsx

const next_auth_wrapper_proxy = (0,module_proxy.createProxy)(String.raw`D:\Web_Sound\nextjs-mui-ts-starter\src\app\(user)\lib\next.auth.wrapper.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: next_auth_wrapper_esModule, $$typeof: next_auth_wrapper_$$typeof } = next_auth_wrapper_proxy;
const next_auth_wrapper_default_ = next_auth_wrapper_proxy.default;


/* harmony default export */ const next_auth_wrapper = (next_auth_wrapper_default_);
;// CONCATENATED MODULE: ./src/components/track/context.wavetrack.tsx

const context_wavetrack_proxy = (0,module_proxy.createProxy)(String.raw`D:\Web_Sound\nextjs-mui-ts-starter\src\components\track\context.wavetrack.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: context_wavetrack_esModule, $$typeof: context_wavetrack_$$typeof } = context_wavetrack_proxy;
const context_wavetrack_default_ = context_wavetrack_proxy.default;

const e0 = context_wavetrack_proxy["WaveSurferProvider"];

const e1 = context_wavetrack_proxy["useWaveSurfer"];

// EXTERNAL MODULE: ./node_modules/@mui/material/node/index.js
var node = __webpack_require__(94541);
;// CONCATENATED MODULE: ./src/components/lib/ProgressBarProvider.tsx

const ProgressBarProvider_proxy = (0,module_proxy.createProxy)(String.raw`D:\Web_Sound\nextjs-mui-ts-starter\src\components\lib\ProgressBarProvider.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: ProgressBarProvider_esModule, $$typeof: ProgressBarProvider_$$typeof } = ProgressBarProvider_proxy;
const ProgressBarProvider_default_ = ProgressBarProvider_proxy.default;


/* harmony default export */ const ProgressBarProvider = (ProgressBarProvider_default_);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/react.shared-subset.js
var react_shared_subset = __webpack_require__(62947);
;// CONCATENATED MODULE: ./src/components/lib/toast/Toast.tsx



// https://mui.com/material-ui/react-snackbar/#consecutive-snackbars
const Toast = ({ message, onExited, autoHideDuration, ...props })=>{
    const [open, setOpen] = React.useState(true);
    const handleClose = (_event, reason)=>{
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    return /*#__PURE__*/ _jsx(Snackbar, {
        open: open,
        onClose: handleClose,
        TransitionProps: {
            onExited
        },
        anchorOrigin: {
            vertical: "top",
            horizontal: "right"
        },
        autoHideDuration: autoHideDuration ?? 3000,
        ...props,
        children: /*#__PURE__*/ _jsx(Alert, {
            severity: message.severity,
            children: message.message
        })
    }, message.key);
};

;// CONCATENATED MODULE: ./src/components/lib/toast/useToast.tsx

const useToast_proxy = (0,module_proxy.createProxy)(String.raw`D:\Web_Sound\nextjs-mui-ts-starter\src\components\lib\toast\useToast.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: useToast_esModule, $$typeof: useToast_$$typeof } = useToast_proxy;
const useToast_default_ = useToast_proxy.default;

const useToast_e0 = useToast_proxy["ToastContext"];

const useToast_e1 = useToast_proxy["ToastProvider"];

const e2 = useToast_proxy["useToast"];

;// CONCATENATED MODULE: ./src/components/lib/toast/index.ts



;// CONCATENATED MODULE: ./src/components/track/context.viewtrack.tsx

const context_viewtrack_proxy = (0,module_proxy.createProxy)(String.raw`D:\Web_Sound\nextjs-mui-ts-starter\src\components\track\context.viewtrack.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: context_viewtrack_esModule, $$typeof: context_viewtrack_$$typeof } = context_viewtrack_proxy;
const context_viewtrack_default_ = context_viewtrack_proxy.default;

const context_viewtrack_e0 = context_viewtrack_proxy["SongProvider"];

const context_viewtrack_e1 = context_viewtrack_proxy["useSongContext"];

;// CONCATENATED MODULE: ./src/components/redux/redux-provider.tsx

const redux_provider_proxy = (0,module_proxy.createProxy)(String.raw`D:\Web_Sound\nextjs-mui-ts-starter\src\components\redux\redux-provider.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: redux_provider_esModule, $$typeof: redux_provider_$$typeof } = redux_provider_proxy;
const redux_provider_default_ = redux_provider_proxy.default;


/* harmony default export */ const redux_provider = (redux_provider_default_);
;// CONCATENATED MODULE: ./src/app/layout.tsx









function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
            children: /*#__PURE__*/ jsx_runtime_.jsx(theme_registry, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(ProgressBarProvider, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(next_auth_wrapper, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(e0, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx(redux_provider, {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(context_viewtrack_e0, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(useToast_e1, {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(node.Container, {
                                            children: children
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    });
}


/***/ }),

/***/ 73881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80085);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"16x16"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ })

};
;