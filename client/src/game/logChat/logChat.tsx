import './logChat.css';
import io from "socket.io-client";
import {useEffect, useState} from "react";

function LogChat({initialMessages}: {initialMessages: string[]}) {

    const [messages, setMessages] = useState<string[]>(initialMessages);

    useEffect(() => {
        const socket = io("http://localhost:8000");
        socket.on("message", (messagesNew: string[]) => {
            setMessages(messagesNew);
        });

        return () => {
            socket.emit('manual-disconnect');
            socket.off("message");
            socket.close()
        };
    }, []);

    return(
        <div className={"log-chat"}>
            {messages.map((message, index) => <p key={index}>{message}</p>)}
            <p className={"last-line-terminal"}>Logging Terminal:</p>
        </div>
    );
}

export default LogChat;