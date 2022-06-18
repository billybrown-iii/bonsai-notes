import Sidebar from './UI/Sidebar';
import Editor from './UI/Editor';
import './App.css';

function App() {

  // const [depth, setDepth] = useState(0);
  // const [ showEditor, setShowEditor ] = useState(false);

  return (
    <div className="App">
      <Sidebar />
      <Editor initialValue={""}/>
    </div>
  );
}

export default App;
