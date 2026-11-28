import "./App.css";

import CourseCard from "./components/CourseCard";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  const courses = [
    { id: 1, title: "HTML", lessons: 30, price: 15 },
    { id: 2, title: "CSS", lessons: 60, price: 35 },
    { id: 3, title: "JS", lessons: 80, price: 50 },
    { id: 4, title: "Reactjs", lessons: 70, price: 40 },
    { id: 5, title: "Git", lessons: 20, price: 15 },
    { id: 6, title: "Github", lessons: 25, price: 20 },
    { id: 7, title: "TypeScript", lessons: 40, price: 30 },
    { id: 8, title: "Gulpjs", lessons: 20, price: 15 },
  ];

  return (
    <>
      <Header />

      <main>
        <div className="courses" id="courses">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              lessons={course.lessons}
              price={course.price}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
