import "./App.css";
import CourseCard from "./components/CourseCard";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Header />

      <main>
        <div className="courses" id="courses">
          <CourseCard title="HTML" lessons={60} price={300} />
          <CourseCard title="CSS" lessons={80} price={100} />
          <CourseCard title="JAVASCRIPT" lessons={70} price={3000} />
          <CourseCard title="Git" lessons={70} price={3000} />
          <CourseCard title="GitHub" lessons={70} price={3000} />
          <CourseCard title="TypeScript" lessons={70} price={3000} />
          <CourseCard title="vuejs" lessons={70} price={3000} />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
