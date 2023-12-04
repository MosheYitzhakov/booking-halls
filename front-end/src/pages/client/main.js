import Bar from "../../components/bar"
import React from 'react';
import Hall from "../../components/hall";


export const Main = () => {
    return (
        <>
            <Bar />
            <div>
                <input type="button" name="name" value="בחר תאריך " />
            </div>
            <div>
                <input type="text" name="name" placeholder="בחר אולם" />
            </div>
            <div>
                <Hall/>
            </div>

        </>
    )
}