import React from 'react';
import { Link } from "react-router-dom";
export const Nuvbar = ({thisPage}) => {
    // const split = pathname.split('/');
    // let addLink = `/${split[1]}`
    return (
            <nav>
                <span key={"i*2"}>{  thisPage + ' / '}</span>
                <span key={"2gg"}><Link to={"/"}>{"main"}</Link>{" "}</span>
            </nav>
    )
} 