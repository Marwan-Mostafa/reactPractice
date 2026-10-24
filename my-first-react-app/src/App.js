import "./App.css";
// import RenderHeader from './components/Header/Header'
// import RenderPost from "./components/Post/Post";
// import RenderSideBar from "./components/SideBar/SideBar"
import MyForm from "./components/MyForm.js";
import MyInput from "./components/MyInput.js";

function App() {
  return (
    <div className="App" style={{
      paddingTop: "300px"
    }}>
      <MyForm />
    </div>
  )
}

export default App;