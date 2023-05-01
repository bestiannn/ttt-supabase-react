import { useEffect } from "react"
import { channel } from '../services/supabase';
import { useUser, useGame } from "../global";

const Table = () => {
    const { userFigure } = useUser();
    const { board, setBoard, turn, setTurn } = useGame();

    const handleClick = async (index) => {
        if (turn !== userFigure) return;
        const newBoard = [...board];
        newBoard[index] = userFigure;
        setBoard(newBoard);
        await channel.send({
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
            const newBoard = board
            newBoard[index] = figure;
            setBoard(newBoard);
            console.log(turn)
            setTurn(figure === 'X' ? 'O' : 'X');
        }).subscribe()
    }, []);

    return (
        <div className="w-full text-center flex-1 grid grid-cols-3 grid-rows-3 gap-1 bg-black">
            {board.map((figure, index) => {
                return (
                    <div key={index}>
                        {!figure && <div className="w-full h-full cursor-pointer grid place-content-center bg-white" onClick={() => handleClick(index)}></div>}
                        {figure === 'X' && <i className="nes-icon times w-full h-full grid place-content-center bg-white"></i>}
                        {figure === 'O' && <i className="nes-icon heart w-full h-full grid place-content-center bg-white"></i>}
                    </div>
                )
            })}
        </div>
    )
}

export default Table