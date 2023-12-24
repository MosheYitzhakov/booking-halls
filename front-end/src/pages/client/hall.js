import React, { useContext, useEffect, useState } from 'react';
import { Nuvbar } from '../../components/navbar';
import { useParams } from 'react-router-dom';
import { ContactUs } from '../../components/contactUs';
import Calendar from '../../components/calendar';
import FullWidthTabs from '../../components/froms/navTabs';
import BasicTable from '../../components/froms/tableOredr';
import "react-image-gallery/styles/css/image-gallery.css";
import instance from '../../API';
import Images from '../../components/imageGallery';
import { Dates } from '../../hooks/useContext';
import Effect from '../../hooks/useEffect';

export const Hall = () => {
    const { name } = useParams();
    const hall = Effect(`/halls/${name}`)
    return (
        <div >
            <Nuvbar />
            <h1 style={{ fontSize: 70 }}> {`${name} אולמי`}</h1>
            <Images imgs={hall?.images} />
            <div style={{ display: "inline-block" ,backgroundColor:"#FFF8DC"}}>
                <FullWidthTabs   hall={hall} />
            </div>
         
            <ContactUs />
        </div>)
}