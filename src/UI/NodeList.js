
/** List of nodeRefs to be displayed in UI */
const NodeList = (props) => {
    const {nodeRefs, addNode, path, setPath} = props;

    const nodes = nodeRefs.map((item, index) => {
        if (item.path[0] === null){
            return (
                <div className="node" key={index}>
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
             onClick={() => {setPath(item.path)}}
             className="node" key={index}>{item.title}</div>
        )
    })

    return <div>{nodes}</div>
}

export default NodeList;