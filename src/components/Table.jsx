import { useEffect, useState } from "react"
import { channel } from '../services/supabase';
import useUser from "../global/user";

const Table = () => {
    const [gameState, setGameState] = useState(Array(9).fill(''));
    const { userFigure } = useUser();

    const handleClick = (index) => {
        const newGameState = [...gameState];
        newGameState[index] = userFigure;
        setGameState(newGameState);
        channel.send({
            type: 'broadcast',
            event: 'message',
            payload: {
                figure: userFigure,
                index: index,
            },
        });
    }

    useEffect(() => {
        channel.on('broadcast', { event: 'message' }, ({ payload }) => {
            const { index, figure } = payload;
            console.log(payload);
            setGameState((gameState) => {
                const newGameState = [...gameState];
                newGameState[index] = figure;
                return newGameState;
            });
        }).subscribe()
    }, []);

    return (
        <div className="w-full text-center flex-1 grid grid-cols-3 grid-rows-3 gap-1 bg-black">
            {gameState.map((figure, index) => {
                return (
                    <div key={index}>
                        {!figure && <div className="w-full h-full cursor-pointer grid place-content-center bg-white" onClick={() => handleClick(index)}></div>}
                        {figure === 'X' && <i className="nes-icon times w-full h-full grid place-content-center bg-white"></i>}
                        {figure === 'O' && <i className="nes-icon heart w-full h-full grid place-content-center bg-white"></i>}
                    </div>
                )
            })
            }
        </div>
    )
}

export default Table