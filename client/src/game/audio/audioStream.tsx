import {useEffect, useRef} from 'react';

function AudioStream() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    function toggleMute() {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
        }
    }

    useEffect(() => {
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