import Sidebar from './UI/Sidebar';
import Editor from './UI/Editor';
import './App.css';

function App() {

  // const [depth, setDepth] = useState(0);

  return (
    <div className="App">
      <Sidebar />
      <Editor />
    </div>
  );
}

export default App;
