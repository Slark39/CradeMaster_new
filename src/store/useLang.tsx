import { create } from 'zustand'

export type initialState = {
  lang: string
  setLang: (lang: string) => void
}

export const useLang = create<initialState>((set) => ({
  lang: 'en',
  setLang: (lang: string) =>
    set((state: initialState) => ({
      ...state,
      lang: lang
    }))
}))
