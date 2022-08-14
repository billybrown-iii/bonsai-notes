import { useState } from "react";
import FolderRef from "./Classes/FolderRef";
import "./App.css";
import { defaultFolder } from "./Classes/Folder";
import Main from "./Main";

// localStorage.setItem("homeFolder", JSON.stringify(defaultFolder));
const storedNotes = localStorage.getItem("homeFolder");
const homeFolder = storedNotes ? JSON.parse(storedNotes) : defaultFolder;
const homeRef = new FolderRef(homeFolder);

console.log(homeFolder);

const save = () => {
  // localStorage.setItem("homeFolder", "");
  localStorage.setItem("homeFolder", JSON.stringify(homeFolder));
  // console.log("saved");
};

setInterval(save, 500);

// TODO reduce props drilling, improve clarity
// composition using children possible via cloneElement
// example in codesandbox - jovial

// implement auto-saving
// useInterval:  saves twice per second
// fine for 99% of situations

// setTimeout:  must account for updating content, renaming, adding, deleting
// the timeout itself is only really needed for the editing content part of it

function App() {
  // path and parent control the overall navigation of the notes/folders.
  const [path, setPath] = useState(["Home"]);
  const parent = homeRef.navObj(path, homeFolder);

  return <Main parent={parent} path={path} setPath={setPath} />;
}

export default App;
