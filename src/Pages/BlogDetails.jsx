import React from 'react';
import { Link } from "react-router-dom";
import { useEffect } from 'react';

function BlogDetails() {

    React.useEffect(() => {
      function handleScroll() {  // header sticky
        let header = document.querySelector(".header-section");
        if (!header) return;
        let scrollY = window.scrollY;
        let pageHeight = document.body.scrollHeight;
    
        let triggerPoint = pageHeight * 0.05; // 12%
    
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
                                <li><a href="blog.html">Blog Details</a></li>
                            </ul>
                        </div>
                        <div className="breadcrumb-title" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                            <h2>Blog Details</h2>
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

            <section className="blog-details">
<div className="container">
    <div className="blog-details__img">
        <img src="/src/assets/img/blog-details/blog-details-img-1.jpg" alt="" />
        <div className="blog-details__date">
            <div className="blog-details__date-shape-1">
                <img src="/src/assets/img/blog-details/blog-details-date-shape-1.png" alt="" />
            </div>
            <span>10 Aug 2024</span>
        </div>
    </div>
    <div className="blog-details__content">
        <div className="row">
            <div className="col-xl-8 col-lg-7">
                <div className="blog-details__content-left">
                    <ul className="blog-details__meta list-unstyled">
                        <li>
                            <div className="icon">
                                <i className="fi fi-rs-user"></i>
                            </div>
                            <a href="#">By cane Anderson</a>
                        </li>
                        <li>
                            <div className="icon">
                                <i className="fi fi-rs-comment-alt"></i>
                            </div>
                            <a href="#">02 Comment</a>
                        </li>
                    </ul>
                    <h2 className="blog-details__title-1">our community doesn’t stop at
                        food distribution.</h2>
                    <p className="blog-details__text-1">It sounds like you're emphasizing the broader impact and
                        reach of your community efforts. Here's a wa
                        y you might expand on that idea: Our community doesn’t stop at food distribution. We
                        are committed</p>
                    <p className="blog-details__text-2">to fostering connections, providing support, and
                        empowering every individual we serve. From educatio
                        nal programs to wellness initiatives, we’re dedicated to making a lasting difference
                        in the lives of our
                        community members." Would you like to build this out further or focus on any
                        specific.</p>
                    <h2 className="blog-details__title-2">Educational Initiatives :</h2>
                    <p className="blog-details__text-3">Education is a powerful tool for breaking the cycle of
                        poverty. We offer workshops and classes that
                        cover essential life skills, financial literacy, and vocational training. By
                        providing these opportunities,
                        we’re not just giving people the means to feed themselves today; we’re equipping
                        them with the
                        knowledge to secure a brighter future.</p>
                    <div className="blog-details__img-box">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6">
                                <div className="blog-details__img-box-img">
                                    <img src="/src/assets/img/blog-details/blog-details-img-box-img-1.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="blog-details__img-box-img">
                                    <img src="/src/assets/img/blog-details/blog-details-img-box-img-2.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="blog-details__title-3">Health and Wellness Programs :</h2>
                    <p className="blog-details__text-4">Good health is the foundation of a strong community. Our
                        wellness programs include free health scree
                        nines, fitness activities, and mental health support. We partner with local health
                        professionals to
                        ensure that our community members have access to the care and resources.</p>
                    <div className="blog-details__tag-box">
                        <h3 className="blog-details__tag-title">Tags :</h3>
                        <ul className="blog-details__tag-list list-unstyled">
                            <li>
                                <a href="#">Commute</a>
                            </li>
                            <li>
                                <a href="#">Riding</a>
                            </li>
                            <li>
                                <a href="#">Best</a>
                            </li>
                            <li>
                                <a href="#">Business</a>
                            </li>
                            <li>
                                <a href="#">Creative</a>
                            </li>
                            <li>
                                <a href="#">UX/UI Design</a>
                            </li>
                        </ul>
                    </div>
                    <div className="comment-one">
                        <h3 className="comment-one__title">02 - Comments</h3>
                        <div className="comment-one__single">
                            <div className="comment-one__image">
                                <img src="/src/assets/img/blog-details/comment-1-1.jpg" alt="" />
                            </div>
                            <div className="comment-one__content">
                                <h3>Monsur Rahman Lito</h3>
                                <p>Phasellus ac consequat turpis, sit amet fermentum nulla. Donec dignissim
                                    augue nunc. Praesent bibendum erat ac lectus lobortis.</p>
                                <div className="comment-one__btn-box">
                                    <a href="blog-details.html" className="comment-one__btn">Reply</a>
                                </div>
                            </div>
                        </div>
                        <div className="comment-one__single comment-one__single-2">
                            <div className="comment-one__image">
                                <img src="/src/assets/img/blog-details/comment-1-2.jpg" alt="" />
                            </div>
                            <div className="comment-one__content">
                                <h3>Nur Alom Md</h3>
                                <p>Phasellus ac consequat turpis, sit amet fermentum nulla. Donec dignissim
                                    augue nunc. Praesent bibendum erat ac lectus lobortis.</p>
                                <div className="comment-one__btn-box">
                                    <a href="blog-details.html" className="comment-one__btn">Reply</a>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="comment-form">
                        <h3 className="comment-form__title">Leave a Comment</h3>
                        <form action="assets/inc/sendemail.php"
                            className="comment-form__form contact-form-validated" novalidate="novalidate">
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="comment-form__input-box">
                                        <h4 className="comment-form__input-title">Your Name</h4>
                                        <input type="text" placeholder="Enter Your Name" name="name" />
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="comment-form__input-box">
                                        <h4 className="comment-form__input-title">Your Mail</h4>
                                        <input type="email" placeholder="infoflex@info.com" name="email" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-12 clearfix">
                                    <div className="comment-form__input-box text-message-box">
                                        <h4 className="comment-form__input-title">Message</h4>
                                        <textarea name="message"
                                            placeholder="Write your message"></textarea>
                                    </div>
                                    <div className="comment-form__btn-box">
                        <div className="details-btn">
                            <a className='e-primary-btn has-icon is-hover-white' href='/econest/services-details'>
                                KNOW MORE
                                <span className="icon-wrap">
                                    <span className="icon"><i className="fas fa-arrow-right"></i><i className="fas fa-arrow-right"></i></span>
                                </span>
                            </a>
                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="result"></div>
                    </div>

                </div>
            </div>
            <div className="col-xl-4 col-lg-5">
                <div className="sidebar">
                    <div className="sidebar__single sidebar__search">
                        <h3 className="sidebar__title">Search Hare :</h3>
                        <form action="#" className="sidebar__search-form">
                            <input type="search" placeholder="Enter Your Keyword..." />
                            <button type="submit"><i className="fi fi-rr-search"></i></button>
                        </form>
                    </div>
                    <div className="sidebar__single sidebar__all-category">
                        <h3 className="sidebar__title">Categories :</h3>
                        <ul className="sidebar__all-category-list list-unstyled">
                            <li>
                                <a href="#">Stories of Impact</a>
                            </li>
                            <li className="active">
                                <a href="#">Nutrition Tips</a>
                            </li>
                            <li>
                                <a href="#">Health and Wellness</a>
                            </li>
                            <li>
                                <a href="#">Community Stories</a>
                            </li>
                            <li>
                                <a href="#">Volunteer Opportunities</a>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebar__single sidebar__tags">
                        <h3 className="sidebar__title">Tags :</h3>
                        <div className="sidebar__tags-list">
                            <a href="#">Commute</a>
                            <a href="#">Best</a>
                            <a href="#">Business</a>
                            <a href="#">Riding</a>
                            <a href="#">UX/UI Design</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
export default BlogDetails;