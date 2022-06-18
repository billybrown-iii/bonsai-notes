import { useState, useEffect } from 'react';
import { Node, createDummyHomeNode, navObj } from '../Classes/Node.js';
import { NodeRef, nodeRefGen } from '../Classes/NodeRef.js';
import {PageRef, pageRefGen} from '../Classes/PageRef.js';
import NodeList from './NodeList.js';
import PageList from './PageList.js'

import './Sidebar.css';

const homeNode = createDummyHomeNode();
homeNode.createChildNode("Node 4");

console.log(homeNode);

const startNodeRefs = nodeRefGen(homeNode);
const startPageRefs = pageRefGen(homeNode);

function Sidebar(){
    const [path, setPath] = useState(["Home"]);

    const parent = navObj(homeNode, path);

    const [nodeRefs, setNodeRefs] = useState(startNodeRefs);
    const [pageRefs, setPageRefs] = useState(startPageRefs);
    
    useEffect(() => {
        setNodeRefs(nodeRefGen(parent));
        setPageRefs(pageRefGen(parent));
    }, [path])

    /** Adds a temporary placeholder nodeRef, pending naming and confirmation */
    const newNode = () => {
        const newNodeRef = new NodeRef("New Node", [null]);
        setNodeRefs([...nodeRefs, newNodeRef]);
    }

    const truncateSpaces = (str) => {
        if (str[0].match(/\s/)) str = str.slice(1);
        if (str[str.length - 1].match(/\s/)) str = str.slice(0, str.length - 1);
        return str;
    }

    /**
     * Adds new node to nodeRefs and parent object
     * @param {string} title 
     */
    const addNode = (title) => {
        if (title.length === 0) title = "New Node";

        title = truncateSpaces(title);

        if (parent.nodes.every((node) => node.title !== title)){
            setNodeRefs(nodeRefs.slice(0, nodeRefs.length - 1).concat(new NodeRef(title, parent.path)));
            parent.createChildNode(title);
            console.log(parent.nodes);
        } else {
            setNodeRefs(nodeRefs.slice(0, nodeRefs.length - 1));
            alert("use a different name");
        }
    }

    /** Adds a temporary placeholder pageRef. */
    const newPage = () => {
        // implement page titles later
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
            console.log(parent.pages);
        } else {
            setPageRefs(pageRefs.slice(0, pageRefs.length - 1));
            alert("use a different name");
        }
    }

    return (
        <div id="sidebar">
            <div id="back-button" onClick={() => {setPath(path.slice(0, path.length - 1))}}>🔙</div>
            <div id="sidebar-node-title">{parent.title}</div>
            <div id="sidebar-btns">
                <div onClick={newNode} id="new-node-btn">New Node</div>
                <div onClick={newPage} id="new-page-btn">New Page</div>
            </div>
            
            <div id="sidebar-list">
                <NodeList nodeRefs={nodeRefs} addNode={addNode} path={path} setPath={setPath}/>
                <hr />
                <PageList pageRefs={pageRefs} addPage={addPage}/>
            </div>
        </div>
    )
}

export default Sidebar;