import {
  Klass,
  LexicalEditor,
  LexicalNode,
} from 'lexical';
// import LexicalNode

import { InitialConfigType } from '@lexical/react/LexicalComposer';
import ToolbarPlugin from './ToolbarPlugin';



export const initialConfig: InitialConfigType = {
  namespace: 'example',
  onError: (error: Error, editor: LexicalEditor) => {
    console.error('editor error: ', editor)
    console.error(error);
  },
  editable: true,
  theme: {
    root: 'mx-4 my-2',
    strong: 'font-bold',
    paragraph: 'my-2',
    h1: 'text-3xl font-bold mt-4 mb-2',
    h2: 'text-2xl font-bold mt-4 mb-2',
    h3: 'text-xl font-bold mt-4 mb-2',
    h4: 'text-lg font-bold mt-4 mb-2',
    h5: 'text-base font-bold mt-4 mb-2',
    h6: 'text-sm font-bold mt-4 mb-2',
    code: 'font-mono bg-gray-100 rounded-sm py-1 px-2 inline-block',
    codeBlock: 'font-mono bg-gray-100 rounded-sm py-2 px-4 block',
    quote: 'italic bg-gray-100 rounded-sm py-2 px-4 block border-l-4 border-gray-400',
    link: 'text-blue-600 hover:text-blue-700',
    ul: 'ml-4',
    ol: 'ml-4',
    listItem: 'my-2',
    checkbox: 'form-checkbox h-5 w-5 text-blue-500',
    table: 'border-collapse w-full',
    tableHead: 'bg-gray-200 font-bold',
    tableHeadCell: 'px-2 py-1 border',
    tableBody: '',
    tableRow: '',
    tableCell: 'px-2 py-1 border',
  },
};
