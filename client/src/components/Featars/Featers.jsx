import FeatersSkeleton from "../../Skeleton/FeatersSkeleton";
import FeatureStoreZustin from "../../Store/FetereStore";

const Featers = () => {
    const { FeatureStore } = FeatureStoreZustin();

    // data না থাকলে skeleton show
    if (!FeatureStore) {
        return <FeatersSkeleton />;
    }

    return (
        <div className="container section">
            <div className="row">
                {FeatureStore.map((feature) => (
                    <div key={feature._id} className="col-6 p-2 col-md-3 col-lg-3 col-sm-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-3">
                                        <img
                                            className="w-100"
                                            src={feature?.image }
                                            alt={feature.name}
                                        />
                                    </div>
                                    <div className="col-9">
                                        <h3 className="bodyXLarge">{feature.name}</h3>
                                        <span className="bodySmal">{feature.description}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Featers;
