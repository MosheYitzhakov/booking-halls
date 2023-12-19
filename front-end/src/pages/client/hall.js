import React, { useEffect, useState } from 'react';
import { Nuvbar } from '../../components/navbar';
import { useLocation, useParams } from 'react-router-dom';
import { ContactUs } from '../../components/contactUs';
import Calendar from '../../components/calendar';
import FullWidthTabs from '../../components/froms/navTabs';
import ImageGallery from "react-image-gallery";
import BasicTable from '../../components/tableOredr';
import "react-image-gallery/styles/css/image-gallery.css";
import instance from '../../API';
const images = [
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
];
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

            <ImageGallery
                autoPlay={true}
                showThumbnails={false}
                items={images} />

            <h1> {`${name} אולמי`}</h1>
            <div>
                <Calendar setDate={setDate} dateE={dateE} setDateE={setDateE}
               idHall={hall ? hall.id_hall: " "}
                />
            </div>
            <div style={{ display: "inline-block" }}>
                <FullWidthTabs />
            </div>
            <div style={{ display: "inline-block" }}>
                <BasicTable />
            </div>
            <ContactUs />
        </div>)
}