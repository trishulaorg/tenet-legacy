import React from "react"

import {$getRoot, $getSelection, $createParagraphNode, $createTextNode} from 'lexical';
// import {useEffect} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';


export const Editor: React.FC = () => {
  const onError = (e: Error) => { console.log(e); };
  const initialConfig = {
    namespace: 'MyEditor',
    onError,
  };
  const onChange: Parameters<typeof OnChangePlugin>[0]['onChange'] = (editorState, editor) => {
    editor.update(() => {
      const root = $getRoot()
      const selection = $getSelection()
      const para = $createParagraphNode()
      const text = $createTextNode("test")
      para.append(text)
      root.append(para)
      console.log(root, selection)
    })
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <HistoryPlugin />
      <PlainTextPlugin
        contentEditable={<ContentEditable className="w-full bg-white leading-6 p-4 border-2 border-black border-opacity-10 rounded-t-lg block"/>}
        placeholder={<div>Enter some text...</div>}
      />
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
  )
}