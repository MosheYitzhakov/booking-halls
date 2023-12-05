import React from 'react';
import { Nuvbar } from '../../components/navbar';
import { useParams } from 'react-router-dom';
import { ContactUs } from '../../components/contactUs';
import { From } from '../../components/from';
import QuiltedImageList from '../../components/imgesPH';
import Calendar from '../../components/calendar';

export const Hall = () => {
    const { name } = useParams();
    return (
        <div>
            <Nuvbar thisPage={name} />
            <QuiltedImageList/>
            <h1> {`${name} שם האולם `}</h1>
            <div>
                {/* <input type="text" name="name" placeholder="התאריך הנבחר " /> */}
                <Calendar />
            </div>
            <ContactUs />
            <From />
        </div>)
}