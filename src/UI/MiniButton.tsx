type Props = {
  icon: string
  func: () => any
}
const MiniButton = ({ icon, func }: Props) => {
  return (
    <div
      onClick={func}
      className="flex w-fit p-2 border rounded-lg border-zinc-800 dark:border-slate-100 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div dangerouslySetInnerHTML={{ __html: icon }}></div>
    </div>
  )
}

export default MiniButton
