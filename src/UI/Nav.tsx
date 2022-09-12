import { useState } from "react"
import InfoModal from "./InfoModal"
import MiniButton from "./MiniButton"
import feather from "feather-icons"

const darkIcon = feather.icons["moon"].toSvg({ "stroke-width": 2 })
const lightIcon = feather.icons["sun"].toSvg({ "stroke-width": 2 })
const helpIcon = feather.icons["help-circle"].toSvg({ "stroke-width": 2 })

type Props = {
  refreshEditor: () => void
}
const Nav = ({ refreshEditor }: Props) => {
  const element = document.getElementById("html")
  const isDark = element!.classList.contains("dark")

  const [showModal, setShowModal] = useState(false)

  const toggleDarkTheme = () => {
    window.localStorage.getItem("theme") === "dark"
      ? window.localStorage.setItem("theme", "light")
      : window.localStorage.setItem("theme", "dark")
    isDark ? element!.classList.remove("dark") : element!.classList.add("dark")
    refreshEditor()
  }

  return (
    // width of 22.22% = 1/3 of 2/3
    <div className="absolute flex justify-end w-[22.22%] right-0 py-1.5 px-2">
      <MiniButton icon={helpIcon} func={() => setShowModal((prev) => !prev)} />
      <MiniButton icon={isDark ? lightIcon : darkIcon} func={toggleDarkTheme} />
      {showModal ? <InfoModal setShowModal={setShowModal} /> : null}
    </div>
  )
}

export default Nav
