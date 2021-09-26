import React,  { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Peer from 'skyway-js';
import toast, { Toaster } from 'react-hot-toast';

import Grid from '@material-ui/core/Grid';

import { selectId, selectRoom } from '../../state/slices/skyway';

import * as styles from './index.module.css';

const Skyway = () => {

    // Skywayのログイン情報
    const skywayId = useSelector(selectId);
    const roomId = useSelector(selectRoom);

    // State:  Skyway Peer / Room 
    const [peerId, setPeer] = useState();
    const [room, setRoom] = useState();

    const myVideo = useRef(null);
    const yourVideo = useRef(null);

    const initPeer = () => {
        return new Promise((resolve,  reject) => {
            const peer = new Peer({
                key: skywayId,
                debug: 2
            });

            peer.once("open", () => {
                peer.removeListener("error", reject);
                resolve(peer);
            });

            peer.once("error", reject);
        });
    };


    const makePeer = async() => {

        let localStream;

        await navigator.mediaDevices.getUserMedia({video:{width: 1280, height: 960}, audio:true})
        .then(async (stream) => {
            localStream = stream;

            myVideo.current.srcObject = localStream;
            myVideo.current.play();

        })
        .catch(error => {
            console.error('mediaDevce.getUserMedia() error', error);

            return;
        });

        const notify =  (text) => toast.success(
            text,
            {
                duration: 4000,
                iconTheme: {
                    primary: "#0000FF",
                    secondary: "#FFFFFF"
                }
            }
        );


        const peer = await initPeer()
        .catch((err) => {
            console.error(err);
        });

        await peer.on("close", () => {
            notify("Skyway Disconnection");
        });

        console.log(roomId);
        const room = await peer.joinRoom(
            roomId,
            {
                mode: 'mesh',
                stream: localStream
            }
        );

        room.on('open', () => {
            notify("Login Me");
        });

        room.on('peerJoin', (peerId) => {
            notify("Member Joined: " + peerId);
        });

        room.on('stream', stream => {
            if (stream.peerId !== peerId) {
                yourVideo.current.srcObject = stream;
            }
        });

        room.on('peerLeave', (peerId) => {
            notify("Member Left:　" +  peerId);
            if (yourVideo.current.srcObject !== null || typeof yourVideo.current.srcObject === 'undefined'){
                yourVideo.current.srcObject.getTracks().forEach((track) => {
                    track.stop();
                });
            };
            yourVideo.current.srcObjec = null;
        });

        setPeer(peer);
        setRoom(room);
    };

    useEffect(() => {
        makePeer();
    }, []);

    return(
        <>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
                <Grid item sm={4}>
                    <div className={styles.myvideo}>
                        <video id="myvideo" ref={myVideo} width="100%" height="100%" autoPlay muted playsInline />
                    </div>
                    <div>My Video</div>
                </Grid>
                <Grid item sm={4}>
                    <div className={styles.yourvideo}>
                        <video id="yourvideo" ref={yourVideo} width="100%" height="100%" autoPlay muted playsInline />
                    </div>
                    <div>Your Video</div>
                </Grid>
            </Grid>

            <Toaster />
        </>
    );
};

export default Skyway;