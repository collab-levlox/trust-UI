import React from 'react';
import { Link } from "react-router-dom";
import { useEffect } from 'react';


function ContactUs() {

  React.useEffect(() => {
    function handleScroll() {  // header sticky
      let header = document.querySelector(".header-section");
      if (!header) return;
      let scrollY = window.scrollY;
      let pageHeight = document.body.scrollHeight;
  
      let triggerPoint = pageHeight * 0.12; // 12%
  
      if (scrollY > triggerPoint) {
        header.classList.add("show-header");
      } else {
        header.classList.remove("show-header");
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    function updateNavVisibility() {
      const navMenus = document.querySelectorAll('.main-menu-2, .header-section, .header-section-1');
      if (window.innerWidth <= 991) {
        navMenus.forEach(el => {
          el.classList.remove('d-none', 'd-sm-none', 'd-md-none', 'd-lg-block', 'd-xl-block');
          el.classList.add('d-block');
        });
      } else {
        navMenus.forEach(el => {
          el.classList.remove('d-block');
          // Restore original classes if needed (optional)
        });
      }
    }
  
    function handleScrollNavStyle() {
      const header = document.querySelector('.header-section');
      const navMenu = document.querySelector('.main-menu-2');
      if (!header || !navMenu) return;
      if (window.scrollY > 20) {
        header.style.background = '#fff';
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)';
        navMenu.querySelectorAll('a').forEach(a => {
        });
      } else {
        header.style.background = '';
        header.style.boxShadow = '';
        navMenu.style.background = '';
        navMenu.querySelectorAll('a').forEach(a => {
          a.style.color = '';
        });
      }
    }
  
    updateNavVisibility();
    window.addEventListener('resize', updateNavVisibility);
    window.addEventListener('scroll', handleScrollNavStyle);
  
    // Set initial nav style on mount
    handleScrollNavStyle();
  
    return () => {
      window.removeEventListener('resize', updateNavVisibility);
      window.removeEventListener('scroll', handleScrollNavStyle);
    };
  }, []);
    
      React.useEffect(() => {  // menu bar
          const $ = window.jQuery;
          if (!$) return;
  
          const handleOpen = function (e) {
              e.preventDefault();
              $('body').toggleClass('overflow-hidden');
              $('.off-canvas-menubar').toggleClass('active');
              $('.off-canvas-menubar-body').toggleClass('active');
          };
  
          const handleClose = function (e) {
              e.preventDefault();
              $('body').removeClass('overflow-hidden');
              $('.off-canvas-menubar').removeClass('active');
              $('.off-canvas-menubar-body').removeClass('active');
          };
  
          $('[data-toggle="menubar"]').on('click', handleOpen);
          $('[data-close="menubar"]').on('click', handleClose);
  
          return () => {
              $('[data-toggle="menubar"]').off('click', handleOpen);
              $('[data-close="menubar"]').off('click', handleClose);
          };
      }, []);

              React.useEffect(() => {        //whatsapp
                function handleWhatsAppScroll() {
                  const whatsappBtn = document.querySelector('.whatsapp-float');
                  if (!whatsappBtn) return;
                  if (window.scrollY > 200) {
                    whatsappBtn.classList.add('show');
                  } else {
                    whatsappBtn.classList.remove('show');
                  }
                }
                window.addEventListener('scroll', handleWhatsAppScroll);
                return () => window.removeEventListener('scroll', handleWhatsAppScroll);
              }, []);  
              
              React.useEffect(() => {            // back to top
                const btn = document.getElementById('backToTop');
                if (!btn) return;
                const circle = btn.querySelector('circle');
                if (!circle) return;
                const radius = circle.r.baseVal.value;
                const circumference = 2 * Math.PI * radius;
                circle.style.strokeDasharray = circumference;
                circle.style.strokeDashoffset = circumference;
              
                function setProgress() {
                  const scrollTop = window.scrollY || document.documentElement.scrollTop;
                  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                  const percent = docHeight ? scrollTop / docHeight : 0;
                  circle.style.strokeDashoffset = circumference * (1 - percent);
                  if (scrollTop > 200) {
                    btn.style.opacity = 1;
                    btn.style.pointerEvents = 'auto';
                  } else {
                    btn.style.opacity = 0;
                    btn.style.pointerEvents = 'none';
                  }
                }
              
                window.addEventListener('scroll', setProgress);
                btn.addEventListener('click', function () {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                });
              
                // Set initial state
                setProgress();
              
                return () => {
                  window.removeEventListener('scroll', setProgress);
                  btn.removeEventListener('click', function () {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  });
                };
              }, []);


              useEffect(() => {
                const header = document.querySelector(".header-section-1");
                let lastScroll = 0;
              
                const onScroll = () => {
                  const current = window.scrollY;
                  const trigger = window.innerHeight * 0.3; // 30%
              
                  if (current > lastScroll && current > trigger) {
                    header.classList.add("header-hide");
                  } else {
                    header.classList.remove("header-hide");
                  }
              
                };
              
                window.addEventListener("scroll", onScroll);
                return () => window.removeEventListener("scroll", onScroll);
              }, []);
              
  return (
    <div>
      <header className="header-section-1">

  <div className="top-bar d-none d-lg-block">
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="top-bar-content text-center d-flex justify-content-between">

            <div className="text-wrap gap-5">
              <span><i className="fa-solid fa-phone"></i> 908-516-3069</span>
              <span><i className="fa-solid fa-envelope"></i> info@annamalaitrust.com</span>
            </div>

            <div>
              <span>BECOME A VOLENTEER</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="logo d-none d-sm-none d-md-none d-lg-block d-xl-block"
    style={{ position: "absolute", zIndex: 999, top: 0 }}>
    <Link to="/"><img src="/src/assets/img/logo/Annamalai12  1.jpg" alt="logo" /></Link>
  </div>

  <div className="header-bottom-layout-2">

    <div className="header-left">
      <div className="logo-wrap-2">
        <Link to="/"><img src="/src/assets/img/logo/Annamalai12 1.png" alt="logo" /></Link>
      </div>
    </div>

    <div className="w-100 d-none d-lg-block d-xl-block">

      <div className="header-middle">

        <nav className="main-menu-2 d-none d-lg-block d-xl-block">
          <ul>
            <li className="has-dropdown"><Link to="/">HOME</Link></li>
            <li><Link to="/aboutus">ABOUT US</Link></li>
            <li><Link to="/collaborate">COLLABORATE</Link></li>
            <li className="has-dropdown"><Link to="/mediatalks">MEDIA TALKS</Link></li>
            <li><Link to="/gallery">GALLERY</Link></li>
            <li className="has-dropdown"><Link to="/blog">BLOG</Link></li>
            <li><Link to="/contactus">CONTACT US</Link></li>
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
          </div>

        </div>

      </div>

    </div>

    <div className="header-right">
      <div className="header-bar-3 d-lg-none d-xl-none" data-toggle="menubar">
        <div className="bar bar-1"></div>
        <div className="bar bar-2"></div>
        <div className="bar bar-3"></div>
      </div>
    </div>

  </div>

      </header>

      <header className="header-section d-none d-sm-none d-md-none d-lg-block d-xl-block">

  {/* <div className="top-bar d-none d-lg-block">
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="top-bar-content text-center d-flex justify-content-between">

            <div className="text-wrap gap-5">
              <span><i className="fa-solid fa-phone"></i> 908-516-3069</span>
              <span><i className="fa-solid fa-envelope"></i> info@annamalaitrust.com</span>
            </div>

            <div>
              <span>BECOME A VOLENTEER</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div> */}

  <div
    className="logo d-none d-sm-none d-md-none d-lg-block d-xl-block"
    style={{ position: "absolute", zIndex: 999, top: 0 }}>
    <Link to="/"><img src="/src/assets/img/logo/Annamalai12  1 - Copy.jpg" alt="logo" /></Link>
  </div>

  <div className="header-bottom-layout-2">

    <div className="header-left">
      <div className="logo-wrap-2">
        <Link to="/"><img src="/src/assets/img/logo/Annamalai12 1.png" alt="logo" /></Link>
      </div>
    </div>

    <div className="w-100 d-none d-lg-block d-xl-block">

      <div className="header-middle">

        <nav className="main-menu-2 d-none d-lg-block d-xl-block">
          <ul>
            <li className="has-dropdown"><Link to="/">HOME</Link></li>
            <li><Link to="/aboutus">ABOUT US</Link></li>
            <li><Link to="/collaborate">COLLABORATE</Link></li>
            <li className="has-dropdown"><Link to="/mediatalks">MEDIA TALKS</Link></li>
            <li><Link to="/gallery">GALLERY</Link></li>
            <li className="has-dropdown"><Link to="/blog">BLOG</Link></li>
            <li><Link to="/contactus">CONTACT US</Link></li>
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
          </div>

        </div>

      </div>

    </div>

    <div className="header-right">

      <div className="header-bar-3 d-lg-none d-xl-none" data-toggle="menubar">
        <div className="bar bar-1"></div>
        <div className="bar bar-2"></div>
        <div className="bar bar-3"></div>
      </div>

    </div>

  </div>

      </header>

      <div className="off-canvas-menubar">
  
  <div className="off-canvas-menubar-body">
    <div className="off-canvas-head">
      <div className="off-canvas-logo">
        <Link to="/">
          <img src="/src/assets/img/logo/Annamalai12 1.png" alt="logo"/>
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
<a className='e-primary-btn has-icon w-100 justify-content-between' href="/donate">
DONATE NOW
<span className="icon-wrap">
<span className="icon">
  <i className="fas fa-arrow-right"></i>
  <i className="fas fa-arrow-right"></i>
</span>
</span>
</a>
</div>
    
  </div>
  <div className="off-canvas-menubar-overlay" data-close="menubar"></div>
  
      </div>

      <section className="breadcrumb-section bg-cream">
    <div className="container-fluid">
        <div className="row g-0">
            <div className="col-xl-12 col-lg-12">
                <div
                  className="breadcrumb-content"
                  style={{backgroundImage:"url(https://econest-html.netlify.app/econest/assets/img/bg/breadcrumb-bg.webp)",}}
                >
                    <div className="breadcrumb-nav" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="blog.html">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="breadcrumb-title" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                        <h2>Contact Us</h2>
                    </div>
                    <div className="shape-1">
                        {/* <!-- <img src="https://econest-html.netlify.app/econest/assets/img/shapes/shape-1.webp" alt="shape"> --> */}
                    </div>
                </div>
            </div>
            {/* <!-- <div className="col-xl-6 col-lg-6 d-none d-lg-block">
                <div className="breadcrumb-thumb">
                    <img src="https://econest-html.netlify.app/econest/assets/img/thumbs/thumb-1.webp" alt="thumb">
                </div>
            </div> --> */}
        </div>
    </div>
      </section>

      <section className="contact-section p-t-90 p-b-90">
	<div className="container">
		<div className="row" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
			<div className="col-xl-4">
				<div className="contact-card">
					<div className="service-top">
						<h4>Our Location</h4>
						<i className="fa fa-location-dot"></i>
					</div>
					<div className="service-content">
						<p>4848 Pin Oak Park, Apt 1416, Houston, TX 77081, USA</p>
					</div>
					<div className="i-shape">
						<i className="fa fa-location-dot"></i>
					</div>
				</div>
			</div>
			<div className="col-xl-4">
				<div className="contact-card">
					<div className="service-top">
						<h4>Phone
							Numbers</h4>
						<i className="fa fa-phone-volume"></i>
					</div>
					<div className="service-content">
						<p />+1 908-516-3069
					</div>
					<div className="i-shape">
						<i className="fa fa-phone-volume"></i>
					</div>
				</div>
			</div>
			<div className="col-xl-4">
				<div className="contact-card">
					<div className="service-top">
						<h4>Email
							Address</h4>
						<i className="fa fa-envelope"></i>
					</div>
					<div className="service-content">
						<p>info@annamalaitrust.com</p>
					</div>
					<div className="i-shape">
						<i className="fa fa-envelope"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
      </section>

      <section className="map-section">
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3449.3274250523305!2d-95.45759588370136!3d29.72364544970148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c10a9b060347%3A0xfc61f01a3f5270ca!2s4848%20Pin%20Oak%20Park%20%231416%2C%20Houston%2C%20TX%2077081%2C%20USA!5e0!3m2!1sen!2sin!4v1700361425617!5m2!1sen!2sin"
  width="100%"
  height="450"
  style={{border: 0}}
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
      </section>

      <footer className="footer-section footer-section-2 p-t-125 p-t-md-100 p-t-xs-30 p-b-50">
        <div className="container">
          <div className="row justify-content-between row-gap-md-5 row-gap-4 p-b-xs-50 p-b-80">
            <div className="col-xl-4 col-lg-8 col-md-7">
              <div className="footer-widget">
                <div className="about-widget">
                  <div className="footer-logo">
                    <a href="#">
                      <img
                        src="/src/assets/img/thumbs/Annamalai_logo.jpg"
                        alt="logo"
                        width="90"
                      />
                      &ensp; Annamalai Foundations
                    </a>
                  </div>
                  <div className="text">
                    <p>
                      Introducing our team of talented and skilled professionals
                      who are ready to increase your productivity and bring your
                      business.
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      <b>We Are Available !!</b>
                    </p>
                    <p>
                      Mon-Sat: <span>10:00am to 07:30pm</span>
                    </p>
                  </div>
                  <div className="social-links">
                    <a href="https://www.facebook.com/people/Annamalai-Foundation/61567348864633/">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com">
                      <i className="fab fa-x-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/annamalai-foundation-a3352b334/">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-5">
              <div className="footer-widget">
                <h3 className="w-title">
                  <span>
                    <img src="/src/assets/img/icons/icon-1.svg" alt="icon" />
                  </span>
                  Quick Links
                </h3>
                <ul>
                  <li><Link to="/aboutus">About Us</Link></li>
                  <li><Link to="/collaborate">Collaborate</Link></li>
                  <li><Link to="/mediatalks">Media Talks</Link></li>
                  <li><Link to="/gallery">Gallery</Link></li>
                  <li><Link to="#">Meet Our Team</Link></li>
                  <li><Link to="/contactus">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-5">
              <div className="footer-widget">
                <h3 className="w-title">
                  <span>
                    <img src="/src/assets/img/icons/icon-1.svg" alt="icon" />
                  </span>
                  Our Services
                </h3>
                <ul>
                  <li>
                    <a href="#">For Research</a>
                  </li>
                  <li>
                    <a href="#">For Institutors</a>
                  </li>
                  <li>
                    <a href="#">For Innovators</a>
                  </li>
                  <li>
                    <a href="#">Global Recolonisation</a>
                  </li>
                  <li>
                    <a href="#">Expert Network</a>
                  </li>
                  <li>
                    <a href="#">Research Resource</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-5">
              <div className="footer-widget">
                <h3 className="w-title">
                  <span>
                    <img src="/src/assets/img/icons/icon-1.svg" alt="icon" />
                  </span>
                  Get in Touch
                </h3>
                <div className="get-in-touch">
                  <a href="#" className="footer-address">
                    <div className="icon">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div className="text">
                      <h6>Address</h6>
                      <p>4848 Pin Oak Park, Apt 1416, Houston, TX 77081, USA</p>
                    </div>
                  </a>
                  <a href="mailto:support@example.com" className="email">
                    <div className="icon">
                      <i className="fa-solid fa-paper-plane"></i>
                    </div>
                    <div className="text">
                      <h6>Email</h6>
                      <p>info@annamalaitrust.com</p>
                    </div>
                  </a>
                  <a href="tel:+70264566579" className="phone">
                    <div className="icon">
                      <i className="fi fi-rr-call-outgoing"></i>
                    </div>
                    <div className="text">
                      <h6>Phone</h6>
                      <p>908-516-3069</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="row">
            <div className="col-xl-12">
              <div className="container">
                <div className="footer-bottom-layout">
                  <div className="footer-bottom-menu">
                    <ul>
                      <li>
                        <a href="#">Terms & Condition</a>
                      </li>
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-copyright">
                    © 2025 Annamalai Foundations. All Rights Reserved.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div id="backToTop" aria-label="Back to top" title="Back to top">
          <svg>
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="#FFE175"
              stroke-width="3"
              fill="none"
              stroke-linecap="round"
            />
          </svg>
          <span className="icon">
            <i className="fas fa-arrow-up"></i>
          </span>
      </div>

      <a
        href="https://wa.me/996294"
        className="whatsapp-float"
        target="_blank"
        title="Chat with us on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>      

    </div>
  );
}
export default ContactUs;