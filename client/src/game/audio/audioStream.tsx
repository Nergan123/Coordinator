import {useContext, useEffect, useRef, useState} from 'react';
import {VolumeMute, VolumeUpRounded} from "@mui/icons-material";
import './audioStream.css';
import {SocketContext} from "../../utils/socketContext";

function AudioStream() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [muted, setMuted] = useState<boolean>(false);
    const socket = useContext(SocketContext);

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

    function setVolume(volume: number) {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
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
            setMuted(audioRef.current.muted);
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

            socket.off('audio-updated');
        };
    }, []);

    return (
        <div className={"volume-mixer"}>
            {muted ? <VolumeMute onClick={toggleMute} style={{cursor: "pointer"}}/> : <VolumeUpRounded onClick={toggleMute} style={{cursor: "pointer"}}/>}
            <input type="range" min="0" max="1" step="0.1" onChange={(e) => setVolume(Number(e.target.value))} />
        </div>
    )
}

export default AudioStream;