const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <b><p>Number of exercises {sum}</p></b>

const Part = ({ part }) => <p> {part.name} {part.exercises}</p>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)

const calculateSum = (parts) => parts.reduce((sum, part) => sum + part.exercises, 0)

const Course = ({ course }) => {
    return (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={calculateSum(course.parts)} />
    </div>
    )
}




export default Course
