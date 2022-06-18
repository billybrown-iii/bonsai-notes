import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './Editor.css'

export default function ({ initialValue, pagePath, homeNode, parent }) {
  // initialValue = homeNode.navObj(pagePath.path).findPage(pagePath.title)
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
  if (pagePath) {
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
