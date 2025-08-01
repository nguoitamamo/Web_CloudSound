"use strict";
exports.id = 889;
exports.ids = [889];
exports.modules = {

/***/ 82889:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  GET: () => (/* binding */ handler),
  POST: () => (/* binding */ handler),
  authOptions: () => (/* binding */ authOptions)
});

// EXTERNAL MODULE: ./node_modules/next-auth/index.js
var next_auth = __webpack_require__(49861);
var next_auth_default = /*#__PURE__*/__webpack_require__.n(next_auth);
// EXTERNAL MODULE: ./node_modules/next-auth/providers/github.js
var github = __webpack_require__(26199);
// EXTERNAL MODULE: ./src/utils/api.ts
var api = __webpack_require__(70826);
// EXTERNAL MODULE: ./node_modules/next-auth/providers/credentials.js
var credentials = __webpack_require__(42446);
// EXTERNAL MODULE: ./node_modules/next-auth/providers/google.js
var google = __webpack_require__(51989);
// EXTERNAL MODULE: ./node_modules/next-auth/providers/facebook.js
var facebook = __webpack_require__(86576);
;// CONCATENATED MODULE: ./src/config/socket.ts
const { io } = __webpack_require__(43798);
const socket = io("http://localhost:8000", {
    autoConnect: false,
    withCredentials: true
});
/* harmony default export */ const config_socket = (socket);

;// CONCATENATED MODULE: ./src/app/api/auth/[...nextauth]/route.ts







const authOptions = {
    // Configure one or more authentication providers
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        (0,credentials/* default */.Z)({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {
                    label: "Email",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials, req) {
                const res = await (0,api/* sendRequest */.w)({
                    url: `${"http://160.25.81.159:8000/api/v1"}/auth/login`,
                    method: "POST",
                    body: {
                        username: credentials?.username,
                        password: credentials?.password
                    }
                });
                // If no error and we have user data, return it
                if (res && res.data) {
                    return res.data;
                } else {
                    throw new Error(res?.message);
                }
            // if (!res?.error) {
            //     const router = useRouter(),
            //     router.push('/');
            // }
            // Return null if user data could not be retrieved
            }
        }),
        (0,google/* default */.Z)({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        (0,facebook/* default */.Z)({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "email"
                }
            }
        }),
        (0,github/* default */.Z)({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        async jwt ({ token, user, account, profile, trigger }) {
            if (trigger === "signIn" && account?.provider !== "credentials") {
                /// đăng nhập với người dùng bằng github để lấy token
                const res = await (0,api/* sendRequest */.w)({
                    url: `${"http://160.25.81.159:8000/api/v1"}/auth/social`,
                    method: "POST",
                    body: {
                        type: account?.provider.toLocaleUpperCase(),
                        username: user.email
                    }
                });
                if (res.data) {
                    token.access_token = res.data?.access_token;
                    token._id = res.data?._id;
                    token.name = res.data?.name;
                    token.email = res.data?.email;
                    token.avatar = res.data?.avatar;
                    token.typeLogin = res.data?.typeLogin;
                    token.followers = res.data?.followers;
                    token.following = res.data?.following;
                    token.role = res?.data?.role;
                    token.shared = res?.data?.shared;
                }
            }
            if (trigger === "signIn" && account?.provider === "credentials") {
                //@ts-ignore
                token.access_token = user?.access_token;
                //@ts-ignore
                token._id = user?._id;
                //@ts-ignore
                token.name = user?.name;
                //@ts-ignore
                token.email = user?.email;
                //@ts-ignore
                token.avatar = user?.avatar;
                //@ts-ignore
                token.typeLogin = user?.typeLogin;
                //@ts-ignore
                token.followers = user?.followers;
                //@ts-ignore
                token.following = user?.following;
                //@ts-ignore
                token.role = user?.role;
                //@ts-ignore
                token.shared = user?.shared;
            }
            return token;
        },
        async session ({ session, token, user }) {
            if (token) {
                //@ts-ignore
                session.user.access_token = token.access_token;
                //@ts-ignore
                session.user._id = token._id;
                //@ts-ignore
                session.user.name = token.name;
                //@ts-ignore
                session.user.email = token.email;
                //@ts-ignore
                session.user.avatar = token.avatar;
                //@ts-ignore
                session.user.typeLogin = token.typeLogin;
                //@ts-ignore
                session.user.followers = token.followers;
                //@ts-ignore
                session.user.following = token.following;
                //@ts-ignore
                session.user.role = token.role;
                //@ts-ignore
                session.user.shared = token.shared;
                config_socket.on("connect", ()=>{
                    session.user.socketId = config_socket.id;
                    config_socket.emit("join_room", {
                        roomName: session.user._id,
                        user: {
                            socketId: session.user.socketId,
                            _id: session.user._id,
                            name: session.user.name,
                            avatar: session.user.avatar
                        }
                    });
                });
            }
            return session;
        }
    }
};
const handler = next_auth_default()(authOptions);



/***/ })

};
;