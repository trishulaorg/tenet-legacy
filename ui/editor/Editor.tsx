import React from "react"

import {$getRoot, $getSelection, $createParagraphNode, $createTextNode, TextNode} from 'lexical';
// import {useEffect} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';


export const MyRichEditorPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext()
  editor.registerNodeTransform(TextNode, (textNode) => {
    if (textNode.getTextContent() === 'modified') {
      textNode.setTextContent('re-modified');
    }
  })

  return null
}

export const Editor: React.FC = () => {
  const onError = (e: Error) => { console.log(e); };
  const initialConfig = {
    namespace: 'MyEditor',
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <HistoryPlugin />
      <PlainTextPlugin
        contentEditable={<ContentEditable className="w-full bg-white leading-6 p-4 border-2 border-black border-opacity-10 rounded-t-lg block"/>}
        placeholder={<div>Enter some text...</div>}
      />
      <MyRichEditorPlugin/>
    </LexicalComposer>
  )
}