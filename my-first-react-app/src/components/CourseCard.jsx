function CourseCard(){

    const course = {
      title: "Elzero",
      lessons: 60,
      duration: 10,
      price: 100,
  }
  
  return(
    <div>
      <p>Course Name is: {course.title}</p>
      <p>Course Lesson Number is: {course.lessons}</p>
      <p>Course Total Duration is: {course.duration}</p>
      <p>Course Total Duration in minutes is: {course.duration * course.lessons}</p>
      <p>Course Price is: {course.price}</p>
    </div>
  )
}

export default CourseCard