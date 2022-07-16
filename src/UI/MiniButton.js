const MiniButton = ({ icon, children}) => {
    return (
        <div className="flex border-2 border-zinc-800 dark:border-slate-100 rounded-md p-1 select-none text-sm">
            <div dangerouslySetInnerHTML={{__html: icon}}></div>
            {children}
        </div>
    )
}

export default MiniButton;