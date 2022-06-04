import { useState } from 'react';
import { Node, createDummyHomeNode} from '../Classes/node.js'

import './Sidebar.css';

const parent = createDummyHomeNode();

function Sidebar(){
    
    // moved outside of component
    // const parent = createDummyHomeNode();

    const startNodeRefs = parent.nodes.slice().map((item) => {return {title: item.title}});
    const [nodeRefs, setNodeRefs] = useState(startNodeRefs);

    const list = nodeRefs.map((item) => {
        return (
            <div className="node">{item.title}</div>
        )
    })

    const addNode = () => {
        const newNode = new Node("new");
        parent.nodes.push(newNode);
        console.log(parent.nodes);
        
        // this breaks it.
        // I'm thinking it closes over and carries "parent" off to React-land.
        // *\\\----------///*
        // I changed my mind.
        // I think it simply re-rendered the component (thereby re-inizializing "parent").
        // setCount(count + 1);
        // *\\\----------///*
        // fixed by moving parent out of component.

        setNodeRefs(parent.nodes.slice().map((item) => {return {title: item.title}}))
    }

    return (
        <div id="sidebar">
            <div id="back-button">{parent.title}</div>
            <div id="sidebar-btns">
                <div onClick={() => {
                    addNode();
                }
                } id="new-node">+</div>
            </div>
            <div>{list}</div>
        </div>
    )
}

export default Sidebar;