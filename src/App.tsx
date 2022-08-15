import { useState } from "react";
import FolderRef from "./Classes/FolderRef";
import "./App.css";
import { defaultFolder } from "./Classes/Folder";
import Main from "./Main";

const storedNotes = localStorage.getItem("homeFolder");
const homeFolder = storedNotes ? JSON.parse(storedNotes) : defaultFolder;
const homeRef = new FolderRef(homeFolder);

console.log(homeFolder);

// TODO reduce props drilling, improve clarity
// composition using children possible via cloneElement
// example in codesandbox - jovial

function App() {
  // path and parent control the overall navigation of the notes/folders.
  const [path, setPath] = useState(["Home"]);
  const parent = homeRef.navObj(path, homeFolder);

  return (
    <Main
      parent={parent}
      homeFolder={homeFolder}
      path={path}
      setPath={setPath}
    />
  );
}

export default App;
