import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const anecdoteToChange = state.find(anecdote => anecdote.id === action.payload.id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    appendAnecdotes: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { voteAnecdote, appendAnecdotes, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const addVote = (id) => {
  return async dispatch => {
    const newVote = await anecdoteService.addVote(id)
    dispatch(voteAnecdote(newVote))
  }

}

export default anecdoteSlice.reducer