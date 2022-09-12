import feather from "feather-icons"
import { Dispatch, SetStateAction } from "react"
import ResponsiveButton from "./ResponsiveButton"
const githubIcon = feather.icons["github"].toSvg({ "stroke-width": 2 })
const coffeeIcon = feather.icons["coffee"].toSvg({ "stroke-width": 2 })
const xIcon = feather.icons["x-circle"].toSvg({ "stroke-width": 2 })

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>
}

const HelpModal = ({ setShowModal }: Props) => {
  return (
    <div className="fixed z-30 top-0 left-0 w-full h-full bg-black/75">
      <div
        className={`w-11/12 sm:w-4/5 max-w-screen-sm h-fit mx-auto mt-16 p-10 px-5 sm:px-20
        bg-gray-200 dark:bg-gray-800 rounded-3xl
        sticky
        `}
      >
        <div className="w-fit ml-auto sm:-mr-12 -mt-4 my">
          <ResponsiveButton icon={xIcon} func={() => setShowModal((prev) => !prev)} text="Close" />
        </div>
        <div className="w-fit mx-auto -mt-4 text-2xl border-b border-gray-900 dark:border-gray-100">
          Bonsai Notes
        </div>
        <br />
        <div>
          This is a note-taking web app that is designed to be quick and useful. It doesn't support
          online syncing of notes, though this feature may be added at some point in the future.
        </div>
        <br />
        {/* <div>[overview of features ?]</div> */}
        {/* <br /> */}
        <div>
          It's a software development project, created for fun and practice. It should only be used
          for temporary and minor applications. The app creator assumes no responsibility for lost
          notes.
        </div>

        <div className="my-5 border-b border-slate-700 dark:border-slate-300 rounded-2xl" />
        <div className="text-center">
          <div>Created by Billy Brown III</div>
          <a
            href="https://github.com/billybrown-iii/bonsai-notes"
            target="_blank"
            rel="noreferrer"
            className="flex w-fit mx-auto my-1 mt-2 py-2 text-gray-700 dark:text-gray-300 underline decoration-2 hover:decoration-sky-500 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <span className="mr-2" dangerouslySetInnerHTML={{ __html: githubIcon }} />
            View code
          </a>
          <a
            href="https://billybrowniii.com"
            target="_blank"
            rel="noreferrer"
            className="flex w-fit mx-auto my-1 py-2 text-gray-700 dark:text-gray-300 underline decoration-2 hover:decoration-sky-500 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <span className="mr-2" dangerouslySetInnerHTML={{ __html: coffeeIcon }} />
            View portfolio
          </a>
        </div>
      </div>
    </div>
  )
}

export default HelpModal
