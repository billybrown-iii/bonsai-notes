
/** List of nodeRefs to be displayed in UI */
export default function NodeList({setPath, setSelectedPage, nodeRefs, addNode}){

    const nodeStyles = "w-5/6 m-auto my-3 p-3 px-6 border-4 border-zinc-900 dark:border-slate-100 rounded-2xl";

    const nodes = nodeRefs.map((item, index) => {
        if (item.path[0] === null){
            return (
                <div className={nodeStyles} key={index}>
                    <input 
                     type="text" 
                     placeholder="New Node"
                     autoFocus 
                     onBlur={(e) => {addNode(e.target.value)}}   
                     onKeyPress={(e) => {
                         //@ts-ignore
                         if (e.key === "Enter") addNode(e.target.value)
                     }} 
                     />
                </div>
            )
        } else return (
            <div 
             onClick={() => {
                setSelectedPage(null);
                setPath(item.path);
             }}
             className={nodeStyles} key={index}>{item.title}</div>
        )
    })

    return <div>{nodes}</div>
}