import "./course-card.css";

function CourseCard({ title, lessons, price }) {
  return (
    <div className="course-card">
      <h2>Course Name Is: {title}</h2>

      <p className="course-lessons">Course Lessons Number Is: {lessons}</p>

      <p className="course-price">Price Is: {price}</p>
    </div>
  );
}

export default CourseCard;
