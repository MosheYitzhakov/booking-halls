import { Nuvbar } from "../../components/navbar";
import { useParams } from "react-router-dom";
import { ContactUs } from "../../components/contactUs";
import NavTabs from "../../components/froms/nav-tabs";
import "react-image-gallery/styles/css/image-gallery.css";
import Images from "../../components/imageGallery";
import UseEffect from "../../hooks/useEffect";
import { Loading } from "../../components/loading";

export const Hall = () => {
  const { name } = useParams();
  const [hall] = UseEffect(`/halls/${name}`) || "";
  if (!hall) {
    return <Loading />;
  } else {
    return (
      <div>
        <Nuvbar />
        <h1 style={{ fontSize: 70 }}>{name}</h1>
        {hall.images.length && <Images imgs={hall.images} />}
        <div style={{ display: "inline-block", backgroundColor: "#FFF8DC" }}>
          <NavTabs hall={hall} />
        </div>
        <ContactUs />
      </div>
    );
  }
};
