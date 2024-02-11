import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UsersState = {
  id: string
  name: string
  email: string
  fileName: string
  uploadedFiles: string[]
}

const initialState = {
  id: '',
  name: '',
  email: '',
  fileName: '',
  uploadedFiles: [],
} as UsersState

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: () => initialState,
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setFileName: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload
    },
    setUploadedFiles: (state, action: PayloadAction<string[]>) => {
      state.uploadedFiles = action.payload
    },
  },
})

export const {
  reset,
  setId,
  setName,
  setEmail,
  setFileName,
  setUploadedFiles,
} = users.actions

export default users.reducer
