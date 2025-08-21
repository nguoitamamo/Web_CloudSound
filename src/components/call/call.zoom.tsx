'use client';

import socket from "@/config/socket";
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { useSession } from 'next-auth/react';

// interface PeerData {
//     peerConnection: Peer.//;
//     stream: MediaStream | undefined;
//     userID: string;
//     socketID: string;
// }

const CallScreenZoom = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    const localStream = useRef<MediaStream | null>(null);
    const peerConnections = useRef<{ [socketID: string]: PeerData }>({});

    const searchParams = useSearchParams();
    const zoomID = searchParams.get('zoomID');
    const chatID = searchParams.get('chatID');
    const { data: session } = useSession();

    useEffect(() => {
        if (!session?.user?._id || !zoomID) return;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            localStream.current = stream;

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }


        });

        if (!socket.connect()) {
            socket.connect();
        }

        socket.emit("join-zoom", {
            zoomID,
            userID: session.user._id,
            chatID,
        });

        socket.on("conn-prepare", ({ connUserSocketId }: any) => {
            if (connUserSocketId === socket.id) return;
            prepareNewPeerConnection(connUserSocketId, false);
            socket.emit("conn-init", { connUserSocketId });
        });

        socket.on("conn-init", ({ connUserSocketId }: any) => {
            prepareNewPeerConnection(connUserSocketId, true);
        });

        socket.on("conn-signal", ({ signal, connUserSocketId }: any) => {
            const peerData = peerConnections.current[connUserSocketId];
            if (peerData && !peerData.peerConnection.destroyed) {
                peerData.peerConnection.signal(signal);
            } else {
                console.warn(`Peer for ${connUserSocketId} không tồn tại hoặc đã bị destroy.`);
            }
        });

        return () => {
            Object.values(peerConnections.current).forEach((peerData) => {
                peerData.peerConnection.destroy();
            });
            socket.disconnect();
        };
    }, [session?.user?._id, zoomID]);

    const prepareNewPeerConnection = (connUserSocketId: string, isInitiator: boolean) => {
        const iceServers: RTCIceServer[] = [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:stun1.l.google.com:19302",
                    "stun:stun2.l.google.com:19302",
                    "stun:stun3.l.google.com:19302",
                ],
            },
        ];

        const peer = new Peer({
            initiator: isInitiator,
            trickle: false,
            stream: localStream.current!,
            config: { iceServers },
        });

        peer.on("signal", (signalData) => {
            socket.emit("conn-signal", {
                signal: signalData,
                connUserSocketId,
            });
        });

        peer.on("stream", (remoteStream: MediaStream) => {
            console.log(">> check media", remoteStream);

            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
            }

            peerConnections.current[connUserSocketId] = {
                peerConnection: peer,
                stream: remoteStream,
                userID: connUserSocketId, // nếu có userID thực thì nên truyền từ server
                socketID: connUserSocketId,
            };
        });

        peer.on("close", () => {
            delete peerConnections.current[connUserSocketId];
        });

        peer.on("error", (err) => {
            console.error("Peer error:", err);
        });
    };

    const handleHangup = useCallback(() => {
        Object.values(peerConnections.current).forEach((peerData) => {
            peerData.peerConnection.destroy();
        });
        peerConnections.current = {};
        socket.disconnect();
        window.location.reload();
    }, []);

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                backgroundColor: 'black',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <video
                ref={localVideoRef}
                autoPlay
                muted
                style={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    width: 120,
                    height: 120,
                    backgroundColor: '#333',
                    borderRadius: 8,
                    border: '1px solid white',
                }}
            />
            <video
                ref={remoteVideoRef}
                autoPlay
                style={{
                    position: 'absolute',
                    bottom: 200,
                    right: 16,
                    width: 120,
                    height: 120,
                    backgroundColor: '#333',
                    borderRadius: 8,
                    border: '1px solid white',
                }}
            />

            <div style={{ position: 'absolute', bottom: 32, display: 'flex', gap: 16 }}>
                <button
                    onClick={handleHangup}
                    style={{
                        backgroundColor: '#dc2626',
                        padding: '8px 16px',
                        borderRadius: 4,
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Kết thúc
                </button>
            </div>
        </div>
    );
};

export default CallScreenZoom;
