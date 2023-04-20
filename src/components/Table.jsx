import { useEffect, useState } from "react"
import { supabase } from '../services/supabase';

const Table = () => {
    const [gameState, setGameState] = useState(Array(9).fill(null));

    const handleClick = (index) => {
        const newGameState = [...gameState];
        newGameState[index] = "X";
        setGameState(newGameState);
    }

    useEffect(() => {
        const channel = supabase.channel('any')
        channel
            .on('presence', { event: 'sync' }, () => {
                console.log('Synced presence state: ', channel.presenceState())
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await channel.track({ online_at: new Date().toISOString() })
                }
            })
    }, [])

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