import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = async (id) => {
    dispatch(addVote(id))
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(showNotification('You voted for ' + votedAnecdote.content, 5))
  }

  return (
    <div>
      {anecdotes
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList