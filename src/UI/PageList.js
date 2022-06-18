export default function PageList (props) {

    const { pageRefs, addPage, showPage } = props;

    // add capability for adding new pages
    const pages = pageRefs.map((item, index) => {
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
            // on click, show an editor that's populated with the page's content.
            // it should either spawn a new editor, or show/hide.
            return <div onClick={() => {showPage(item.path, item.title)}} className="page" key={index}>{item.title}</div>
        }
    })

    return <div>{pages}</div>
}