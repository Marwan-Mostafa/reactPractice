import './App.css';

import RenderHeader from './components/Header/Header';
import RenderPost from './components/Post/Post';
import RenderSideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className="App">

      <RenderHeader />

      <div style={{ display: "flex", justifyContent: "center"}}>
        <div style={{ width: "60%", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "70%" }}>
            <RenderPost postName="أكادميه ترميز" body="أكادميه مخصصه لتعليم البرمجه"/>
            <RenderPost />
            <RenderPost />
            <RenderPost />
            <RenderPost />
          </div>
          <div style={{ width: "30%", marginTop: "25px" }}>
            <RenderSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;