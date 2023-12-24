import { Nuvbar } from '../../components/navbar';
import { useParams } from 'react-router-dom';
import { ContactUs } from '../../components/contactUs';
import FullWidthTabs from '../../components/froms/navTabs';
import "react-image-gallery/styles/css/image-gallery.css";
import Images from '../../components/imageGallery';
import Effect from '../../hooks/useEffect';

export const Hall = () => {
    const { name } = useParams();
    const hall = Effect(`/halls/${name}`)
    return (
        <div >
            <Nuvbar />
            <h1 style={{ fontSize: 70 }}> {`${name} אולמי`}</h1>
            <Images imgs={hall &&hall[0].images} />
            <div style={{ display: "inline-block" ,backgroundColor:"#FFF8DC"}}>
                <FullWidthTabs   hall={hall} />
            </div>
         
            <ContactUs />
        </div>)
}