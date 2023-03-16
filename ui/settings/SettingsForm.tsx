import React from 'react'

export interface FormInput {
  inputLabel?: string
  inputType?: 'text' | 'password' | 'checkbox'
  inputPlaceholder?: string
}

interface SettingsFormProps {
  formLabel: string
  inputs: FormInput[]
  submit?: () => void
}

export const SettingsForm = (props: SettingsFormProps) => {
  const { formLabel, inputs, submit } = props
  return (
    <form className="">
      <h1 className="text-3xl font-normal">{formLabel}</h1>
      {inputs.map((input) => (
        <div className="flex flex-col">
          <label className="mt-1 text-lg font-normal">{input.inputLabel}</label>
          <input
            type={input.inputType}
            placeholder={input.inputPlaceholder}
            className="indent-1 text-lg rounded-md border-2 border-med dark:border-med-dark my-1"
          />
        </div>
      ))}
      <button onClick={submit}>Submit</button>
    </form>
  )
}
