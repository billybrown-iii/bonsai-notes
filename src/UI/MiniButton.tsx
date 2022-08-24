type Props = {
  icon: string
  func: () => any
}
const MiniButton = ({ icon, func }: Props) => {
  return (
    <div
      onClick={func}
      className="flex w-fit mx-2 p-2 border-2 rounded-2xl border-zinc-600 dark:border-slate-400 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div
        className="text-zinc-600 dark:text-slate-300"
        dangerouslySetInnerHTML={{ __html: icon }}
      ></div>
    </div>
  )
}

export default MiniButton
