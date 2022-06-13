import { useState, useEffect } from 'react';
import { Node, createDummyHomeNode, navObj } from '../Classes/Node.js'
import { NodeRef, nodeRefGen } from '../Classes/NodeRef.js'
import List from './List.js'

import './Sidebar.css';

const homeNode = createDummyHomeNode();
homeNode.createChildNode("Node 4")

// console.log(homeNode)

function Sidebar(){

    const [path, setPath] = useState(["Home"]);

    const parent = navObj(homeNode, path);

    const startNodeRefs = nodeRefGen(parent);
    const [nodeRefs, setNodeRefs] = useState(startNodeRefs);
    
    useEffect(() => {
        setNodeRefs(nodeRefGen(parent))
    }, [path])

    const newNode = () => {
        const newNodeRef = new NodeRef("New Node", null, true)
        setNodeRefs([...nodeRefs, newNodeRef])
    }    

    const addNode = (title) => {
        if (title.length === 0) title = "New Node";

        if (parent.nodes.every((node) => node.title !== title)){
            setNodeRefs(nodeRefs.slice(0, nodeRefs.length - 1).concat(new NodeRef(title)))
            parent.createChildNode(title);
            console.log(parent.nodes);
        } else {
            setNodeRefs(nodeRefs.slice(0, nodeRefs.length - 1))
            alert("use a different name");
        }


    }

    return (
        <div id="sidebar">
            <div id="back-button" onClick={() => {setPath(path.slice(0, path.length - 1))}}>{parent.title}</div>
            <div id="sidebar-btns">
                <div onClick={newNode} id="new-node">+</div>
            </div>
            <div><List nodeRefs={nodeRefs} addNode={addNode} path={path} setPath={setPath}/></div>
        </div>
    )
}

export default Sidebar;