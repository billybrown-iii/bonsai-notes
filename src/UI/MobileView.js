const MobileView = () => {
  return (
    <div className="sm:hidden fixed z-30 top-0 left-0 w-full h-full bg-black/75">
      <div
        className={`w-11/12 sm:w-4/5 max-w-screen-sm h-fit mx-auto mt-16 p-10 px-5 sm:px-20
        bg-gray-200 dark:bg-slate-800 rounded-3xl
        sticky
        `}
      >
        <div className="text-center text-lg underline pb-4">Feature not yet added</div>
        This project works exclusively on desktop. It is not yet optimized for small screens or
        mobile devices.
      </div>
    </div>
  )
}

export default MobileView
