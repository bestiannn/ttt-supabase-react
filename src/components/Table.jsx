import { useEffect, useState } from "react"
import { supabase } from '../services/supabase';

const Table = () => {
    const [gameState, setGameState] = useState(Array(9).fill(null));
    const channel = supabase.channel('test', {
        config: {
          broadcast: {
            self: true,
          },
        },
      });      

    const handleClick = async(index) => {
        const newGameState = [...gameState];
        newGameState[index] = "X";
        setGameState(newGameState);
    }

    useEffect(() => {
        channel.on('broadcast', { event: 'supa' } , (payload) => {
            console.log("lol:", payload);
        }).subscribe();
    }, []);

    return (
        <div className="w-full text-center flex-1 grid grid-cols-3 grid-rows-3 gap-1 bg-black">
            {gameState.map((value, index) => {
                return (
                    <div key={index}>
                        {value !== null ? <i className="nes-icon times w-full h-full grid place-content-center bg-white"></i> : <div className="w-full h-full cursor-pointer grid place-content-center bg-white" onClick={() => handleClick(index)}></div>}
                    </div>
                )
            })
            }
        </div>
    )
}

export default Table