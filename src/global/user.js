import { create } from 'zustand'

const useUser = create(set => ({
    username: '',
    userFigure: 'X',

    setUsername: (username) => set({ username }),
    setUserFigure: (userFigure) => set({ userFigure }),

    resetUsername: () => set({ username: '' }),
    resetUserFigure: () => set({ userFigure: 'X' }),
}))

export default useUser