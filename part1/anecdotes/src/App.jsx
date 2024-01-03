import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

const getAnecdoteWithMostVotes = (anecdotes, votes) => {
  if (Math.max(...votes) === 0) return 'No votes yet'
  
  return anecdotes[votes.indexOf(Math.max(...votes))]
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]   

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick = {addVote} text='Vote' />
      <Button handleClick = {nextAnecdote} text='Next Anecdote' />
      <h1>Anecdote with Most Votes</h1>
      <p>{getAnecdoteWithMostVotes(anecdotes, votes)}</p>
    </div>
  )
}

export default App