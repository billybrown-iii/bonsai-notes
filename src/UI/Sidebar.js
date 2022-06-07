import { useState } from 'react';
import { Node, createDummyHomeNode} from '../Classes/node.js'
import List from './List.js'

import './Sidebar.css';

const parent = createDummyHomeNode();

function Sidebar(){

    const startNodeRefs = parent.nodes.slice().map((item) => {return {title: item.title}});
    const [nodeRefs, setNodeRefs] = useState(startNodeRefs);

    const newNode = () => {
        // const newNode = new Node("new");
        // parent.nodes.push(newNode);
        // console.log(parent.nodes);
        // setNodeRefs([...nodeRefs, {title: newNode.title}])

        let newNodeRef = {title: "New Node", isNew: true}
        setNodeRefs([...nodeRefs, newNodeRef])
    }

    return (
        <div id="sidebar">
            <div id="back-button">{parent.title}</div>
            <div id="sidebar-btns">
                <div onClick={newNode} id="new-node">+</div>
            </div>
            <div><List nodeRefs={nodeRefs} setNodeRefs={setNodeRefs}/></div>
        </div>
    )
}

export default Sidebar;