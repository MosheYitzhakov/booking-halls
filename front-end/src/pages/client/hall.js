import React from 'react';
import { Nuvbar } from '../../components/navbar';
import { useParams } from 'react-router-dom';
import { ContactUs } from '../../components/contactUs';
import QuiltedImageList from '../../components/imgesPH';
import Calendar from '../../components/calendar';
import FullWidthTabs from '../../components/froms/navTabs';
import BasicTable from '../../components/tableOredr';

export const Hall = () => {
    const { name } = useParams();
    return (
        <div >
            <Nuvbar />
            <QuiltedImageList/>
            <h1> {`${name} שם האולם `}</h1>
            <div>
                <Calendar />
            </div>
            <div style={{display:"inline-block"}}>
            <FullWidthTabs/>
            </div>
            <div style={{display:"inline-block"}}>
            <BasicTable/>
            </div>
            <ContactUs />
        </div>)
}