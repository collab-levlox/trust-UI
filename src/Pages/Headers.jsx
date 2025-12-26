import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import logoJpg from "../assets/img/logo/Annamalai12  1.jpg";
import logoPng from "../assets/img/logo/Annamalai12 1.png";

const Header = () => {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = (e) => {
        e.preventDefault();
        setMenuActive(!menuActive);
        document.body.classList.toggle("overflow-hidden", !menuActive);
    };

    const closeMenu = (e) => {
        e.preventDefault();
        setMenuActive(false);
        document.body.classList.remove("overflow-hidden");
    };

    const handleOpen = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        document.body.classList.toggle('overflow-hidden');
        document.querySelector('.off-canvas-menubar')?.classList.toggle('active');
        document.querySelector('.off-canvas-menubar-body')?.classList.toggle('active');
        // keep local state in sync
        setMenuActive(prev => !prev);
    };

    const handleClose = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        document.body.classList.remove('overflow-hidden');
        document.querySelector('.off-canvas-menubar')?.classList.remove('active');
        document.querySelector('.off-canvas-menubar-body')?.classList.remove('active');
        // update state to closed
        setMenuActive(false);
    };

    // auth
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        logout();
        document.body.classList.remove('overflow-hidden');
        setMenuActive(false);
        navigate('/');
    };

    useEffect(() => {


        const header = document.querySelector(".header-section-1");
        let lastScroll = 0;

        const onScroll = () => {
            const current = window.scrollY;
            const trigger = window.innerHeight * 0.4; // 30%

            if (current > lastScroll && current > trigger) {
                header.classList.add("header-hide");
            } else {
                header.classList.remove("header-hide");
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll)
        };
    }, []);

    return (
        <>

            <header className="header-section-1">
                {/* Top Bar */}
                <div className="top-bar d-none d-lg-block">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="top-bar-content d-flex justify-content-between text-center">
                                    <div className="text-wrap gap-5">
                                        <span>
                                            <i className="fa-solid fa-phone"></i> 908-516-3069
                                        </span>
                                        <span>
                                            <i className="fa-solid fa-envelope"></i> info@annamalaitrust.com
                                        </span>
                                    </div>
                                    <div>
                                        <span>BECOME A VOLENTEER</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Logo */}
                <div
                    className="logo d-none d-sm-none d-md-none d-lg-block d-xl-block"
                    style={{ position: "absolute", zIndex: 999, top: 0 }}
                >
                    <Link to="/">
                        <img src={logoJpg} alt="logo" />
                    </Link>
                </div>

                {/* Header Bottom */}
                <div className="header-bottom-layout-2">
                    <div className="header-left">
                        <div className="logo-wrap-2">
                            <Link to="/">
                                <img src={logoPng} alt="logo" />
                            </Link>
                        </div>
                    </div>

                    <div className="w-100 d-none d-lg-block d-xl-block">
                        <div className="header-middle">
                            <nav className="main-menu-2 d-none d-lg-block d-xl-block">
                                <ul>
                                    <li className="has-dropdown">
                                        <Link to="/">HOME</Link>
                                    </li>
                                    <li>
                                        <Link to="/aboutus">ABOUT US</Link>
                                    </li>
                                    <li>
                                        <Link to="/collaborate">COLLABORATE</Link>
                                    </li>
                                    <li className="has-dropdown">
                                        <Link to="/mediatalks">MEDIA TALKS</Link>
                                    </li>
                                    <li>
                                        <Link to="/gallery">GALLERY</Link>
                                    </li>
                                    <li className="has-dropdown">
                                        <Link to="/blog">BLOG</Link>
                                    </li>
                                    <li>
                                        <Link to="/contactus">CONTACT US</Link>
                                    </li>
                                </ul>
                            </nav>

                            <div className="header-info-wrap">
                                <div className="header-btn-wrap d-none d-lg-flex d-xl-flex">
                                    <a className="e-primary-btn has-icon" href="/donate" style={{ fontSize: "16px" }}>
                                        DONATE NOW
                                        <span className="icon-wrap">
                                            <span className="icon">
                                                <i className="fas fa-arrow-right"></i>
                                                <i className="fas fa-arrow-right"></i>
                                            </span>
                                        </span>
                                    </a>
                                    {user && (
                                        <button onClick={handleLogout} className="e-secondary-btn" style={{ marginLeft: 12 }}>
                                            Logout
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="header-right">
                        <div
                            className={`header-bar-3 d-lg-none d-xl-none ${menuActive ? "active" : ""}`}
                            onClick={handleOpen}
                        >
                            <div className="bar bar-1"></div>
                            <div className="bar bar-2"></div>
                            <div className="bar bar-3"></div>
                        </div>
                    </div>

                    {/* Off-canvas Menu Body */}
                    {/* <div className={"off-canvas-menubar"}>
                        <div className={`off-canvas-menubar-body`}>
                            <button data-close="menubar" onClick={closeMenu}>Close</button>
                        </div>
                    </div> */}
                </div>
            </header>
            <div className={`off-canvas-menubar ${menuActive ? "active" : ""}`}>

                <div className={`off-canvas-menubar-body ${menuActive ? "active" : ""}`}>
                    <div className="off-canvas-head">
                        <div className="off-canvas-logo">
                            <Link to="/">
                                <img src={logoPng} alt="logo" />
                            </Link>
                        </div>
                        <div className="off-canvas-menubar-close" data-close="menubar">
                            <i className="fa fa-xmark"></i>
                        </div>
                    </div>

                    <div className="off-canvas-menu">
                        <ul>
                            <li><Link to="/">HOME</Link></li>
                            <li><Link to="/aboutus">ABOUT US</Link></li>
                            <li><Link to="/collaborate">COLLABORATE</Link></li>
                            <li ><Link to="/mediatalks">MEDIA TALKS</Link>
                                {/* <!-- <ul className="sub-menu">
                            <li><a href='/econest/services-details'>Services Details</a></li>
                            <li><a href='/econest/project'>Projects</a></li>
                            <li><a href='/econest/project-details'>Project Details</a></li>
                            <li><a href='/econest/camping'>Camping</a></li>
                            <li><a href='/econest/camping-details'>Camping Details</a></li>
                            <li><a href='/econest/camping-donation'>Camping Donation</a></li>
                            <li><a href='/econest/donations'>Donation</a></li>
                            <li><a href='/econest/be-volunteer'>Become a Volunteer</a></li>
                            <li><a href='/econest/volunteer'>Volunteers</a></li>
                            <li><a href='/econest/volunteer-details'>Volunteer Details</a></li>
                        </ul> --> */}
                            </li>
                            <li><Link to="/gallery">GALLERY</Link>
                                {/* <!-- <ul className="sub-menu">
                            <li><a href='/econest/blog-grid'>Blog Grid</a></li>
                            <li><a href='/econest/blog-standard'>Blog Standard</a></li>
                            <li><a href='/econest/blog-details'>Blog Details</a></li>
                        </ul> --> */}
                            </li>
                            <li><Link to="/blog">BLOG</Link></li>
                            <li><Link to="/contactus">CONTACT US</Link></li>
                        </ul>
                    </div>
                    <div className="header-btn-wrap d-xl-flex">
                        <a className='e-primary-btn has-icon w-100 justify-content-between' href="/Donate" style={{ fontSize: "16px" }}>
                            DONATE NOW
                            <span className="icon-wrap">
                                <span className="icon">
                                    <i className="fas fa-arrow-right"></i>
                                    <i className="fas fa-arrow-right"></i>
                                </span>
                            </span>
                        </a>
                        {user && (
                            <button onClick={(e) => { e.preventDefault(); handleClose(e); handleLogout(e); }} className='e-secondary-btn w-100' style={{ marginTop: 12 }}>
                                Logout
                            </button>
                        )}
                    </div>

                </div>
                <div className="off-canvas-menubar-overlay" data-close="menubar"></div>

            </div>
        </>

    );
};

export default Header;
