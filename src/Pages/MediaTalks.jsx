import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Footer from './Footer';
import Header from './Headers';
import { mediaListAPI } from '../Hoc/api';


function MediaTalks() {

  React.useEffect(() => {
    function handleScroll() {  // header sticky
      let header = document.querySelector(".header-section");
      if (!header) return;
      let scrollY = window.scrollY;
      let pageHeight = document.body.scrollHeight;

      let triggerPoint = pageHeight * 0.09; // 12%

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



  React.useEffect(() => {      // blog section slide
    if (window.Swiper && document.querySelector('.blog-slider-active .swiper')) {
      new window.Swiper('.blog-slider-active .swiper', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.blog-pagination',
          clickable: true,
        },
        // autoplay: {
        //   delay: 4000,
        //   disableOnInteraction: false,
        // },
        breakpoints: {
          1200: { slidesPerView: 2, spaceBetween: 30 },
          992: { slidesPerView: 2, spaceBetween: 20 },
          576: { slidesPerView: 1, spaceBetween: 10 },
          0: { slidesPerView: 1, spaceBetween: 10 },
        },
      });
    }
  }, []);

  // Fetch MEDIA_TALKS items
  const [mediaItems, setMediaItems] = useState([]);
  useEffect(() => {
    let mounted = true;
    async function fetchMedia() {
      try {
        const res = await mediaListAPI({ postType: 'MEDIA_TALKS' });
        // normalize response (data or data.data)
        const payload = res && res.data ? (Array.isArray(res.data) ? res.data : (res.data.data || res.data.items || [])) : (Array.isArray(res) ? res : []);
        if (mounted) setMediaItems(payload || []);
      } catch (err) {
        console.error('Failed to load media talks', err);
      }
    }
    fetchMedia();
    return () => { mounted = false; };
  }, []);

  React.useEffect(() => {   //blog section social

    const shareButtons = document.querySelectorAll('.total-shared');
    const handleShareClick = function (e) {
      e.preventDefault();
      const parent = this.parentElement;
      if (parent) {
        parent.classList.toggle('active');
      }
    };
    shareButtons.forEach(btn => btn.addEventListener('click', handleShareClick));

    const blogCards = document.querySelectorAll('.blog-card');
    const handleMouseLeave = function () {
      const shared = this.querySelector('.social-share');
      if (shared) {
        shared.classList.remove('active');
      }
    };
    blogCards.forEach(card => card.addEventListener('mouseleave', handleMouseLeave));

    // Cleanup
    return () => {
      shareButtons.forEach(btn => btn.removeEventListener('click', handleShareClick));
      blogCards.forEach(card => card.removeEventListener('mouseleave', handleMouseLeave));
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





  return (
    <div>
      <Header />

      <section className="breadcrumb-section bg-cream">
        <div className="container-fluid">
          <div className="row g-0">
            <div className="col-xl-12 col-lg-12">
              <div
                className="breadcrumb-content"
                style={{ backgroundImage: "url(https://econest-html.netlify.app/econest/assets/img/bg/breadcrumb-bg.webp)", }}
              >
                <div className="breadcrumb-nav" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                  <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="blog.html">Media Talks</a></li>
                  </ul>
                </div>
                <div className="breadcrumb-title" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                  <h2>Media Talks</h2>
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

      <section className="events-section m-t-80 m-t-xs-40"
        style={{ background: "none" }}
      >
        <div className="events-head">
          <h2 style={{ color: "#222834" }}>Events</h2>
          <p style={{ color: "#5D5D5D" }}>
            Join a thriving community of researchers, innovators, and experts
            committed to advancing knowledge and creating meaningful impact.
          </p>
        </div>

        <div className="events-container">
          {mediaItems && mediaItems.length > 0 ? (
            mediaItems.map((item, idx) => {
              const src = item.url || (item.key ? (process.env.REACT_APP_MEDIA_BASE_URL ? `${process.env.REACT_APP_MEDIA_BASE_URL.replace(/\/$/, '')}/${String(item.key).replace(/^\//, '')}` : item.key) : '/src/assets/img/event-1.jpg');
              const title = item.title || item.filename || 'Untitled Event';
              const desc = item.description || item.caption || '';
              // optional date parsing if available
              const date = item.date || item.createdAt || null;
              let day = '', month = '', year = '';
              if (date) {
                try {
                  const d = new Date(date);
                  day = d.getDate();
                  month = d.toLocaleString('default', { month: 'long' });
                  year = d.getFullYear();
                } catch (e) {
                  // ignore
                }
              }
              return (
                <div className="event-card" key={item.id || idx}>
                  <div className="event-img">
                    <img src={src} alt={title} />
                    {date && (
                      <div className="event-date">
                        <span className="day">{day}</span>
                        <span className="month">{month}</span>
                        <span className="year">{year}</span>
                      </div>
                    )}
                  </div>

                  <div className="event-content">
                    <h4>{title}</h4>
                    <p>{desc}</p>
                    <div className="details-btn">
                      <a
                        className="e-primary-btn has-icon is-hover-white"
                        href={item.link || '/econest/services-details'}
                      >
                        KNOW MORE
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
              );
            })
          ) : (
            <div className="col-12">No media talks found.</div>
          )}
        </div>
      </section>

    

     <Footer />

    </div>
  );
}
export default MediaTalks;