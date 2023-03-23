// Authentication Form Component
// with tailwindcss well designed

import React from 'react'

// Write form component

export const AuthForm: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-4 space-y-4 bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Sign in</h2>
        <form className="flex flex-col w-full space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="px-4 py-2 text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm focus:border-blue-500 focus:bg-white focus:ring-0 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-0 dark:focus:bg-gray-600 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Password
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="px-4 py-2 text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm focus:border-blue-500 focus:bg-white focus:ring-0 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-0 dark:focus:bg-gray-600 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="text-blue-500 border-gray-300 rounded focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <span className="mx-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            </label>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <a href="#" className="text-blue-500 hover:underline dark:text-blue-400">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
