import Lottie from "lottie-react";
import animation from "../assets/images/image.json";
import Skeleton from "react-loading-skeleton";


const SliderSkeleton = () => {
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                    <Skeleton count={7} />
                    <br />
                    <Skeleton count={7} />
                </div>
                <div className="col-12 col-lg-5 col-sm-12 col-md-5 ">
                    <Lottie className="w-75 " animationData={animation} loop={true} />
                </div>
            </div>
        </div>
    </div>

  );
};

export default SliderSkeleton;
