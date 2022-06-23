import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './Editor.css'

export default function MyEditor({ selectedPage, parent }) {

  const currentPage = parent.findPage(selectedPage);
  const initialValue = currentPage?.content;
  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false);
  
  useEffect(() => setDirty(false), [initialValue]);
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent((currentPage ? currentPage.content : ""));
      setDirty(false);
    }
  }, [selectedPage]);
  
  const save = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setDirty(false);
      editorRef.current.setDirty(false);
      // an application would save the editor content to the server here
      // console.log(content);
      currentPage.content = content;
      console.log(currentPage);
    }
  };

    return (
      <div className={(selectedPage ? null : "hidden")} id="editor">
        <Editor
          tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
          init={{
            skin: 'oxide-dark',
            content_css: 'dark'}}
          initialValue={initialValue}
          onInit={(evt, editor) => editorRef.current = editor}
          onDirty={() => setDirty(true)}
          // onEditorChange={() => {setDirty(true)}}
        />
        <button onClick={save} disabled={!dirty}>Save</button>
        <button onClick={() => {editorRef.current.setContent("3333")}} >Test</button>
        {dirty && <p>You have unsaved content!</p>}
      </div>
  );


}





// controlled component - example

// export default function MyEditor({ selectedPage, parent }) {
//   const initialValue = parent.findPage(selectedPage).content;
//   const [value, setValue] = useState(initialValue ?? '');
//   useEffect(() => setValue(initialValue ?? ''), [initialValue]);

//   let timeoutID;

//   return (
//     <div id="editor">
//       <Editor
//         tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
//         init={{
//           skin: 'oxide-dark',
//           content_css: 'dark'}}
//         initialValue={initialValue}
//         value={value}
//         onEditorChange={(newValue, editor) => setValue(newValue)}
//       />
//     </div>

//   );
// }








// const currentPage = parent.findPage(selectedPage);
// const initialValue = currentPage?.content;
// const editorRef = useRef(null);
// const [dirty, setDirty] = useState(false);
// useEffect(() => setDirty(false), [initialValue]);
// const save = () => {
//   if (editorRef.current) {
//     const content = editorRef.current.getContent();
//     setDirty(false);
//     editorRef.current.setDirty(false);
//     // an application would save the editor content to the server here
//     // console.log(content);
//     currentPage.content = content;
//     console.log(currentPage);
//   }
// };

//   return (
//     <div id="editor">
//       <Editor
//         tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
//         init={{
//           skin: 'oxide-dark',
//           content_css: 'dark'}}
//         initialValue={initialValue}
//         onInit={(evt, editor) => editorRef.current = editor}
//         onDirty={() => setDirty(true)}
//         // onEditorChange={save}
//       />
//       <button onClick={save} disabled={!dirty}>Save</button>
//       {dirty && <p>You have unsaved content!</p>}
//     </div>
// );






  // const initialValue = parent.findPage(selectedPage).content;

  


  //controlled wip

  // let initialValue = "";

  // if (selectedPage){
  //   initialValue = parent.findPage(selectedPage).content; 
  //  }

  // //  console.log(initialValue)

  // const [value, setValue] = useState(initialValue ?? '');

  // // useEffect(() => {setValue(parent.findPage(selectedPage).content)}, [selectedPage]);

  // // useEffect(() => setValue(initialValue ?? ''), [initialValue]);

  // let timeoutID;

  // return (
  //   <div className={(selectedPage ? null : "hidden")} id="editor">
  //     <Editor
  //       tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
  //       init={{
  //         skin: 'oxide-dark',
  //         content_css: 'dark'}}
  //       // onInit={(evt, editor) => editorRef.current = editor}
  //       initialValue={initialValue}
  //       value={value}
  //       onEditorChange={(newValue, editor) => setValue(newValue)}
  //     />
  //     <input onClick={() => {}} type="button" value="save" />
  //   </div>

  // );