import React from 'react'

export const Heading1: React.FC = ({ children }) => {
  return <h1 className="my-2 text-slate-600 text-2xl">{children}</h1>
}

export const Heading2: React.FC = ({ children }) => {
  return <h2 className="my-4 text-slate-600 text-1xl">{children}</h2>
}

export const Heading3: React.FC = ({ children }) => {
  return (
    <h3 className="text-xl font-bold mr-5 pb-1 border-solid text-gray-600 border-b-2 border-gray-600 border-opacity-70 ">
      {children}
    </h3>
  )
}

export const WithPrimaryButtonStyling: React.FC = ({ children }) => {
  return (
    <div
      className={
        'mb-4 py-2 px-2 md:px-4 lg:px-6 block text-white hover:bg-primary-dark rounded-xl border border-slate-300 bg-primary'
      }
    >
      {children}
    </div>
  )
}

/* unused 
export const Heading4: React.FC = ({children}) => {
  return <h4 className="">{children}</h4>
}

export const Heading5: React.FC = ({children}) => {
  return <h5 className="">{children}</h5>
}

export const Heading6: React.FC = ({children}) => {
  return <h6 className="">{children}</h6>
}
*/
