import "./App.css"
import CourseCard from "./components/CourseCard"


function App(){
  return(
    <>
      <CourseCard 
        title="HTML"
        lessons = {60}
        price = {300}
      />

      <CourseCard 
        title="CSS"
        lessons = {80}
        price = {100}
      />

      <CourseCard 
        title="JAVASCRIPT"
        lessons = {70}
        price = {3000}
      />
    </>
  )
}

export default App;