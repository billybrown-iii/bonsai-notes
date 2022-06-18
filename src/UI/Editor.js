import React, { useState, useEffect, useRef } from 'react';
import { navObj } from '../Classes/Node.js';
import { Editor } from '@tinymce/tinymce-react';
import './Editor.css'

export default function App({initialValue, pagePath, showEditor, homeNode}) {
  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false);
  useEffect(() => setDirty(false), [initialValue]);
  const save = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setDirty(false);
      editorRef.current.setDirty(false);
      // an application would save the editor content to the server here
      console.log(content);
    }
  };
  if (showEditor) {
    return (
    <div id="editor">
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        init={{
          skin: 'oxide-dark',
          content_css: 'dark'}}
        initialValue={initialValue}
        onInit={(evt, editor) => editorRef.current = editor}
        onDirty={() => setDirty(true)}
      />
      <button onClick={save} disabled={!dirty}>Save</button>
      {dirty && <p>You have unsaved content!</p>}
    </div>
  );
        } else {
          return;
        }
}
