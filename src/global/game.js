import { create } from 'zustand'

const useGame = create(set => ({
    id: null,
    turn : 'X',
    winner: null,
    board: Array(9).fill(null),

    setId: (id) => set({ id }),
    setTurn: (turn) => set({ turn }),
    setWinner: (winner) => set({ winner }),
    setBoard: (board) => set({ board }),

    resetId: () => set({ id: null }),
    resetTurn: () => set({ turn: 'X' }),
    resetWinner: () => set({ winner: null }),
    resetBoard: () => set({ board: Array(9).fill(null) }),
}))

export default useGame