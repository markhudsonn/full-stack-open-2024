const PersonForm = ({ addPerson, newName, handleNewName, newPhone, handleNewPhone }) => {
    return (
      <div>
        <h2>Add new</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNewName} />
          </div>
          <div>
            phone: <input value={newPhone} onChange={handleNewPhone} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    );
  };
  
  export default PersonForm;