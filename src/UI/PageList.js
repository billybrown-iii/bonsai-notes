import feather from 'feather-icons';
import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

const pageIcon = feather.icons["file"].toSvg({"stroke-width": 1, "width": "20px"});
const settingsIcon = feather.icons["settings"].toSvg({"stroke-width": 2, "width": "20px"});

export default function PageList ({ pageRefs, addPage, setSelectedPage, deletePage }) {

    const pageStyles = "group flex w-3/4 m-auto my-3 px-6 py-2 rounded-md bg-slate-800 dark:hover:bg-slate-700";

    const pages = pageRefs.map((item, index) => {
        // Condition for placeholder page
        if (item.path === null){
            return (
                <div className={pageStyles} key={index}>
                    <input
                     className="w-full m-auto border-2 border-zinc-500 rounded-xl py-2 px-5 dark:bg-zinc-600" 
                     // TODO fix issue where you can click buttons when blurring
                     id="new-pg"
                     type="text" 
                     placeholder="New Page"
                     autoFocus 
                     onBlur={(e) => {
                         
                         addPage(e.target.value)
                        }}   
                     onKeyPress={(e) => {
                         // @ts-ignore
                         if (e.key === "Enter") addPage(e.target.value)
                     }} 
                    />
                </div>
            )
        } else {
            return (
                <div 
                 onClick={() => {setSelectedPage(item.title)}} 
                 className={pageStyles} 
                 key={index}
                >
                    <span className='mr-2' dangerouslySetInnerHTML={{__html: pageIcon}} />
                    {item.title}
                    <div
                     className='invisible group-hover:visible h-fit ml-auto -mr-3 -my-1 dark:text-slate-300 dark:hover:bg-slate-600 rounded-md' 
                     onClick={(e) => e.stopPropagation()}
                    >
                        <Menu 
                         menuButton={<div className="p-1 px-1.5" dangerouslySetInnerHTML={{__html: settingsIcon}} />}
                         transition
                         portal={true}
                         offsetX={20}
                         offsetY={-2}
                        >
                            <MenuItem onClick={() => deletePage(item.title)}>Delete</MenuItem>
                        </Menu>
                    </div>
                </div>
            )
        }
    })

    return <div id="page-list">{pages}</div>
}
