import './App.css';
import RenderHeader from './components/Header/Header';
import RenderPost from './components/Post/Post'
import RenderSideBar from './components/SideBar/SideBar';


function App() {
  return (
    <div className="App">
      <RenderHeader/>
      <main className='content'>
        <section className='posts'>
          <RenderPost/>
          <RenderPost/>
          <RenderPost/>
          <RenderPost/>
          <RenderPost/>
          <RenderPost/>
        </section>

        <RenderSideBar/>
      </main>
    </div>
  );
}



export default App;
