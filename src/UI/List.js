
const List = (props) => {
    const {nodeRefs, setNodeRefs} = props;

    const addNode = (title) => {
        if (title.length === 0) title = "New Node";
        setNodeRefs(nodeRefs.slice(0, nodeRefs.length - 1).concat({title: title}))
    }

    const list = nodeRefs.map((item) => {
        if (item.isNew){
            return (
                <div className="node new-node">
                    <input 
                     type="text" 
                     placeholder="New Node" 
                     autoFocus 
                     onBlur={(e) => {addNode(e.target.value)}}   
                     onKeyPress={(e) => {
                         if (e.key === "Enter") addNode(e.target.value)
                     }} 
                     />
                </div>
            )
        } else return (
            <div className="node">{item.title}</div>
        )
    })

    return (
        <div>{list}</div>
    )
}

export default List;