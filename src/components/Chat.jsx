import { useState, useEffect } from 'react'
import { channel } from '../services/supabase';

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('');

    const handleSend = (e) => {
        e.preventDefault()
        if (message !== '') {
            channel.send({
                type: 'broadcast',
                event: 'message',
                payload: {
                    content: message,
                },
            })

            setMessage('')
        }
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    useEffect(() => {
        channel.on('broadcast', { event: 'message' }, (payload) => {
            setMessages((messages) => [...messages, payload])
        }).subscribe()
    }, []);

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message.payload.content}</li>
                ))}
            </ul>
            <form onSubmit={handleSend}>
                <input type="text" value={message} onChange={handleChange} />
                <button type='submit' onClick={handleSend}>Send</button>
            </form>
        </div>
    )
}

export default Chat;