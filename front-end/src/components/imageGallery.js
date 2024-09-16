import ImageGallery from "react-image-gallery";

          
const image = (imgs)=>{
    let arrImgs=[]
    if(imgs){
    for(let i in imgs){
        let obj={}
        obj.original=require("../images/"+imgs[i].name)
        obj.thumbnail=obj.original
        arrImgs.push(obj);
    }
}
    return arrImgs;
}
export default function Images({ imgs }) {
    const im = image(imgs)
  return (
    <ImageGallery
                autoPlay={true}
                items={im}
            />
  );
}

