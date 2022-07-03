import { useState, useEffect } from 'react';
import NodeRef from '../Classes/NodeRef.js';
import PageRef from '../Classes/PageRef.js';
import NodeList from './NodeList.js';
import PageList from './PageList.js'

export default function Sidebar({ path, setPath, parent, selectedPage, setSelectedPage }){

    const [nodeRefs, setNodeRefs] = useState(parent.nodeRefGen());
    const [pageRefs, setPageRefs] = useState(parent.pageRefGen());
    
    // When the path or page title changes, update displayed nodes/pages.
    useEffect(() => {
        setNodeRefs(parent.nodeRefGen());
        setPageRefs(parent.pageRefGen());
    }, [parent, selectedPage])

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
        } else {
            setNodeRefs(nodeRefs.slice(0, nodeRefs.length - 1));
            alert("use a different name");
        }
    }


    /** Adds a temporary placeholder pageRef. */
    const newPage = () => {
        const newPageRef = new PageRef("New Page", null);
        setPageRefs([...pageRefs, newPageRef]);
    }

    /**
     * Adds new pageRef to UI and new page to parent object.
     * @param {string} title 
     */
    const addPage = (title) => {
        if (title.length === 0) title = "Page 1";

        title = truncateSpaces(title);

        if (parent.pages.every((page) => page.title !== title)){
            setPageRefs(pageRefs.slice(0, pageRefs.length - 1).concat(new PageRef(title, parent.path)));
            parent.createPage(title);
        } else {
            if (title === "Page 1") {
                let latestPage = 2;
                for (let i = 0; i < pageRefs.length; i++){
                    if (pageRefs[i].title === "Page " + latestPage) {
                        latestPage++;
                        i = -1;
                    }
                }
                title = "Page " + latestPage;
            }
            setPageRefs(pageRefs.slice(0, pageRefs.length - 1).concat(new PageRef(title, parent.path)));
            parent.createPage(title);
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
                <PageList pageRefs={pageRefs} addPage={addPage} setSelectedPage={setSelectedPage} />
            </div>

        </div>
    )
}
