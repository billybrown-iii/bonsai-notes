import { useState } from 'react';
import { Node, createDummyHomeNode} from '../Classes/node.js'

import './Sidebar.css';

function Sidebar(){

    const dummyNode = createDummyHomeNode();
    
    const listOfNodes = dummyNode.nodes.map((item) => {
        return (
            <div>{item.title}</div>
        )
    })

    return (
        <div id="sidebar">
            <div id="title">Sidebar! - {1}</div>
            <div>{listOfNodes}</div>
        </div>
    )
}

export default Sidebar;