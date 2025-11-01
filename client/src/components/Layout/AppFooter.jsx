import { Link } from "react-router-dom";

const AppFooter = () => {
  return (
    <footer className="mt-5 border-top">
      {/* ===== Top Footer Section ===== */}
      <div className="section-bottom bg-light shadow-sm">
        <div className="container py-5">
          <div className="row gy-4">

            {/* ===== Legals ===== */}
            <div className="col-md-4">
              <h5 className="fw-bold mb-3 text-uppercase text-secondary">Legals</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link className="text-decoration-none text-dark" to="/about">About</Link>
                </li>
                <li className="mb-2">
                  <Link className="text-decoration-none text-dark" to="/refund">Refund Policy</Link>
                </li>
                <li className="mb-2">
                  <Link className="text-decoration-none text-dark" to="/terms">Terms</Link>
                </li>
              </ul>
            </div>

            {/* ===== Information ===== */}
            <div className="col-md-4">
              <h5 className="fw-bold mb-3 text-uppercase text-secondary">Information</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link className="text-decoration-none text-dark" to="/howtoBuy">How to Buy</Link>
                </li>
                <li className="mb-2">
                  <Link className="text-decoration-none text-dark" to="/contact">Contact</Link>
                </li>
                <li className="mb-2">
                  <Link className="text-decoration-none text-dark" to="/complain">Complain</Link>
                </li>
              </ul>
            </div>

            {/* ===== About ===== */}
            <div className="col-md-4">
              <h5 className="fw-bold mb-3 text-uppercase text-secondary">About</h5>
              <p className="text-muted small">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum.
              </p>
              <img
                className="w-75 rounded mt-3"
                src="https://www.uiu.ac.bd/wp-content/uploads/2021/02/Card-Logo-Pay-With-01-1.png"
                alt="Payment Methods"
              />
            </div>

          </div>
        </div>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="bg-dark py-3 text-center">
        <p className="text-white mb-0 small">
          © {new Date().getFullYear()} All Rights Reserved | Developed by <span className="fw-semibold text-info">BONI AMIN JAYED</span>
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
