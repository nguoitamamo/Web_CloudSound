exports.id = 30;
exports.ids = [30];
exports.modules = {

/***/ 540:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 29368))

/***/ }),

/***/ 29368:
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
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/styles/index.js
var styles = __webpack_require__(83476);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/AppBar/index.js
var AppBar = __webpack_require__(79536);
var AppBar_default = /*#__PURE__*/__webpack_require__.n(AppBar);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Box/index.js
var Box = __webpack_require__(43872);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Toolbar/index.js
var Toolbar = __webpack_require__(74147);
var Toolbar_default = /*#__PURE__*/__webpack_require__.n(Toolbar);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/IconButton/index.js
var IconButton = __webpack_require__(48060);
var IconButton_default = /*#__PURE__*/__webpack_require__.n(IconButton);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Typography/index.js
var Typography = __webpack_require__(33987);
var Typography_default = /*#__PURE__*/__webpack_require__.n(Typography);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/InputBase/index.js
var InputBase = __webpack_require__(73392);
var InputBase_default = /*#__PURE__*/__webpack_require__.n(InputBase);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Badge/index.js
var Badge = __webpack_require__(42454);
var Badge_default = /*#__PURE__*/__webpack_require__.n(Badge);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/MenuItem/index.js
var MenuItem = __webpack_require__(88707);
var MenuItem_default = /*#__PURE__*/__webpack_require__.n(MenuItem);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Menu/index.js
var Menu = __webpack_require__(71829);
var Menu_default = /*#__PURE__*/__webpack_require__.n(Menu);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/AccountCircle.js
var AccountCircle = __webpack_require__(26858);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Mail.js
var Mail = __webpack_require__(91225);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Notifications.js
var Notifications = __webpack_require__(4301);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/MoreVert.js
var MoreVert = __webpack_require__(69700);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Container/index.js
var Container = __webpack_require__(39966);
var Container_default = /*#__PURE__*/__webpack_require__.n(Container);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(11440);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Avatar/index.js
var Avatar = __webpack_require__(95843);
var Avatar_default = /*#__PURE__*/__webpack_require__.n(Avatar);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/index.js
var node = __webpack_require__(17421);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Logout.js
var Logout = __webpack_require__(99253);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/PersonAdd.js
var PersonAdd = __webpack_require__(18310);
// EXTERNAL MODULE: ./node_modules/next-auth/react/index.js
var react = __webpack_require__(74284);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(57114);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/FavoriteBorder.js
var FavoriteBorder = __webpack_require__(76580);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/PlaylistAdd.js
var PlaylistAdd = __webpack_require__(4427);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/History.js
var History = __webpack_require__(87762);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Chat.js
var Chat = __webpack_require__(54069);
// EXTERNAL MODULE: ./src/utils/api.ts
var api = __webpack_require__(46466);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Close.js
var Close = __webpack_require__(99280);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Send.js
var Send = __webpack_require__(52121);
// EXTERNAL MODULE: ./src/components/chat/FloatingChatBox.css
var FloatingChatBox = __webpack_require__(15684);
// EXTERNAL MODULE: ./src/config/socket.ts
var socket = __webpack_require__(28539);
// EXTERNAL MODULE: ./node_modules/react-redux/dist/react-redux.mjs
var react_redux = __webpack_require__(25699);
// EXTERNAL MODULE: ./src/components/chat/message/Message.css
var Message = __webpack_require__(78090);
// EXTERNAL MODULE: ./src/components/lib/dayjs.ts
var dayjs = __webpack_require__(55959);
;// CONCATENATED MODULE: ./src/components/chat/message/message.tsx

 // 👈 import CSS thuần


function message_Message({ message }) {
    const { currentUserData } = (0,react_redux/* useSelector */.v9)((state)=>state.user);
    const { selectedChat } = (0,react_redux/* useSelector */.v9)((state)=>state.chat);
    const isLoggedInUserMessage = message.sender._id === currentUserData?._id;
    let read = false;
    if (selectedChat && selectedChat?.users?.length - 1 === message.readBy?.length) {
        read = true;
    }
    if (isLoggedInUserMessage) {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "message-row left",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("img", {
                    src: `${"http://160.25.81.159:8000"}/image/user/${message.sender.avatar}`,
                    alt: "avatar",
                    className: "avatar"
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "message-content",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "text-message receiver",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "sender-name",
                                    children: message.sender.name
                                }),
                                message.text && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "text",
                                    children: message.text
                                })
                            ]
                        }),
                        message.image && /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            src: message.image,
                            alt: "message",
                            className: "message-image receiver"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: "timestamp",
                            children: (0,dayjs/* formatDateTime */.o)(message.createdAt)
                        })
                    ]
                })
            ]
        });
    } else {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "message-row right",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "message-content",
                    children: [
                        message.text && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "text-message sender",
                            children: message.text
                        }),
                        message.image && /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            src: message.image,
                            alt: "message",
                            className: "message-image sender"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "message-footer",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "timestamp",
                                    children: (0,dayjs/* formatDateTime */.o)(message.createdAt)
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                    className: `ri-check-double-line ${read ? "read" : "unread"}`
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("img", {
                    src: `${"http://160.25.81.159:8000"}/image/user/${message.sender.avatar}`,
                    alt: "avatar",
                    className: "avatar"
                })
            ]
        });
    }
}
/* harmony default export */ const message = (message_Message);

// EXTERNAL MODULE: ./node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__(83689);
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);
;// CONCATENATED MODULE: ./src/components/chat/chat.user.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 











const chat_user_FloatingChatBox = ({ onClose })=>{
    const { data: session } = (0,react.useSession)();
    const [content, setContent] = react_default().useState("");
    const [messages, setMessages] = react_default().useState([]);
    const [loading, setLoading] = react_default().useState(false);
    const { selectedChat, chats } = (0,react_redux/* useSelector */.v9)((state)=>state.chat);
    const { currentUserData } = (0,react_redux/* useSelector */.v9)((state)=>state.user);
    const messagesEndRef = (0,react_.useRef)(null);
    const dispatch = (0,react_redux/* useDispatch */.I0)();
    const getMessages = async ()=>{
        try {
            setLoading(true);
            console.log(">> check chat", selectedChat);
            const res = await (0,api/* sendRequest */.w)({
                url: `${"http://160.25.81.159:8000/api/v1"}/messages/chat?chatID=${selectedChat?._id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.user?.access_token}`
                }
            });
            if (res?.data) setMessages(res.data);
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    };
    react_default().useEffect(()=>{
        getMessages(); // get messagess của đoạn chat giữa hai người thông qua chat trong redux
    }, [
        currentUserData
    ]);
    const onSend = async ()=>{
        try {
            if (!content) return;
            setLoading(true);
            if (!socket/* default */.Z.connect()) {
                socket/* default */.Z.connect();
            }
            // let image = "";
            // if (selectedImageFile) {
            //     image = await UploadImageToFirebaseAndReturnUrl(selectedImageFile);
            // }
            if (session?.user) {
                const socketPayload = {
                    text: content,
                    image: "",
                    socketMessageId: dayjs_min_default()().unix(),
                    chat: selectedChat?._id,
                    sender: session?.user._id
                };
                // send message using socket
                socket/* default */.Z.emit("send-new-message", socketPayload);
                setContent("");
                await (0,api/* sendRequest */.w)({
                    url: `${"http://160.25.81.159:8000/api/v1"}/messages`,
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${session?.user?.access_token}`
                    },
                    body: socketPayload
                });
                const socketMes = {
                    text: content,
                    image: "",
                    socketMessageId: dayjs_min_default()().unix(),
                    chat: selectedChat?._id,
                    sender: {
                        _id: session.user._id,
                        name: session.user.name,
                        email: session.user.email,
                        avatar: session.user.avatar
                    }
                };
                setMessages((prev)=>[
                        ...prev,
                        socketMes
                    ]);
            }
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    };
    (0,react_.useEffect)(()=>{
        if (!socket/* default */.Z.connect()) {
            socket/* default */.Z.connect();
        }
        socket/* default */.Z.on("new-message-received", (message)=>{
            if (selectedChat?._id === message.chat._id) {
                setMessages((prev)=>{
                    const isMessageAlreadyExists = prev.find((msg)=>msg.socketMessageId === message.socketMessageId);
                    if (isMessageAlreadyExists) return prev;
                    else return [
                        ...prev,
                        message
                    ];
                });
            }
        });
        // listen for user-read-all-chat-messages event
        socket/* default */.Z.on("user-read-all-chat-messages", ({ chatId, readByUserId })=>{
            if (selectedChat?._id === chatId) {
                setMessages((prev)=>{
                    const newMessages = prev.map((msg)=>{
                        if (msg.sender._id !== readByUserId && !msg.readBy.includes(readByUserId)) {
                            return {
                                ...msg,
                                readBy: [
                                    ...msg.readBy,
                                    readByUserId
                                ]
                            };
                        }
                        return msg;
                    });
                    return newMessages;
                });
            }
        });
    }, [
        selectedChat
    ]);
    (0,react_.useEffect)(()=>{
        // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        if (messagesEndRef.current) messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight + 100;
    // if (!socket.connect()) {
    //     socket.connect();
    // }
    // let unreadMessages = 0;
    // let chat = chats.find((chat) => chat._id === selectedChat?._id);
    // if (chat && chat.unreadCounts) {
    //     unreadMessages = chat?.unreadCounts[currentUserData?._id!] || 0;
    // }
    // if (unreadMessages > 0) {
    //     sendRequest<IBackendRes<any>>({
    //         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/all?chatID=${selectedChat?._id}`,
    //         method: "GET",
    //         headers: {
    //             Authorization: `Bearer ${session?.user?.access_token}`
    //         },
    //     })
    //     socket.emit("read-all-messages", { // cập nhật unread
    //         chatId: selectedChat?._id!,
    //         readByUserId: session?.user?._id!,
    //         users: selectedChat?.users
    //             .filter((user) => user._id !== session?.user?._id!)
    //             .map((user) => user._id),
    //     });
    // }
    // // set the unread messages to 0 for the selected chat
    // const newChats = chats.map((chat) => {
    //     if (chat._id === selectedChat?._id) {
    //         let chatData = { ...chat };
    //         chatData.unreadCounts = { ...chat.unreadCounts };
    //         chatData.unreadCounts[currentUserData?._id!] = 0;
    //         return chatData;
    //     } else return chat;
    // });
    // dispatch(SetChats(newChats));
    }, [
        messages
    ]);
    (0,react_.useEffect)(()=>{
        if (!socket/* default */.Z.connect()) {
            socket/* default */.Z.connect();
        }
        socket/* default */.Z.emit("typing", {
            chat: selectedChat,
            senderId: currentUserData?._id,
            senderName: currentUserData?.name.split(" ")[0]
        });
    }, [
        selectedChat,
        content
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "chat-box",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "chat-header",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "chat-user",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(node.Avatar, {
                                alt: currentUserData?.avatar,
                                src: `${"http://160.25.81.159:8000"}/image/user/${currentUserData?.avatar}`
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                children: currentUserData?.name
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(node.IconButton, {
                        size: "small",
                        onClick: onClose,
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Close/* default */.Z, {
                            style: {
                                color: "white"
                            }
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "chat-messages",
                ref: messagesEndRef,
                children: messages && messages.map((mes)=>{
                    return /*#__PURE__*/ jsx_runtime_.jsx(message, {
                        message: mes
                    });
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "chat-input",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(node.TextField, {
                        fullWidth: true,
                        size: "small",
                        placeholder: "Aa",
                        variant: "outlined",
                        value: content,
                        onChange: (e)=>setContent(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                onSend();
                            }
                        }
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(node.IconButton, {
                        color: "primary",
                        onClick: ()=>onSend(),
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Send/* default */.Z, {})
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const chat_user = (chat_user_FloatingChatBox);

// EXTERNAL MODULE: ./src/components/redux/userSlice.ts
var userSlice = __webpack_require__(95134);
// EXTERNAL MODULE: ./src/components/redux/chatSlice.ts
var chatSlice = __webpack_require__(27819);
;// CONCATENATED MODULE: ./src/components/chat/search/search.user.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 








const SearChChatUser = ({ users, setSelectedUser, setAnchorEl, search, chats })=>{
    const { data: session } = (0,react.useSession)();
    // const filteredUsers = users.filter(user =>
    //     user.name.toLowerCase().includes(search.toLowerCase())
    // );
    const { onlineUsers } = (0,react_redux/* useSelector */.v9)((state)=>state.user);
    const usedispath = (0,react_redux/* useDispatch */.I0)();
    const handleOnclickUser = async (user, chat)=>{
        const res = await (0,api/* sendRequest */.w)({
            url: `${"http://160.25.81.159:8000/api/v1"}/chats`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.user?.access_token}`
            },
            body: {
                users: [
                    session?.user._id,
                    user._id
                ],
                isGroupChat: false
            }
        });
        setSelectedUser(user);
        usedispath((0,userSlice/* SetCurrentUser */.pw)(user));
        if (res?.data === true) {
            usedispath((0,chatSlice/* SetSelectedChat */.$g)(chat));
        } else {
            usedispath((0,chatSlice/* SetSelectedChat */.$g)(res.data));
        }
        setAnchorEl(null);
        if (!socket/* default */.Z.connect()) {
            socket/* default */.Z.connect();
        }
        socket/* default */.Z.emit("read-all-messages", {
            chatId: chat?._id,
            readByUserId: session?.user?._id,
            users: chat?.users.filter((user)=>user._id !== session?.user?._id).map((user)=>user._id)
        });
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(node.List, {
        dense: true,
        children: users.map((user, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(node.ListItem, {
                button: true,
                onClick: ()=>handleOnclickUser(user, chats[index]),
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        style: {
                            display: "flex",
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(node.ListItemAvatar, {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(node.Avatar, {
                                    alt: user.name,
                                    src: `${"http://160.25.81.159:8000"}/image/user/${user.avatar}`
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        style: {
                                            margin: 0
                                        },
                                        children: user.name
                                    }),
                                    chats[index]?.lastMessage?.sender && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        style: {
                                            margin: 0,
                                            fontSize: 10
                                        },
                                        children: (chats[index].lastMessage.sender._id === session?.user?._id ? "Bạn" : chats[index].lastMessage.sender.name) + ": " + chats[index].lastMessage.text
                                    })
                                ]
                            })
                        ]
                    }),
                    session?.user && onlineUsers.includes(user._id) && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        style: {
                            background: "green",
                            height: 10,
                            width: 10,
                            borderRadius: "50%"
                        }
                    })
                ]
            }, user._id))
    });
};
/* harmony default export */ const search_user = (SearChChatUser);

;// CONCATENATED MODULE: ./src/components/chat/chat.menu.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 







function chat_menu_Chat() {
    const { data: session } = (0,react.useSession)();
    const [anchorEl, setAnchorEl] = react_.useState(null);
    const [search, setSearch] = react_.useState("");
    const open = Boolean(anchorEl);
    const [users, setUsers] = react_.useState([]);
    const [chat, setChat] = react_.useState([]);
    const [selectedUser, setSelectedUser] = react_.useState(null);
    const handleGetAllUser = async ()=>{
        const res = await (0,api/* sendRequest */.w)({
            url: `${"http://160.25.81.159:8000/api/v1"}/users/all`,
            method: "GET"
        });
        if (res?.data) {
            setUsers(res.data);
        }
    };
    const handleGetChatWithUser = async ()=>{
        const res = await (0,api/* sendRequest */.w)({
            url: `${"http://160.25.81.159:8000/api/v1"}/chats`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${session?.user?.access_token}`
            }
        });
        if (res?.data) {
            setChat(res.data);
            const allUsers = res.data.flatMap((chat)=>chat.users);
            const uniqueUsers = Array.from(new Map(allUsers.filter((user)=>user._id !== session?.user?._id).map((user)=>[
                    user._id,
                    user
                ])).values());
            setUsers(uniqueUsers);
        }
    };
    react_.useEffect(()=>{
        handleGetChatWithUser();
    }, []);
    // const handleUnReadCount = () => {
    //     let cnt = 0;
    //     chat.map((tmp: IChat) => {
    //         cnt += tmp?.unreadCounts?.length | 0;
    //     })
    //     console.log(">> check cnt", cnt);
    //     return cnt;
    // }
    const handleClick = (event)=>{
        setAnchorEl(event.currentTarget);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(node.Button, {
                id: "chat-button",
                "aria-controls": open ? "chat-menu" : undefined,
                "aria-haspopup": "true",
                "aria-expanded": open ? "true" : undefined,
                onClick: handleClick,
                children: /*#__PURE__*/ jsx_runtime_.jsx(node.IconButton, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(node.Badge, {
                        badgeContent: 0,
                        color: "error",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Chat/* default */.Z, {})
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(node.Menu, {
                id: "chat-menu",
                anchorEl: anchorEl,
                open: open,
                onClose: ()=>setAnchorEl(null),
                sx: {
                    width: 450
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        style: {
                            padding: "8px 16px",
                            width: 450
                        },
                        children: /*#__PURE__*/ jsx_runtime_.jsx(node.TextField, {
                            fullWidth: true,
                            size: "small",
                            placeholder: "T\xecm kiếm người d\xf9ng",
                            value: search,
                            onChange: (e)=>{
                                setSearch(e.target.value);
                            },
                            onClick: ()=>handleGetAllUser()
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(node.Divider, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(search_user, {
                        users: users,
                        setSelectedUser: setSelectedUser,
                        setAnchorEl: setAnchorEl,
                        search: search,
                        chats: chat
                    })
                ]
            }),
            selectedUser && /*#__PURE__*/ jsx_runtime_.jsx(chat_user, {
                onClose: ()=>setSelectedUser(null)
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/components/header/app.header.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 




























const Search = (0,styles.styled)("div")(({ theme })=>({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: (0,styles.alpha)(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: (0,styles.alpha)(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto"
        }
    }));
const SearchIconWrapper = (0,styles.styled)("div")(({ theme })=>({
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }));
const StyledInputBase = (0,styles.styled)((InputBase_default()))(({ theme })=>({
        color: "inherit",
        "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("md")]: {
                width: "300px"
            }
        }
    }));
function Header() {
    const { data: session } = (0,react.useSession)();
    const [content, setContent] = react_.useState("");
    const router = (0,navigation.useRouter)();
    const [anchorEl, setAnchorEl] = react_.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = react_.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleProfileMenuOpen = (event)=>{
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = ()=>{
        setMobileMoreAnchorEl(null);
    };
    const handleMenuClose = ()=>{
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMobileMenuOpen = (event)=>{
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleDisOnline = ()=>{
        if (session?.user) {
            if (!socket/* default */.Z.connect()) {
                socket/* default */.Z.connect();
            }
            socket/* default */.Z.emit("logout", {
                userID: session.user._id,
                socketId: socket/* default */.Z.id
            });
        }
    };
    const menuId = "primary-search-account-menu";
    const renderMenu = /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Menu_default()), {
        anchorEl: anchorEl,
        id: menuId,
        keepMounted: true,
        open: isMenuOpen,
        onClose: handleMenuClose,
        transformOrigin: {
            horizontal: "right",
            vertical: "top"
        },
        anchorOrigin: {
            horizontal: "right",
            vertical: "bottom"
        },
        slotProps: {
            paper: {
                elevation: 0,
                sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1
                    },
                    "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0
                    }
                }
            }
        },
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((MenuItem_default()), {
                sx: {
                    "a": {
                        textDecoration: "unset",
                        color: "unset"
                    }
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((Avatar_default()), {}),
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: `/profile/${session?.user?._id}`,
                        children: "Trang c\xe1 nh\xe2n"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(node.Divider, {}),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((MenuItem_default()), {
                sx: {
                    "a": {
                        textDecoration: "unset",
                        color: "unset"
                    }
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(PlaylistAdd/* default */.Z, {
                        sx: {
                            mr: 1
                        }
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: `/utils/${2}`,
                        children: "Danh s\xe1ch ph\xe1t"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((MenuItem_default()), {
                sx: {
                    "a": {
                        textDecoration: "unset",
                        color: "unset"
                    }
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(FavoriteBorder["default"], {
                        fontSize: "small",
                        sx: {
                            mr: 1
                        }
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: `/utils/${1}`,
                        children: "Danh s\xe1ch y\xeau th\xedch"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((MenuItem_default()), {
                sx: {
                    "a": {
                        textDecoration: "unset",
                        color: "unset"
                    }
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(History/* default */.Z, {
                        fontSize: "small",
                        sx: {
                            mr: 1
                        }
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: `/utils/${0}`,
                        children: "Lịch sử"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((MenuItem_default()), {
                sx: {
                    "a": {
                        textDecoration: "unset",
                        color: "unset"
                    }
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(node.ListItemIcon, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(PersonAdd/* default */.Z, {
                            fontSize: "small"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: `/utils/${4}`,
                        children: "Group"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((MenuItem_default()), {
                onClick: ()=>{
                    (0,react.signOut)(), handleDisOnline();
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(node.ListItemIcon, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Logout/* default */.Z, {
                            fontSize: "small"
                        })
                    }),
                    "Đăng xuất"
                ]
            })
        ]
    });
    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Menu_default()), {
        anchorEl: mobileMoreAnchorEl,
        anchorOrigin: {
            vertical: "top",
            horizontal: "right"
        },
        id: mobileMenuId,
        keepMounted: true,
        transformOrigin: {
            vertical: "top",
            horizontal: "right"
        },
        open: isMobileMenuOpen,
        onClose: handleMobileMenuClose,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((MenuItem_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((IconButton_default()), {
                        size: "large",
                        "aria-label": "show 4 new mails",
                        color: "inherit",
                        children: /*#__PURE__*/ jsx_runtime_.jsx((Badge_default()), {
                            badgeContent: 4,
                            color: "error",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(Mail/* default */.Z, {})
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: "Messages"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((MenuItem_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((IconButton_default()), {
                        size: "large",
                        "aria-label": "show 17 new notifications",
                        color: "inherit",
                        children: /*#__PURE__*/ jsx_runtime_.jsx((Badge_default()), {
                            badgeContent: 17,
                            color: "error",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(Notifications/* default */.Z, {})
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: "Notifications"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((MenuItem_default()), {
                onClick: handleProfileMenuOpen,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((IconButton_default()), {
                        size: "large",
                        "aria-label": "account of current user",
                        "aria-controls": "primary-search-account-menu",
                        "aria-haspopup": "true",
                        color: "inherit",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(AccountCircle/* default */.Z, {})
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: "Profile"
                    })
                ]
            })
        ]
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box["default"], {
        sx: {
            flexGrow: 1
        },
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((Container_default()), {
                children: /*#__PURE__*/ jsx_runtime_.jsx((AppBar_default()), {
                    position: "static",
                    sx: {
                        background: "white",
                        color: "black",
                        border: "2px dashed",
                        borderRadius: "5px"
                    },
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Toolbar_default()), {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                                variant: "h6",
                                noWrap: true,
                                component: "div",
                                sx: {
                                    display: {
                                        xs: "none",
                                        sm: "block",
                                        "> a": {
                                            color: "unset",
                                            textDecoration: "unset"
                                        }
                                    }
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/",
                                    children: "SoundCloud"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(node.TextField, {
                                fullWidth: true,
                                label: "T\xecm kiếm...",
                                value: content,
                                variant: "standard",
                                sx: {
                                    width: "40%",
                                    ml: 4,
                                    mb: 3
                                },
                                onChange: (e)=>setContent(e.target.value),
                                onKeyDown: (e)=>{
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        router.push(`/search/${content}`);
                                    }
                                }
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Box["default"], {
                                sx: {
                                    flexGrow: 1
                                }
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Box["default"], {
                                sx: {
                                    display: {
                                        xs: "none",
                                        md: "flex"
                                    },
                                    alignItems: "center",
                                    gap: "15px",
                                    "> a": {
                                        color: "unset",
                                        textDecoration: "unset"
                                    },
                                    cursor: "pointer"
                                },
                                children: session ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/track/upload",
                                            children: "Upload"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(chat_menu_Chat, {}),
                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: `/profile/${session?.user?._id}`,
                                            children: session?.user?.name
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx((Avatar_default()), {
                                            sx: {
                                                width: 32,
                                                height: 32
                                            },
                                            onClick: handleProfileMenuOpen,
                                            src: `${"http://160.25.81.159:8000"}/image/user/${session?.user?.avatar}`
                                        })
                                    ]
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/auth/signin",
                                        children: "Đăng nhập"
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Box["default"], {
                                sx: {
                                    display: {
                                        xs: "flex",
                                        md: "none"
                                    }
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx((IconButton_default()), {
                                    size: "large",
                                    "aria-label": "show more",
                                    "aria-controls": mobileMenuId,
                                    "aria-haspopup": "true",
                                    onClick: handleMobileMenuOpen,
                                    color: "inherit",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(MoreVert/* default */.Z, {})
                                })
                            })
                        ]
                    })
                })
            }),
            renderMobileMenu,
            renderMenu
        ]
    });
}

;// CONCATENATED MODULE: ./src/app/(user)/layout.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 

function RootLayout({ children }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Header, {}),
            children
        ]
    });
}


/***/ }),

/***/ 55959:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   o: () => (/* binding */ formatDateTime)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(83689);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(86225);
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dayjs_locale_vi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76211);
/* harmony import */ var dayjs_locale_vi__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs_locale_vi__WEBPACK_IMPORTED_MODULE_2__);


 // hoặc 'en' nếu bạn muốn tiếng Anh
dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend((dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_1___default()));
dayjs__WEBPACK_IMPORTED_MODULE_0___default().locale("vi");
const formatDateTime = (date)=>{
    // date is less than 1min ago , return "just now"
    // date is less than 1hr ago , return "x minutes ago"
    // date is less than 1day ago , return "hh:mm A"
    // date is greater than 1day ago , return "DDD MMM DD"
    const now = dayjs__WEBPACK_IMPORTED_MODULE_0___default()();
    const messageDate = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date);
    if (now.diff(messageDate, "minute") < 1) return "now";
    if (now.diff(messageDate, "hour") < 1) return messageDate.format("hh:mm A");
    if (now.diff(messageDate, "day") < 1) return messageDate.format("hh:mm A");
    if (now.diff(messageDate, "year") < 1) return messageDate.format("MMM DD hh:mm A");
    return messageDate.format("DDD MM YYYY hh:mm A");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((dayjs__WEBPACK_IMPORTED_MODULE_0___default()));


/***/ }),

/***/ 28539:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const { io } = __webpack_require__(24670);
const socket = io("http://localhost:8000", {
    autoConnect: false,
    withCredentials: true
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);


/***/ }),

/***/ 46466:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ }),

/***/ 91083:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61363);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`D:\Web_Sound\nextjs-mui-ts-starter\src\app\(user)\layout.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ }),

/***/ 15684:
/***/ (() => {



/***/ }),

/***/ 78090:
/***/ (() => {



/***/ })

};
;