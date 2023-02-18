import React, { useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'


import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { initialConfig } from './LexicalNodes';
import ToolbarPlugin from './ToolbarPlugin';

export type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor() {
  const [value, setValue] = useState('')
  
  return (
    <div>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div>Enter some text...</div>} ErrorBoundary={LexicalErrorBoundary}        />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  )
}
