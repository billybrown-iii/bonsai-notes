import { useState, useEffect } from 'react';
import NodeRef from '../Classes/NodeRef.js';
import PageRef from '../Classes/PageRef.js';
import NodeList from './NodeList.js';
import PageList from './PageList.js'
import './Sidebar.css';

export default function Sidebar(props){
    const { setSelectedPage, path, setPath, parent } = props;

    const [nodeRefs, setNodeRefs] = useState(parent.nodeRefGen());
    const [pageRefs, setPageRefs] = useState(parent.pageRefGen());
    
    // When the path changes, update displayed nodes/pages and hide the editor.
    useEffect(() => {
        setNodeRefs(parent.nodeRefGen());
        setPageRefs(parent.pageRefGen());
        setSelectedPage(null);
    }, [path])

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
        <div id="sidebar">
            <div id="back-button" 
             onClick={() => { if (path.length > 1) setPath(path.slice(0, path.length - 1))}
            }>🔙</div>
            <div id="sidebar-node-title">{parent.title}</div>
            <div id="sidebar-btns">
                <div onClick={newNode} id="new-node-btn">New Node</div>
                <div onClick={newPage} id="new-page-btn">New Page</div>
            </div>
            <div id="sidebar-list">
                <NodeList nodeRefs={nodeRefs} addNode={addNode} setPath={setPath}/>
                <hr />
                <PageList pageRefs={pageRefs} addPage={addPage} setSelectedPage={setSelectedPage}/>
            </div>
        </div>
    )
}
