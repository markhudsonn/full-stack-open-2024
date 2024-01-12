const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.jsx <password>')
    process.exit(1);
    }

const password = process.argv[2];

const url =
  `mongodb+srv://user:${password}@cluster0.uaquvds.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    })

const Person = mongoose.model('Person', personSchema)

const addPerson = (name, number) => {
    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

const returnAllPersons = () => {
    Person.find({}).then(persons => {
        persons.forEach(person => console.log(person['name'], person['number']))
        mongoose.connection.close()
    })
}

if (process.argv.length < 5) {
    console.log('Phonebook:')
    returnAllPersons()
} else {
    addPerson(process.argv[3], process.argv[4])
}
