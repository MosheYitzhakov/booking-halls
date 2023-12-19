import React, { useState } from 'react';
import { Nuvbar } from '../../components/navbar';
import { useParams } from 'react-router-dom';
import { ContactUs } from '../../components/contactUs';
import QuiltedImageList from '../../components/imgesPH';
import Calendar from '../../components/calendar';
import FullWidthTabs from '../../components/froms/navTabs';
import ImageGallery from "react-image-gallery";
import BasicTable from '../../components/tableOredr';
import "react-image-gallery/styles/css/image-gallery.css";
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
export const Hall = () => {
    const [date, setDate] = useState()
    const { name } = useParams();
    return (
        <div >
            <Nuvbar />
            {/* <QuiltedImageList/> */}
            {/* <div style={{
                marginTop: "5rem",
                maxWidth: 800,
                width: "100%",
                margin: "0 auto",
                border: "1px solid rgb(146, 129, 242)",
                boxShadow: "#2b15453d 1px 10px 10px 5px"
            }}> */}
                <ImageGallery

                    autoPlay={true}
                    showThumbnails={false}
                    items={images} />
            {/* </div > */}
            <h1> {`${name} אולמי`}</h1>
            <div>
                <Calendar setDate={setDate} />
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