import { useState } from 'react';
import ProductStore from '../../Store/ProductStore';
import CategoriesSkeleton from '../../Skeleton/CategoriesSkeleton';
import { Link } from 'react-router-dom';

const Categories = () => {
    const { CategoryStore } = ProductStore();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24;

    if (!CategoryStore) return <CategoriesSkeleton />;

    const totalPages = Math.ceil(CategoryStore.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = CategoryStore.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <h1 className="headline-4 text-center my-2 p-0">Top Categories</h1>
                    <span className="bodySmal mb-5 text-center d-block">
                        Explore a World of Choices Across Our Most Popular <br />Shopping Categories
                    </span>

                    {currentItems.map((item) => (
                        <div key={item._id} className="col-6 col-md-4 col-lg-3 p-2 text-center">
                            <Link to={`/by-categori/${item._id}`} className="card h-100 rounded-3 bg-light">
                                <div className="card-body">
                                    <img alt={item.categoryName} className="w-75" src={item.categoryImg} />
                                    <p className="bodySmal mt-3">{item.categoryName}</p>
                                </div>
                            </Link>
                        </div>
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4 gap-2 flex-wrap">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded bg-light"
                            >
                                Prev
                            </button>

                            {/* Show 5 page numbers max, dots if more */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter((page) => {
                                    if (totalPages <= 5) return true;
                                    if (currentPage <= 3) return page <= 5;
                                    if (currentPage >= totalPages - 2) return page >= totalPages - 4;
                                    return page >= currentPage - 2 && page <= currentPage + 2;
                                })
                                .map((page, idx, arr) => (
                                    <span key={page} className="d-flex align-items-center">
                                        {idx === 0 && page > 1 ? <span className="px-1">...</span> : null}
                                        <button
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-1 rounded ${
                                                currentPage === page ? 'bg-primary text-white' : 'bg-light'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                        {idx === arr.length - 1 && page < totalPages ? <span className="px-1">...</span> : null}
                                    </span>
                                ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded bg-light"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Categories;
