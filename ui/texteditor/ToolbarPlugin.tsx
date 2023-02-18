import { FORMAT_TEXT_COMMAND } from 'lexical';
import { $createTextNode, $getSelection, LexicalCommand, createCommand } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import clsx from 'clsx';
import React, { useCallback, useEffect } from 'react';

type ToolbarButtonProps = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

export function ToolbarButton({
  label,
  icon,
  onClick,
}: ToolbarButtonProps): JSX.Element {
  const buttonClasses = clsx([
    'px-3 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100',
    {
      'text-gray-500 hover:text-gray-700 focus:text-gray-700': !onClick,
      'text-gray-700 hover:text-gray-900 focus:text-gray-900': onClick,
    }
  ])
  return (
    <button className={buttonClasses} onClick={onClick}>
      {icon && <i className="text-lg">{icon}</i>}
      {label && <span className="ml-2">{label}</span>}
    </button>
  )
}



export const BOLD_COMMAND: LexicalCommand<string> = createCommand();

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const onClick = useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    console.log('onClick called')
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  }, [editor])


  const defaultButtons = [
    {
      label: 'Bold',
      commandName: 'toggleBold',
      icon: <strong>B</strong>,
      onClick: onClick,
    },
    {
      label: 'Italic',
      commandName: 'toggleItalic',
      icon: <em>I</em>,

      onClick: onClick,
    },
    {
      label: 'Underline',
      commandName: 'toggleUnderline',
      icon: <u>U</u>,
      onClick: onClick,
    },
    {
      label: 'Strikethrough',
      commandName: 'toggleStrikethrough',
      icon: <s>S</s>,
      onClick: onClick,
    },
  ];


  return (
    <div className="flex gap-2">
      {defaultButtons.map(({ label, icon, onClick }, index) => (
        <ToolbarButton
          key={index}
          label={label}
          icon={icon}
          onClick={onClick}
        />
      ))}
    </div>
  );
}


export default ToolbarPlugin;
