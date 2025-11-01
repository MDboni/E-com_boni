import React, { useEffect } from 'react';
import WishStore from '../../Store/WishStore';
import StarRatings from 'react-star-ratings';

const WishList = () => {
  const { WishListGate, WishListRequest } = WishStore();

  useEffect(() => {
    (async () => {
      await WishListRequest();
    })();
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        {WishListGate?.map((item, i) => {
          let price = <p className="bodyMedium text-dark my-1">Price: ${item.product.price}</p>;
          if (item.product.discount) {
            price = (
              <p className="bodyMedium text-dark my-1">
                Price: <strike>${item.product.price}</strike> ${item.product.discountPrice}
              </p>
            );
          }

          return (
            <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
              <div className="card shadow-sm h-100 rounded-3 bg-white">
                <img alt="" className="w-100 rounded-top-2" src={item.product.image} />
                <div className="card-body">
                  <p className="bodySmal text-secondary my-1">{item.product.title}</p>
                  {price}
                  <StarRatings
                    rating={parseFloat(item.product.star)}
                    starRatedColor="red"
                    starDimension="15px"
                    starSpacing="2px"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishList;
