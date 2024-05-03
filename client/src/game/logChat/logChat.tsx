import './logChat.css';
import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../utils/socketContext";

function LogChat({initialMessages}: {initialMessages: string[]}) {

    const [messages, setMessages] = useState<string[]>(initialMessages);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on("message", (messagesNew: string[]) => {
            setMessages(messagesNew);
        });

        return () => {
            socket.off("message");
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