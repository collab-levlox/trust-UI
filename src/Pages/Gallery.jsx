import React from 'react';
import { Link } from "react-router-dom";
import { useEffect } from "react";



function Gallery() {

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

useEffect(() => {
  const tabs = document.querySelectorAll(".tabs button");
  const categories = document.querySelectorAll(".gallery > div");

  const handleClick = (btn) => {
    // Remove old active
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    categories.forEach(cat => {
      if (filter === "all" || cat.classList.contains(filter)) {
        cat.style.display = "contents";
      } else {
        cat.style.display = "none";
      }
    });
  };

  tabs.forEach(btn => {
    btn.addEventListener("click", () => handleClick(btn));
  });

  return () => {
    tabs.forEach(btn => {
      btn.removeEventListener("click", () => handleClick(btn));
    });
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
                            <li><a href="blog.html">Gallery</a></li>
                        </ul>
                    </div>
                    <div className="breadcrumb-title" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                        <h2>Gallery</h2>
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

      <section className="gallery-section m-t-80 m-t-xs-20">
  {/* <!-- Tabs for categories --> */}
  <div className="tabs">
    {/* <!-- <button data-filter="all" className="active">ALL</button> --> */}
    <button data-filter="category1" className="active">INNOVATE 25</button>
    <button data-filter="category2">ANNAMALAI TRUST</button>
  </div>

  {/* <!-- Image gallery --> */}
  <div className="gallery">
    {/* <!-- All Images (will show in one lightbox group) --> */}
    <div className="category-all">
      {/* <!-- <a href="https://placehold.co/600x400/000000/FFF" data-fslightbox="all" data-title="Category 1 - Image 1">
        <img src="https://placehold.co/600x400/000000/FFF" alt="Image 1">
      </a>
      <a href="https://placehold.co/600x400/000000/FFF" data-fslightbox="all" data-title="Category 1 - Image 2">
        <img src="https://placehold.co/600x400/000000/FFF" alt="Image 2">
      </a>
      <a href="https://placehold.co/600x400/000000/FF0" data-fslightbox="all" data-title="Category 2 - Image 1">
        <img src="https://placehold.co/600x400/000000/FF0" alt="Image 3">
      </a>
      <a href="https://placehold.co/600x400/000000/FF0" data-fslightbox="all" data-title="Category 2 - Image 2">
        <img src="https://placehold.co/600x400/000000/FF0" alt="Image 4">
      </a>
      <a href="https://placehold.co/600x400/000000/F00" data-fslightbox="all" data-title="Category 3 - Image 1">
        <img src="https://placehold.co/600x400/000000/F00" alt="Image 5">
      </a>
      <a href="https://placehold.co/600x400/000000/F00" data-fslightbox="all" data-title="Category 3 - Image 2">
        <img src="https://placehold.co/600x400/000000/F00" alt="Image 6">
      </a> --> */}
    </div>

    {/* <!-- Category 1 Images --> */}
    <div className="category1">
      <a href="/src/assets/gallery/innovate 25/1F3A6360.JPG" data-fslightbox="category1" data-title="Category 1 - Image 1">
        <img src="/src/assets/gallery/innovate 25/1F3A6360.JPG" alt="Image 1" />
      </a>
      <a href="/src/assets/gallery/innovate 25/1F3A6377.JPG" data-fslightbox="category1" data-title="Category 1 - Image 2">
        <img src="/src/assets/gallery/innovate 25/1F3A6377.JPG" alt="Image 2" />
      </a>
      <a href="/src/assets/gallery/innovate 25/1F3A6396.JPG" data-fslightbox="category1" data-title="Category 1 - Image 3">
        <img src="/src/assets/gallery/innovate 25/1F3A6396.JPG" alt="Image 3" />
      </a>
      <a href="/src/assets/gallery/innovate 25/1F3A6397.JPG" data-fslightbox="category1" data-title="Category 1 - Image 4">
        <img src="/src/assets/gallery/innovate 25/1F3A6397.JPG" alt="Image 4" />
      </a>
      <a href="/src/assets/gallery/innovate 25/1F3A6408.JPG" data-fslightbox="category1" data-title="Category 1 - Image 5">
        <img src="/src/assets/gallery/innovate 25/1F3A6408.JPG" alt="Image 5" />
      </a>
      <a href="/src/assets/gallery/innovate 25/1F3A6492.JPG" data-fslightbox="category1" data-title="Category 1 - Image 6">
        <img src="/src/assets/gallery/innovate 25/1F3A6492.JPG" alt="Image 6" />
      </a>
      <a href="/src/assets/gallery/innovate 25/1F3A6521.JPG" data-fslightbox="category1" data-title="Category 1 - Image 7">
        <img src="/src/assets/gallery/innovate 25/1F3A6521.JPG" alt="Image 7" />
      </a>
      <a href="/src/assets/gallery/innovate 25/1F3A6589.JPG" data-fslightbox="category1" data-title="Category 1 - Image 8">
        <img src="/src/assets/gallery/innovate 25/1F3A6589.JPG" alt="Image 8" />
      </a>
      <a href="/src/assets/gallery/innovate 25/1F3A6601.JPG" data-fslightbox="category1" data-title="Category 1 - Image 9">
        <img src="/src/assets/gallery/innovate 25/1F3A6601.JPG" alt="Image 9" />
      </a>
      <a href="/src/assets/gallery/innovate 25/1F3A6611.JPG" data-fslightbox="category1" data-title="Category 1 - Image 10">
        <img src="/src/assets/gallery/innovate 25/1F3A6611.JPG" alt="Image 10" />
      </a>
    </div>

    {/* <!-- Category 2 Images --> */}
    <div className="category2">
      <a href="/src/assets/gallery/annamalai trust/IMG-20240603-WA0001.jpg" data-fslightbox="category2" data-title="Category 2 - Image 21">
        <img src="/src/assets/gallery/annamalai trust/IMG-20240603-WA0001.jpg" alt="Image 21" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (1).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 1">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (1).jpeg" alt="Image 1" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (2).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 2">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (2).jpeg" alt="Image 2" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (3).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 3">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (3).jpeg" alt="Image 3" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (4).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 4">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (4).jpeg" alt="Image 4" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (5).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 5">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (5).jpeg" alt="Image 5" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (6).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 6">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (6).jpeg" alt="Image 6" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (7).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 7">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (7).jpeg" alt="Image 7" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (8).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 8">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (8).jpeg" alt="Image 8" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (9).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 9">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (9).jpeg" alt="Image 9" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (10).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 10">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (10).jpeg" alt="Image 10" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (11).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 11">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (11).jpeg" alt="Image 11" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (12).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 12">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (12).jpeg" alt="Image 12" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (13).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 13">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (13).jpeg" alt="Image 13" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (14).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 14">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (14).jpeg" alt="Image 14" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (15).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 15">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (15).jpeg" alt="Image 15" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (16).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 16">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (16).jpeg" alt="Image 16" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (17).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 17">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42 (17).jpeg" alt="Image 17" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42.jpeg" data-fslightbox="category2" data-title="Category 2 - Image 18">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.42.jpeg" alt="Image 18" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.43 (1).jpeg" data-fslightbox="category2" data-title="Category 2 - Image 19">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.43 (1).jpeg" alt="Image 19" />
      </a>
      <a href="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.43.jpeg" data-fslightbox="category2" data-title="Category 2 - Image 20">
        <img src="/src/assets/gallery/annamalai trust/WhatsApp Image 2025-11-25 at 17.16.43.jpeg" alt="Image 20" />
      </a>
    </div>
  </div>
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
export default Gallery;