import StarRatings from "react-star-ratings/build/star-ratings.js";
import ProductStore from "../../Store/ProductStore";

const Reviews = () => {
    const { ProductReviewListStore } = ProductStore();

    return (
        <div>
            {ProductReviewListStore?.length > 0 ? (
                <ul className="list-group mt-4 list-group-flush">
                    {ProductReviewListStore.map((item, i) => (
                        <li key={item._id} className="list-group-item bg-transparent">
                            <h6 className="m-0 p-0">
                                <i className="bi bi-person"></i> {item.profile.cus_name}
                            </h6>
                            <StarRatings
                                rating={+item.rating}
                                starRatedColor="red"
                                starDimension="15px"
                                starSpacing="2px"
                            />
                            <p>{item.des}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted mt-3">No reviews yet.</p>
            )}
        </div>
    );
};

export default Reviews;
