import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const storeAuth = create(
    persist(
        set => ({
            token: null,
            setToken: (token) => set({ token }),
            clearToken: () => set({ token: null })
        }),
        { name: "auth-token" }
    )
)

export default storeAuth