// 'use client'
// import { useSession } from "next-auth/react";
// import { createContext, useContext, useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";

// interface ISocketContext {

// }


// export const SocketContext = createContext<ISocketContext | null>(null)

// export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {


//     const { data: session } = useSession()
//     const [socket, setSocket] = useState<Socket | null>(null)
//     const [isSocketConnect, SetIsSocketConnect] = useState(false);



//     useEffect(() => {
//         const newSocket = io()

//         setSocket(newSocket);
//         return () => {
//             newSocket.disconnect()
//         }


//     }, [session?.user])


//     useEffect(() => {
//         if (socket === null) return;

//         if (socket.connected) {
//             onConnect()
//         }

//         function onConnect() {
//             SetIsSocketConnect(true)
//         }
//         function onDisConnect() {
//             SetIsSocketConnect(false);
//         }

//         socket.on('connect', onConnect)
//         socket.on('disconnect', onDisConnect)

//         return () => {
//             socket.off('connect', onConnect)
//             socket.off('disconnect', onDisConnect)
//         }


//     }, [])


//     return (
//         <SocketContext.Provider value={{}}>
//             {children}
//         </SocketContext.Provider>
//     )
// }


// export const useSocket = () => {
//     const context = useContext(SocketContext);

//     if (!context) {
//         throw new Error('useSocket must be used withiin a SockketProvider')
//     }


//     return context;
// }