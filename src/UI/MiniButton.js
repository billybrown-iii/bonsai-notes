const MiniButton = ({ icon }) => {
    return (
        <div className="w-fit p-1.5 border border-zinc-800 rounded-2xl" dangerouslySetInnerHTML={{__html: icon}}>

        </div>
    )
}

export default MiniButton;