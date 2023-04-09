import type { NextPage } from 'next'
import { Settings } from '@/src/ui/settings/Settings'

const SettingsPage: NextPage = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-[95vw] sm:max-w-[80vw] w-full">
        <Settings />
      </div>
    </div>
  )
}

export default SettingsPage
