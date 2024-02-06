import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  
  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(setFilter(filter))
  }
  const style = {
    marginBottom: 10,
    border: '1px solid gray',
    borderRadius: '5px',
    padding: '5px'
  }

  return (
    <div style={style}>
      <label htmlFor="filter">Filter:</label>
      <input id="filter" type="text" onChange={handleChange} />
    </div>
  )
}

export default Filter