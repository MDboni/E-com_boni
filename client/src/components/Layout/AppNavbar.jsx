import { Link } from "react-router-dom";
import ProductStore from "../../Store/ProductStore";
import { UserStore } from "../../Store/UserStore";
import { CartStore } from "../../Store/CartStore";
import { useEffect } from "react";
import WishStore from "../../Store/WishStore";

const AppNavbar = () => {
  const { SearchKeyword, SetSearchKeyword } = ProductStore();
  const CartCount = CartStore((state) => state.CartCount);
  const CartListRequest = CartStore((state) => state.CartListRequest);
  const {WishCount,WishListRequest } = WishStore()
  const {isLogin , UserLogoutRequest} = UserStore()

  const LogOutHandel = async () => {
    await UserLogoutRequest();
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  };

   useEffect(() => {
  const fetchData = async () => {
    try {
      if (isLogin()) {
        await CartListRequest();
        await WishListRequest();
      }
    } catch (error) {
      console.error("Navbar fetch error:", error);
    }
  };

  fetchData();
}, [CartListRequest, WishListRequest, isLogin]);


    

    
  return (
    <>
      {/* Topbar */}
      <div className="container-fluid text-white p-2" style={{ backgroundColor: "#1F2937" }}>
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-md-6">
              <span className="me-3 small">
                <i className="bi bi-envelope"></i> aminboni048@gmail.com
              </span>
              <span className="small">
                <i className="bi bi-telephone"></i> 01733427955
              </span>
            </div>

            <div className="col-md-6 text-end">
              <i className="bi bi-whatsapp mx-2" style={{ color: "#25D366", fontSize: "1.2rem" }}></i>
              <i className="bi bi-youtube mx-2" style={{ color: "#1877F2", fontSize: "1.2rem" }}></i>
              <i className="bi bi-facebook mx-2" style={{ color: "#1877F2", fontSize: "1.2rem" }}></i>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar sticky-top navbar-expand-lg shadow-sm" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/logo.png" alt="Logo" width="110" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-3"><Link className="nav-link fw-semibold text-dark" to="/">Home</Link></li>
              <li className="nav-item me-3"><Link className="nav-link fw-semibold text-dark" to="/shop">Shop</Link></li>
              <li className="nav-item me-3"><Link className="nav-link fw-semibold text-dark" to="/about">About</Link></li>
              <li className="nav-item me-3"><Link className="nav-link fw-semibold text-dark" to="/contact">Contact</Link></li>
            </ul>

            <div className="d-flex align-items-center">
              <div className="input-group">
                <input
                  onChange={(e) => SetSearchKeyword(e.target.value)}
                  className="form-control"
                  type="search"
                  placeholder="Search products..."
                />
                <Link
                  to={SearchKeyword.length > 0 ? `/by-Keyword/${SearchKeyword}` : '/'}
                  className="btn btn-outline-secondary"
                >
                  <i className="bi bi-search"></i>
                </Link>
              </div>

              <Link to="/cart" type="button" className="btn ms-2 btn-light position-relative">
                    <i className="bi text-dark bi-bag"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">{CartCount}</span>
              </Link>

              <Link to="/wish" className="btn ms-2 btn-light position-relative">
                <i className="bi bi-heart text-danger"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">{WishCount}</span>
              </Link>

              {isLogin() ? (
                <>
                  <Link className="btn ms-3 btn-primary d-flex text-white" to="/profile">Profile</Link>
                  <button onClick={LogOutHandel} className="btn ms-2 btn-outline-primary d-flex">Logout</button>
                </>
              ) : (
                <Link className="btn ms-2 btn-outline-primary d-flex" to="/login">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavbar;
