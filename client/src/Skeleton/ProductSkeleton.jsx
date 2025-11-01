import Lottie from "lottie-react";
import animation from "../assets/images/image.json";
import Skeleton from "react-loading-skeleton";

const ProductSkeleton = () => {
  return (
    <div><div className="container">
        <div className="row">
            {
                Array.from({length:4}).map(()=>{
                    return(
                        <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                            <div className="card shadow-sm h-100 rounded-3 bg-white">
                                <Lottie className="w-100" animationData={animation} loop={true} />
                                <div className="card-body">
                                <Skeleton count={3} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
</div></div>
  )
}

export default ProductSkeleton