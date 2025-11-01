import Lottie from "lottie-react";
import Skeleton from "react-loading-skeleton";
import animation from "../assets/images/image.json"; // Lottie animation import

const FeatersSkeleton = () => {
  return (
    <div className="container section">
      <div className="row">
        {
            Array.from({length:4}).map((_,i)=>{
                return(
                     <div key={i}  className="col-6 col-sm-6 col-md-3 col-lg-3 p-2">
                        <div className="card shadow-sm">
                            <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-4">
                                <Lottie className="w-100" animationData={animation} loop={true} />
                                </div>
                                <div className="col-8">
                                <Skeleton count={3} />
                                </div>
                            </div>
                            </div>
                        </div>
                     </div>
                )
            })
        }
      </div>
    </div>
  );
};

export default FeatersSkeleton;
