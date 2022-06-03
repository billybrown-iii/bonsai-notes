import { useState } from 'react';
import { Node, createDummyHomeNode} from '../Classes/node.js'

import './Sidebar.css';

function Sidebar(){
    
    const parent = createDummyHomeNode();

    const list = parent.nodes.map((item) => {
        return (
            <div className="node">{item.title}</div>
        )
    })

    const addNode = () => {
        const newNode = new Node("new");
        parent.nodes.push(newNode);
        console.log(parent.nodes.length);
    }

    return (
        <div id="sidebar">
            <div id="back-button">{parent.title}</div>
            <div id="sidebar-btns">
                <div onClick={addNode} id="new-node">+</div>
            </div>
            <div>{list}</div>
        </div>
    )
}

export default Sidebar;