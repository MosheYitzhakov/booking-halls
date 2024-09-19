import { Nuvbar } from "../../components/navbar";
import { useParams } from "react-router-dom";
import { ContactUs } from "../../components/contactUs";
import FullWidthTabs from "../../components/froms/navTabs";
import "react-image-gallery/styles/css/image-gallery.css";
import Images from "../../components/imageGallery";
import UseEffect from "../../hooks/useEffect";
import { Err } from "../../error";

export const Hall = () => {
  const { name } = useParams();
  const hall = UseEffect(`/halls/${name}`);
  if (typeof hall === "string") {
    return <Err />;
  } else {
    return (
      <div>
        <Nuvbar />
        <h1 style={{ fontSize: 70 }}>{name}</h1>
        {hall?.[0]?.images?.[0]?.name && <Images imgs={hall?.[0]?.images} />}
        <div style={{ display: "inline-block", backgroundColor: "#FFF8DC" }}>
          <FullWidthTabs hall={hall?.[0]} />
        </div>
        <ContactUs />
      </div>
    );
  }
};
