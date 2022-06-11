import { useState } from 'react';
import { Node, createDummyHomeNode } from '../Classes/Node.js'
import NodeRef from '../Classes/NodeRef.js'
import List from './List.js'

import './Sidebar.css';

const dummyHomeNode = createDummyHomeNode();
dummyHomeNode.createChildNode("Node 4")

console.log(dummyHomeNode)

let path = ['home'] // add ids into this array as you navigate through the homeNode object

function Sidebar(){

    const [parentNodeRef, setParentNodeRef] = useState(new NodeRef(dummyHomeNode.title))

    const [navPath, setNavPath] = useState(['home']);

    // const parentNodeRef = navToNode(navPath)

    const startNodeRefs = dummyHomeNode.nodes.slice().map((item) => new NodeRef(item.title));
    const [nodeRefs, setNodeRefs] = useState(startNodeRefs);

    const newNode = () => {
        const newNodeRef = new NodeRef("New Node", null, true)
        setNodeRefs([...nodeRefs, newNodeRef])
    }    

    const addNode = (title) => {
        if (title.length === 0) title = "New Node";

        if (dummyHomeNode.nodes.every((node) => node.title !== title)){
            setNodeRefs(nodeRefs.slice(0, nodeRefs.length - 1).concat(new NodeRef(title)))
            dummyHomeNode.createChildNode(title);
            console.log(dummyHomeNode.nodes);
        } else {
            setNodeRefs(nodeRefs.slice(0, nodeRefs.length - 1))
            alert("use a different name");
        }


    }

    return (
        <div id="sidebar">
            <div id="back-button">{parentNodeRef.title}</div>
            <div id="sidebar-btns">
                <div onClick={newNode} id="new-node">+</div>
            </div>
            <div><List nodeRefs={nodeRefs} addNode={addNode}/></div>
        </div>
    )
}

export default Sidebar;