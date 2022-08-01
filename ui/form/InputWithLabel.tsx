import React from 'react'

interface InputWithLabelProps {
  label: string
  value: string
  setValue: (value: string) => void
  errorMessage?: string
  inputElement?: JSX.Element
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  value,
  setValue,
  errorMessage = '',
  inputElement = (
    <input
      type="text"
      className="flex-1 rounded border border-slate-300 overflow-auto"
      onChange={(e) => setValue(e.currentTarget.value)}
      value={value}
    />
  ),
}: InputWithLabelProps) => (
  <div className="p-1">
    <label className="flex">
      <span className="w-40 flex-shrink-0">{label}</span>
      <div className="flex flex-col w-full">
        {inputElement}
        <div className={'text-red-600'}>{errorMessage}</div>
      </div>
    </label>
  </div>
)

export { InputWithLabel }
