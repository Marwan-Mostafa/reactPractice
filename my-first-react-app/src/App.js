import './App.css';
import Post from './components/Post/Post'

function App() {
  return (
    <div className="App">
      <Post name="Post one" price={3000} stock="true"/>
    </div>
  );
}

export default App;
