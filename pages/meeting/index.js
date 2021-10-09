import React,  { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import Particles from 'react-particles-js';

import * as styles from '../../styles/Meeting.module.css';

import { setId, selectId, setRoom,  selectRoom } from '../../state/slices/skyway';

const FrontPage = () =>{

    const router = useRouter();
    const dispatch = useDispatch();

    const skywayId = useSelector(selectId);
    const roomId = useSelector(selectRoom);

    const handleEnter = (e) => {
        router.push('/meeting/home');
    };

    return (
        <>
            <div className={styles.in_form}>
                <Paper className={styles.form_content}>
                    <h2><span className={styles.accent}>E</span>nter Meeting</h2>
                    <div className={styles.textfield}>
                        <TextField className={styles.textfield} id="" label="Skyway API Key"
                            value={skywayId} onChange={(e) => {dispatch(setId({value: e.target.value}));}}
                        />
                        <div className={styles.space} />
                        <TextField className={styles.textfield} id="" label="Room ID"
                            value={roomId} onChange={(e) => {dispatch(setRoom({value: e.target.value}));}}

                        />
                        <div  className={styles.space} />

                        <br />
                        <Button 
                            style={{backgroundColor: "blue", color: "white"}}
                            onClick={(e) => {handleEnter();}}
                        >
                            <MeetingRoomIcon style={{color: "white"}}/>　Enter
                        </Button>

                    </div>
                </Paper>            
            </div>
            <div className={styles.background}>
                <Particles 
                    width="100%" height="100%"
                    params={{
                        particles: {
                            color: "#0000ff",
                            line_linked: {
                                color: "#0000ff"
                            },
                            number: {
                                value: 30
                            },
                            size: {
                                value: 5
                            }
                        },

                    }}
                />
            </div>
        </>
    );
};

export default FrontPage;