"use strict";
exports.id = 858;
exports.ids = [858];
exports.modules = {

/***/ 59858:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46466);
/* harmony import */ var _mui_icons_material_FavoriteBorder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(76580);
/* harmony import */ var _mui_icons_material_Favorite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8886);
/* harmony import */ var _mui_icons_material_ThumbDownOffAlt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(43755);
/* harmony import */ var _mui_icons_material_ThumbDown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(33638);
/* harmony import */ var _mui_icons_material_Visibility__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(58386);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17421);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_icons_material_PlaylistAdd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4427);
/* __next_internal_client_entry_do_not_use__ default auto */ 









const StatusSong = ({ song, session })=>{
    const [likeCount, setLikeCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(song?.like?.length || 0);
    const [dislikeCount, setDisLikeCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(song?.dislike?.length || 0);
    const [viewCount, setViewCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(song?.totalListen?.length || 0);
    const [isLiked, setIsLiked] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isDisliked, setIsDisliked] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!session) return;
        const userId = session._id;
        if (song?.like?.includes(userId)) {
            setIsLiked(true);
        }
        if (song?.dislike?.includes(userId)) {
            setIsDisliked(true);
        }
    }, [
        session,
        song
    ]);
    const handleClickLike = async ()=>{
        try {
            const res = await (0,_utils_api__WEBPACK_IMPORTED_MODULE_2__/* .sendRequest */ .w)({
                url: `${"http://160.25.81.159:8000/api/v1"}/songs/like/${song?._id}`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            });
            if (isDisliked) setDisLikeCount(dislikeCount - 1);
            if (res?.data) {
                setLikeCount(res?.data?.length || 0);
                setIsLiked(true);
                setIsDisliked(false); // bỏ dislike nếu đã like
            }
        } catch (error) {
            console.error("Lỗi khi like b\xe0i h\xe1t", error);
        }
    };
    const handleClickDisLike = async ()=>{
        try {
            const res = await (0,_utils_api__WEBPACK_IMPORTED_MODULE_2__/* .sendRequest */ .w)({
                url: `${"http://160.25.81.159:8000/api/v1"}/songs/dislike/${song?._id}`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            });
            if (isLiked) setLikeCount(likeCount - 1);
            if (res?.data) {
                setDisLikeCount(res?.data?.length || 0);
                setIsDisliked(true);
                setIsLiked(false); // bỏ like nếu đã dislike
            }
        } catch (error) {
            console.error("Lỗi khi dislike b\xe0i h\xe1t", error);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {
        sx: {
            display: "flex",
            gap: 4,
            mt: 2
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {
                sx: {
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer"
                },
                children: [
                    isLiked ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material_Favorite__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                        fontSize: "small",
                        sx: {
                            color: "red"
                        },
                        onClick: handleClickLike
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material_FavoriteBorder__WEBPACK_IMPORTED_MODULE_5__["default"], {
                        fontSize: "small",
                        onClick: handleClickLike
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: likeCount
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {
                sx: {
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer"
                },
                children: [
                    isDisliked ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material_ThumbDown__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                        fontSize: "small",
                        sx: {
                            color: "blue"
                        },
                        onClick: handleClickDisLike
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material_ThumbDownOffAlt__WEBPACK_IMPORTED_MODULE_7__["default"], {
                        fontSize: "small",
                        onClick: handleClickDisLike
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: dislikeCount
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {
                sx: {
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material_Visibility__WEBPACK_IMPORTED_MODULE_8__["default"], {
                        fontSize: "small"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: viewCount
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Tooltip, {
                title: "Th\xeam v\xe0o danh s\xe1ch ph\xe1t",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
                    sx: {
                        // position: 'absolute',
                        // top: 8,
                        // right: 8,
                        // background: 'rgba(255, 255, 255, 0.7)',
                        "&:hover": {
                            background: "white"
                        }
                    },
                    size: "small",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material_PlaylistAdd__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                        fontSize: "small"
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StatusSong);


/***/ })

};
;