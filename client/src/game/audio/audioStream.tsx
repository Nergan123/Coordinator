import {useEffect, useRef} from 'react';
import io from "socket.io-client";

const socket = io("http://localhost:8000");

function AudioStream() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    function setAudio() {
        audioRef.current = new Audio('/api/audio/stream');
        audioRef.current.play().then(() => {}).catch((error) => {
            console.error(error);
        });
        audioRef.current.addEventListener('ended', () => {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().then(() => {}).catch((error) => {
                    console.error(error);
                });
            }
        });
    }

    function updateAudio() {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.removeEventListener('ended', () => {
                if (audioRef.current) {
                    audioRef.current = null;
                }
            });
            audioRef.current.pause();
            setAudio();
        }
    }

    function toggleMute() {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
        }
    }

    useEffect(() => {
        socket.on('audio-updated', () => {
            console.log('Audio updated');
            updateAudio();
        });
        setAudio();

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', () => {
                    if (audioRef.current) {
                        audioRef.current = null;
                    }
                });
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return (
        <button onClick={toggleMute}>Toggle mute</button>
    )
}

export default AudioStream;