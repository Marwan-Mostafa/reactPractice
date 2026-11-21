function CourseCard(courseDetails){
  
  return(
    <div>
      <p>Course Name is: {courseDetails.title}</p>
      <p>Course Lesson Number is: {courseDetails.lessons}</p>
      <p>Course Total Duration is: {courseDetails.price}</p>
    </div>
  )
}

export default CourseCard