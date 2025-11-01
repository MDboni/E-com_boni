
import { Link } from "react-router-dom";
import ProductStore from "../../Store/ProductStore";
import StarRatings from "react-star-ratings";
import { useState } from "react";
import { useEffect } from "react";

const ListByProducts = () => {
  const { ProductListByBCK ,BrandStore, BrandListRequest, CategoryStore, CategoryListRequest ,ProductListByFilterRequest } = ProductStore();
  const [ Filter,SetFilter ] = useState({brandID:"", categoryID:"", priceMax:"", priceMin:""})

  const inputOnChange = (name,value)=>{
    SetFilter((data)=>({
      ...data,
      [name]:value
    }))
  }
 

  useEffect(() => {
      (async () => {
        if (BrandStore === null) await BrandListRequest();
        if (CategoryStore === null) await CategoryListRequest();

        let isEmpty = Object.values(Filter).every(v => v === "");
        if (isEmpty) {
          await ProductListByFilterRequest({}); 
        } else {
          await ProductListByFilterRequest(Filter);
      }
      })();
}, [Filter]);


  return (
    <div>
      <div className="container mt-2">
        <div className="row">
            <div className="col-md-3">
              <div className="card w-100 p-3 shadow-sm">

                  <label className="form-label mt-3">Brands</label>
                  <select
                    className="form-control form-select"
                    value={Filter.brandID}
                    onChange={(e) => inputOnChange("brandID", e.target.value)}
                  >
                    <option value="">Choose Brand</option>
                    {BrandStore && BrandStore.length > 0 ? (
                      BrandStore.map((item, i) => (
                        <option key={i} value={item._id}>
                          {item.brandName}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Brands Found</option>
                    )}
                  </select>

                  <label className="form-label mt-3">Categories</label>
                  <select
                    className="form-control form-select"
                    value={Filter.categoryID}
                    onChange={(e) => inputOnChange("categoryID", e.target.value)}
                  >
                    <option value="">Choose Category</option>
                    {CategoryStore && CategoryStore.length > 0 ? (
                      CategoryStore.map((item, i) => (
                        <option key={i} value={item._id}>
                          {item.categoryName}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Categories Found</option>
                    )}
                  </select>


                  <label className="form-label mt-3">Maximum Price ${Filter.priceMax}</label>
                  <input 
                   value={Filter.priceMax}
                   onChange={(e)=>{inputOnChange('priceMax',e.target.value)}}
                    min={0} 
                    max={100000} 
                    step={1000} 
                    type="range" 
                    className="form-range" 
                  />
                   <label className="form-label mt-3">Minimum Price ${Filter.priceMin}</label>
                  <input 
                   value={Filter.priceMin}
                   onChange={(e)=>{inputOnChange('priceMin',e.target.value)}}
                    className="form-range" 
                    min={0} 
                    max={100000} 
                    step={1000} 
                    type="range" 
                  />
              </div>
            </div>

            <div className="col-md-9">
              <div className="container">
                <div className="row">
                  {/* Product List Here */}

                   {ProductListByBCK.map((item) => {
                        // Price logic
                        const price = item.discount === 'true' ? (
                          <p className="bodyMedium text-dark my-1">
                            Price: <strike> ${item.price}</strike> ${item.discount}
                          </p>
                        ) : (
                          <p className="bodyMedium text-dark my-1">Price: ${item.price}</p>
                        );

                        return (
                          <div key={item._id} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                            <Link to={`/By-product/${item._id}`} className="card shadow-sm h-100 rounded-3 bg-white">
                              <img className="w-100 rounded-top-2" src={item.image} alt={item.title} />
                              <div className="card-body">
                                <p className="bodySmal text-secondary my-1">{item.title}</p>
                                {price}
                                <StarRatings
                                  rating={parseFloat(item.star)}
                                  starRatedColor="red"
                                  starDimension="15px"
                                  starSpacing="2px"
                                />
                              </div>
                            </Link>
                          </div>
                        );
                  })}

                </div>
              </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default ListByProducts;
