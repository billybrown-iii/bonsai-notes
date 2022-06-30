import { useState, useEffect } from 'react';
import NodeRef from '../Classes/NodeRef.js';
import PageRef from '../Classes/PageRef.js';
import NodeList from './NodeList.js';
import PageList from './PageList.js'

export default function Sidebar({ setSelectedPage, path, setPath, parent }){

    const [nodeRefs, setNodeRefs] = useState(parent.nodeRefGen());
    const [pageRefs, setPageRefs] = useState(parent.pageRefGen());
    
    // When the path changes, update displayed nodes/pages.
    useEffect(() => {
        setNodeRefs(parent.nodeRefGen());
        setPageRefs(parent.pageRefGen());
    }, [parent])

    const truncateSpaces = (str) => {
        if (str[0].match(/\s/)) str = str.slice(1);
        if (str[str.length - 1].match(/\s/)) str = str.slice(0, str.length - 1);
        return str;
    }

    /** Adds a temporary placeholder nodeRef, pending naming and confirmation */
    const newNode = () => {
        const newNodeRef = new NodeRef("New Node", [null]);
        setNodeRefs([...nodeRefs, newNodeRef]);
    }

    /**
     * Adds new nodeRef to UI and new node to parent object
     * @param {string} title 
     */
    const addNode = (title) => {
        if (title.length === 0) title = "New Node";
        title = truncateSpaces(title);

        if (parent.nodes.every((node) => node.title !== title)){
            setNodeRefs(nodeRefs.slice(0, nodeRefs.length - 1).concat(new NodeRef(title, parent.path)));
            parent.createChildNode(title);
            // console.log(parent.nodes);
        } else {
            setNodeRefs(nodeRefs.slice(0, nodeRefs.length - 1));
            alert("use a different name");
        }
    }

    /** Adds a temporary placeholder pageRef. */
    const newPage = () => {
        // to do: implement page titles
        const newPageRef = new PageRef("New Page", null);
        setPageRefs([...pageRefs, newPageRef]);
    }

    /**
     * Adds new pageRef to UI and new page to parent object.
     * @param {string} title 
     */
    const addPage = (title) => {
        if (title.length === 0) title = "New Page";
        title = truncateSpaces(title);

        if (parent.pages.every((page) => page.title !== title)){
            setPageRefs(pageRefs.slice(0, pageRefs.length - 1).concat(new PageRef(title, parent.path)));
            parent.createPage(title);
        } else {
            setPageRefs(pageRefs.slice(0, pageRefs.length - 1));
            alert("use a different name");
        }
    }

    return (
        <div id="sidebar" className="h-full w-1/3 border-r-2 border-zinc-500 dark:border-slate-100 select-none">
            <div id="back-button" 
             onClick={() => { 
                setSelectedPage(null);
                if (path.length > 1) setPath(path.slice(0, path.length - 1))
             }}
             className="p-5 bg-slate-200 dark:bg-zinc-700"
             ><div className='ml-3 text-lg'>{"^ " + parent.title}</div></div>
            
            <div id="sidebar-btns" className="flex justify-end">
                <div onClick={newNode} id="new-node-btn" className="px-3 border-2 border-r-0 border-zinc-900 dark:border-slate-100">New Node</div>
                <div onClick={newPage} id="new-page-btn" className="px-3 border-2 border-zinc-900 dark:border-slate-100">New Page</div>
            </div>
             {/* <hr className='w-5/6 border-t-2 border-black'/> */}
            
            <div id="sidebar-list">
                <NodeList setPath={setPath} setSelectedPage={setSelectedPage} nodeRefs={nodeRefs} addNode={addNode} />
                <hr />
                <PageList pageRefs={pageRefs} addPage={addPage} setSelectedPage={setSelectedPage}/>
            </div>

        </div>
    )
}
