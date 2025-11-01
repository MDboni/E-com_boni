

import ProductStore from '../../Store/ProductStore'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"


const ProductImages = () => {
    const { ProductDetailsStore } = ProductStore()
    let images=[
        {original: ProductDetailsStore[0]['detail']['img1'], thumbnail: ProductDetailsStore[0]['detail']['img1']},
        {original: ProductDetailsStore[0]['detail']['img2'], thumbnail: ProductDetailsStore[0]['detail']['img2']},
        {original: ProductDetailsStore[0]['detail']['img3'], thumbnail: ProductDetailsStore[0]['detail']['img3']},
        {original: ProductDetailsStore[0]['detail']['img4'], thumbnail: ProductDetailsStore[0]['detail']['img4']},
        {original: ProductDetailsStore[0]['detail']['img5'], thumbnail: ProductDetailsStore[0]['detail']['img5']},
        {original: ProductDetailsStore[0]['detail']['img6'], thumbnail: ProductDetailsStore[0]['detail']['img6']},
        {original: ProductDetailsStore[0]['detail']['img7'], thumbnail: ProductDetailsStore[0]['detail']['img7']},
        {original: ProductDetailsStore[0]['detail']['img8'], thumbnail: ProductDetailsStore[0]['detail']['img8']},
    ]
 
    return (
        <div>
            <ImageGallery autoPlay={true} items={images}/>
        </div>
    );
}

export default ProductImages