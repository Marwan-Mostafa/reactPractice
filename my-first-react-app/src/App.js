import './App.css';

import RenderHeader from './components/Header/Header';
import RenderPost from './components/Post/Post';
import RenderSideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className="app">

      <RenderHeader />

      <main className="content">

        <section className="posts">

          <RenderPost
            title="أكاديمية ترميز"
            body="أكاديمية مخصصة لتعليم البرمجة بمختلف مجالاتها"
          />

          <RenderPost
            title="hello world"
            body="This is hello world article"
          />

          <RenderPost
            title="post 3"
            body="This is the body of post 3"
          />

        </section>

        <aside className="sidebar">
          <RenderSideBar />
        </aside>

      </main>

    </div>
  );
}

export default App;