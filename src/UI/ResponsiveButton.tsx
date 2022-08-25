type Props = {
  icon: string
  func: () => any
  text: string
}
const ResponsiveButton = ({ icon, func, text }: Props) => {
  return (
    <div
      onClick={func}
      // note: hover styles for dark and light themes are completely different
      className={`flex w-fit items-center p-1 px-2 rounded-lg text-sm 
      bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-800
      border-2 border-zinc-600 dark:border-gray-400 hover:border-zinc-900 dark:hover:border-gray-100 
      text-zinc-600 hover:text-zinc-900 dark:text-gray-300 dark:hover:text-gray-100`}
    >
      <div className="mr-0 xl:mr-1.5 " dangerouslySetInnerHTML={{ __html: icon }}></div>
      <div className="hidden xl:block">{text}</div>
    </div>
  )
}

export default ResponsiveButton
