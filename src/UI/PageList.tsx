import feather from 'feather-icons'
import SettingsButton from './SettingsButton'
import { MenuItem } from '@szhsin/react-menu'
import PageRef from '../Classes/PageRef'
import { Dispatch, SetStateAction } from 'react'

const pageIcon = feather.icons['file'].toSvg({
  'stroke-width': 2,
  width: '20px',
})

type Props = {
  pageRefs: PageRef[]
  addPage: (title: string) => void
  selectedPage: string | null
  // TODO generic
  setSelectedPage: Dispatch<SetStateAction<string | null>>
  deletePage: (title: string) => void
}
export default function PageList({
  pageRefs,
  addPage,
  selectedPage,
  setSelectedPage,
  deletePage,
}: Props) {
  const pageStyles = `page-class flex items-center shadow dark:shadow-md 
    w-full overflow-hidden
    mr-auto my-1.5 pl-2 pr-1 py-2.5 rounded-md 
    bg-zinc-200 hover:bg-zinc-300 dark:bg-gray-700 dark:hover:bg-gray-600`

  const pages = pageRefs.map((item, index) => {
    // Condition for placeholder page
    if (item.path === null) {
      return (
        <div className={pageStyles} key={index}>
          <input
            className="w-full m-auto border-2 border-zinc-500 rounded-xl py-2 px-5 dark:bg-zinc-600"
            id="new-pg"
            type="text"
            maxLength={50}
            placeholder="New Page"
            autoFocus
            onBlur={(e) => {
              addPage(e.target.value)
            }}
            onKeyPress={(e) => {
              // @ts-ignore
              if (e.key === 'Enter') addPage(e.target.value)
            }}
          />
        </div>
      )
    } else {
      return (
        <div className="group flex items-center w-full" key={index}>
          {selectedPage === item.title ? (
            <span className="relative z-10 right-3 h-2 w-2 rounded-full my-auto bg-sky-400"></span>
          ) : null}
          <div
            onClick={() => {
              setSelectedPage(item.title)
            }}
            className={pageStyles + (selectedPage === item.title ? ' -ml-0.5 -mr-1' : '')}
          >
            <span className="mr-2" dangerouslySetInnerHTML={{ __html: pageIcon }} />
            <div className="overflow-hidden">{item.title}</div>
          </div>
          <div className={selectedPage === item.title ? 'ml-1 -mr-1' : ''}>
            <SettingsButton>
              <MenuItem onClick={() => deletePage(item.title)}>Delete</MenuItem>
            </SettingsButton>
          </div>
        </div>
      )
    }
  })

  return (
    <div id="page-list" className="px-1">
      {pages}
    </div>
  )
}
