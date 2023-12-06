import React from 'react';
import { Nuvbar } from '../../components/navbar';
import { useParams } from 'react-router-dom';
import { ContactUs } from '../../components/contactUs';
import QuiltedImageList from '../../components/imgesPH';
import Calendar from '../../components/calendar';
import FullWidthTabs from '../../components/froms/navTabs';
import { FromOrder } from '../../components/froms/fromOrder';
import BasicTable from '../../components/tableOredr';

export const Hall = () => {
    const { name } = useParams();
    return (
        <div >
            <Nuvbar />
            <QuiltedImageList/>
            <h1> {`${name} שם האולם `}</h1>
            <div>
                {/* <input type="text" name="name" placeholder="התאריך הנבחר " /> */}
                <Calendar />
            </div>
            <div style={{display:"inline-block"}}>
            <FullWidthTabs/>
            {/* <FromOrder/> */}
            </div>
            <div style={{display:"inline-block"}}>
            <h1>חשבונית</h1>
            <BasicTable/>
            </div>
            <ContactUs />
            {/* <From /> */}
        </div>)
}