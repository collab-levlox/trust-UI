import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Footer from './Footer';
import Header from './Headers';
import { mediaListAPI } from '../Hoc/api';


function Blog() {
  React.useEffect(() => {
    function handleScroll() {  // header sticky
      let header = document.querySelector(".header-section");
      if (!header) return;
      let scrollY = window.scrollY;
      let pageHeight = document.body.scrollHeight;

      let triggerPoint = pageHeight * 0.07; // 12%

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

  // Fetch BLOG items
  const [blogItems, setBlogItems] = useState([]);
  useEffect(() => {
    let mounted = true;
    async function fetchBlog() {
      try {
        const res = await mediaListAPI({ postType: 'BLOG' });
        const payload = res && res.data ? (Array.isArray(res.data) ? res.data : (res.data.data || res.data.items || [])) : (Array.isArray(res) ? res : []);
        if (mounted) setBlogItems(payload || []);
      } catch (err) {
        console.error('Failed to load blog items', err);
      }
    }
    fetchBlog();
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
                    <li><a href="blog.html">Blog</a></li>
                  </ul>
                </div>
                <div className="breadcrumb-title" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                  <h2>Blog</h2>
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

      <section class="blog-section p-t-120 p-b-80 p-t-lg-80 p-b-lg-80 p-t-md-60 p-b-md-60 p-t-xs-60 p-b-xs-60">
        <div class="container">
            <div class="row" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
              {blogItems && blogItems.length > 0 ? (
                blogItems.map((item, idx) => {
                  const src = item.url || (item.key ? (process.env.REACT_APP_MEDIA_BASE_URL ? `${process.env.REACT_APP_MEDIA_BASE_URL.replace(/\/$/, '')}/${String(item.key).replace(/^\//, '')}` : item.key) : '/src/assets/img/thumbs/thumb-32.webp');
                  const title = item.title || item.filename || 'Untitled';
                  const desc = item.description || item.caption || '';
                  const date = item.date || item.createdAt || item.publishedAt || null;
                  let day = '', month = '';
                  if (date) {
                    try {
                      const d = new Date(date);
                      day = d.getDate();
                      month = d.toLocaleString('default', { month: 'short' });
                    } catch (e) {}
                  }
                  return (
                    <div class="col-xl-4 col-md-6 col-sm-12 m-b-30" key={item.id || idx}>
                      <div class="blog-card-2">
                        <div class="thumb">
                          <a href={item.link || '/econest/blog-details'}>
                            <img src={src} alt={title} />
                          </a>
                          {date && (
                            <div class="event-date">
                              <h2>{day}</h2>
                              <h5>{month}</h5>
                            </div>
                          )}
                        </div>
                        <div class="content">
                          <div class="content-top p-0 m-b-20">
                            <div class="author">
                              <div class="admin">
                                <i class="fa fa-circle-user"></i>
                                <span>Admin</span>
                              </div>
                              <div class="solar">
                                <i class="fa fa-bookmark"></i>
                                <span>Solar</span>
                              </div>
                            </div>
                            <div class="title">
                              <h3>
                                <a href={item.link || '/econest/blog-details'}>{title}</a>
                              </h3>
                            </div>
                          </div>
                          <div class="details-btn">
                            <Link to="/blogdetails" class='e-primary-btn has-icon is-hover-white' >
                              KNOW MORE
                              <span class="icon-wrap">
                                <span class="icon"><i className="fas fa-arrow-right"></i><i className="fas fa-arrow-right"></i></span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div class="col-12">No blog posts found.</div>
              )}
            </div>
          {/* <!-- <div class="row justify-content-center text-center m-t-20" data-aos="fade-up" data-aos-duration="1000"
				data-aos-delay="200">
			<div class="col-xl-6">
				<div class="project-pagination">
					<ul>
						<li class="active"><a href="#">01</a></li>
						<li><a href="#">02</a></li>
						<li><a href="#">03</a></li>
						<li class="icon"><a href="#"><i class="fa-regular fa-arrow-right"></i></a></li>
					</ul>
				</div>
			</div>
		</div> --> */}
        </div>
      </section>

    <Footer />
    </div>
  );
}
export default Blog;