

export default function PageList (props) {
    const { pageRefs, addPage, setSelectedPage } = props;

    const pages = pageRefs.map((item, index) => {
        // Condition for placeholder page
        if (item.path === null){
            return (
                <div className="page" key={index}>
                    <input 
                     type="text" 
                     placeholder="New Page"
                     autoFocus 
                     onBlur={(e) => {addPage(e.target.value)}}   
                     onKeyPress={(e) => {
                         // @ts-ignore
                         if (e.key === "Enter") addPage(e.target.value)
                     }} 
                     />
                </div>
            )
        } else {
            return <div onClick={() => {setSelectedPage(item.title)}} className="page" key={index}>{item.title}</div>
        }
    })
    return <div>{pages}</div>
}