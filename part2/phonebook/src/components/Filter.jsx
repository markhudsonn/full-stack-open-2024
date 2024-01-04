const Filter = ({ value, onChange }) => {
    return (
      <div>
        <h2>Filter</h2>
        <form>
          include names with: <input value={value} onChange={onChange} />
        </form>
      </div>
    );
  };
  
  export default Filter;