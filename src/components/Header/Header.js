import './header.css';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';

function Header()
{
    return (
        <>
            <div className="loader-wrapper">
                <div className="loader"></div>
                <div className="loader-section section-left"></div>
                <div className="loader-section section-right"></div>
            </div>

            <nav className="navbar navbar-expand-sm navbar-light py-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img
                            src={ logo }
                            width="130"
                            height="100%"
                            alt="Logo"
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse justify-content-end"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link className="nav-link fw-bold fs-5" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-bold fs-5" to="/account">Account</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-bold fs-5" to="/presale">Presale</Link>
                            </li>
                        </ul>

                        <div className="d-flex">
                            <button
                                className="btn btn-outline-success btn-connect fw-bold fs-4"
                                type="submit"
                                data-bs-toggle="modal" data-bs-target="#connectWallet"
                            >
                                Connect
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>

    );
}

export default Header;