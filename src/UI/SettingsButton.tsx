import feather from 'feather-icons'
import { Menu } from '@szhsin/react-menu'
import React, { ReactNode } from 'react'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'

const settingsIcon = feather.icons['settings'].toSvg({
  'stroke-width': 2,
  width: '20px',
})

/**
 * Wrapper for settings button
 * Provides outer skeleton.  Implementation still to add individual menu items for settings.
 */
type Props = {
  children?: ReactNode
}
const SettingsButton = ({ children }: Props) => {
  return (
    <div
      className="invisible group-hover:visible ml-1.5 -my-2 rounded-2xl text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700 dark:text-slate-400 dark:hover:bg-gray-700 dark:hover:text-slate-300"
      onClick={(e) => e.stopPropagation()}
    >
      <Menu
        menuButton={
          <div className="p-1.5 px-2" dangerouslySetInnerHTML={{ __html: settingsIcon }} />
        }
        transition
        portal={true}
        offsetX={20}
        offsetY={-2}
      >
        {children}
      </Menu>
    </div>
  )
}

export default SettingsButton
