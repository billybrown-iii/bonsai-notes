
const List = (props) => {
    const {nodeRefs, addNode, path, setPath} = props;

    const list = nodeRefs.map((item, index) => {
        if (item.isNew){
            return (
                <div className="node new-node" key={index}>
                    <input 
                     type="text" 
                     placeholder="New Node"
                     autoFocus 
                     onBlur={(e) => {addNode(e.target.value)}}   
                     onKeyPress={(e) => {
                         // @ts-ignore
                         if (e.key === "Enter") addNode(e.target.value)
                     }} 
                     />
                </div>
            )
        } else return (
            <div 
             onClick={() => {setPath([...path, item.title])}}
             className="node" key={index}>{item.title}</div>
        )
    })

    return (
        <div>{list}</div>
    )
}

export default List;