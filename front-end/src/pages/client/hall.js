import React, { useEffect, useState } from 'react';
import { Nuvbar } from '../../components/navbar';
import { useParams } from 'react-router-dom';
import { ContactUs } from '../../components/contactUs';
import Calendar from '../../components/calendar';
import FullWidthTabs from '../../components/froms/navTabs';
import BasicTable from '../../components/froms/tableOredr';
import "react-image-gallery/styles/css/image-gallery.css";
import instance from '../../API';
import Images from '../../components/imageGallery';

export const Hall = ({ dateState }) => {
    const [date, setDate] = useState()
    const [dateE, setDateE] = useState()
    const [hall, setHall] = useState()
    const { name } = useParams();
    useEffect(() => {
        if (typeof dateState === "object") {
            setDateE(dateState)
        }
        async function dataHall() {
            try {
                const { data } = await instance.get(`/halls/${name}`);

                setHall(data[0])
            } catch (error) {
                return error.message
            }
        }
        dataHall()

    }, [])
    return (
        <div >
            <Nuvbar />
            <h1 style={{ fontSize: 70 }}> {`${name} אולמי`}</h1>
            <Images imgs={hall?.images} />
            

            {/* <div >
                <Calendar setDate={setDate} dateE={dateE} setDateE={setDateE}
                    idHall={hall?.id_hall}
                />
            </div> */}
            <div style={{ display: "inline-block" ,backgroundColor:"#FFF8DC"}}>
                <FullWidthTabs 
                setDate={setDate} dateE={dateE} setDateE={setDateE} date={date}
                hall={hall}
               />
            </div>
            <div style={{ display: "inline-block" }}>
                {/* <BasicTable /> */}
            </div>
            <ContactUs />
        </div>)
}