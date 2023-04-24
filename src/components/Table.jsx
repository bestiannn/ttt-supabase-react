import { useEffect, useState } from "react"
import { channel } from '../services/supabase';

const Table = () => {
    const [gameState, setGameState] = useState(Array(9).fill(false));

    const handleClick = (index) => {
        const newGameState = [...gameState];
        newGameState[index] = true;
        setGameState(newGameState);
        channel.send({
            type: 'broadcast',
            event: 'message',
            payload: {
                user: 'user',
                content: index,
            },
        });
    }

    useEffect(() => {
        channel.on('broadcast', { event: 'message' }, (payload) => {
            const { content } = payload.payload;
            console.log(content);
            setGameState((gameState) => {
                const newGameState = [...gameState];
                newGameState[content] = true;
                return newGameState;
            });
        }).subscribe()
    }, []);

    return (
        <div className="w-full text-center flex-1 grid grid-cols-3 grid-rows-3 gap-1 bg-black">
            {gameState.map((value, index) => {
                return (
                    <div key={index}>
                        {value ? <i className="nes-icon times w-full h-full grid place-content-center bg-white"></i> : <div className="w-full h-full cursor-pointer grid place-content-center bg-white" onClick={() => handleClick(index)}></div>}
                    </div>
                )
            })
            }
        </div>
    )
}

export default Table