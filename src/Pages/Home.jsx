import React, { useEffect } from "react";
import AvailSlot from "./AvailSlot";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { bookSlotAPI } from "../Hoc/api";
import UpiPayment from "./Payment";
// import "../Pages/Customer.css";
// import Swiper from 'swiper';
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// image imports used in this file
import logoJpg from "../assets/img/logo/Annamalai12  1.jpg";
import logoPng from "../assets/img/logo/Annamalai12 1.png";
import logoCopy from "../assets/img/logo/Annamalai12  1 - Copy.jpg";
import icon1 from "../assets/img/icons/icon-1.svg";
import author1 from "../assets/img/authors/author-1.webp";
import groupShape1 from "../assets/img/shapes/group-shape-1.webp";
import shape2 from "../assets/img/shapes/shape-2.webp";
import frame106 from "../assets/img/thumbs/Frame 106.jpg";
import frame107 from "../assets/img/thumbs/Frame 107.jpg";
import frame108 from "../assets/img/thumbs/Frame 108.jpg";
import shape10 from "../assets/img/shapes/shape-10.webp";
import shape11 from "../assets/img/shapes/shape-11.webp";
import aboutShape1 from "../assets/images/shapes/about-three-shape-1.png";
import aboutShape2 from "../assets/images/shapes/about-three-shape-2.png";
import aboutPerumal from "../assets/img/abt-us perumalannamalai.jpg";
import thumb14 from "../assets/img/thumbs/thumb-14.webp";
import thumb15 from "../assets/img/thumbs/thumb-15.webp";
import thumb16 from "../assets/img/thumbs/thumb-16.webp";
import thumb84 from "../assets/img/thumbs/thumb-84.webp";
import team1 from "../assets/team/team-1.webp";
import team2 from "../assets/team/team-2.webp";
import team3 from "../assets/team/team-3.webp";
import team4 from "../assets/team/team-4.webp";
import team5 from "../assets/team/team-5.webp";
import event1 from "../assets/img/event-1.jpg";
import event2 from "../assets/img/event-2.jpg";
import event3 from "../assets/img/event-3.jpg";
import gallery1 from "../assets/img/gallery/img-1.jpg";
import gallery2 from "../assets/img/gallery/img-2.jpg";
import gallery3 from "../assets/img/gallery/img-3.jpg";
import gallery4 from "../assets/img/gallery/img-4.jpg";
import gallery5 from "../assets/img/gallery/img-5.jpg";
import gallery6 from "../assets/img/gallery/img-6.jpg";
import gallery7 from "../assets/img/gallery/img-7.jpg";
import gallery8 from "../assets/img/gallery/img-8.jpg";
import footerLogo from "../assets/img/thumbs/Annamalai_logo.jpg";
import icon12 from "../assets/img/icons/icon-12.svg";
import bgImage from "../assets/img/bg/Frame 96.png";


import shape38 from "../assets/img/shapes/shape-38.webp";
import Header from "./Headers";
import Footer from "./Footer";

function Home() {
  // Sticky header with transition effect
  React.useEffect(() => {
    function handleScroll() {  // header sticky
      let header = document.querySelector(".header-section");
      if (!header) return;
      let scrollY = window.scrollY;
      let pageHeight = document.body.scrollHeight;

      let triggerPoint = pageHeight * 0.12; // 12%

      if (scrollY > triggerPoint) {
        header.classList.add("show-header");
        header.style.transition = "top .5s cubic-bezier(0.4,0,0.2,1), background 0.3s";
      } else {
        header.classList.remove("show-header");
        header.style.transition = "top .5s cubic-bezier(0.4,0,0.2,1), background 0.3s";
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





  React.useEffect(() => {       // hero slider
    const $ = window.jQuery;
    const Swiper = window.Swiper;
    if (!$ || !Swiper) return;

    function animateSwiperElements(selector, init) {
      let animated = function () {
        $(selector + ' [data-animation]').each(function () {
          let anim = $(this).data('animation');
          let delay = $(this).data('delay');
          let duration = $(this).data('duration');

          $(this).removeClass('anim' + anim)
            .addClass(anim + ' animate__animated')
            .css({
              webkitAnimationDelay: delay,
              animationDelay: delay,
              webkitAnimationDuration: duration,
              animationDuration: duration
            })
            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
              $(this).removeClass(anim + ' animate__animated');
            });
        });
      };

      // Initial animation
      animated();

      // Remove animation classes on slide change start
      init.on('slideChange', function () {
        $(selector + ' [data-animation]').removeClass('animate__animated');
      });

      // Animate on slide change complete
      init.on('slideChange', animated);
    }

    if ($(".hero-slider-active-1").length > 0) {
      let sliderActive1 = '.hero-slider-active-1 .swiper';
      let sliderInit1 = new Swiper(sliderActive1, {
        slidesPerView: 1,
        slidesPerColumn: 1,
        paginationClickable: true,
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: {
          delay: 5000,
          waitForTransition: true,
          disableOnInteraction: false
        },
        pagination: {
          el: '.hero-slider-pagination-1',
          clickable: true,
        },
        navigation: {
          nextEl: '.hero-slider-button-next-1',
          prevEl: '.hero-slider-button-prev-1',
        },
        a11y: false
      });

      animateSwiperElements(sliderActive1, sliderInit1);
    }

    if ($(".hero-slider-active-2").length > 0) {
      let sliderActive2 = '.hero-slider-active-2 .swiper';
      let sliderInit2 = new Swiper(sliderActive2, {
        slidesPerView: 1,
        slidesPerColumn: 1,
        paginationClickable: true,
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: {
          delay: 5000,
          waitForTransition: true,
          disableOnInteraction: false
        },
        pagination: {
          el: '.hero-slider-pagination-2',
          clickable: true,
        },
        navigation: {
          nextEl: '.hero-slider-button-next-2',
          prevEl: '.hero-slider-button-prev-2',
        },
        a11y: false
      });

      animateSwiperElements(sliderActive2, sliderInit2);
    }

    if ($(".hero-slider-active-3").length > 0) {
      let sliderActive3 = '.hero-slider-active-3 .swiper';
      let sliderInit3 = new Swiper(sliderActive3, {
        slidesPerView: 1,
        slidesPerColumn: 1,
        paginationClickable: true,
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: {
          delay: 5000,
          waitForTransition: true,
          disableOnInteraction: false
        },
        pagination: {
          el: '.hero-slider-pagination-3',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
          },
        },
        navigation: {
          nextEl: '.hero-slider-button-next-3',
          prevEl: '.hero-slider-button-prev-3',
        },
        a11y: false
      });

      animateSwiperElements(sliderActive3, sliderInit3);
    }
  }, []);


  React.useEffect(() => {  //stat counter animation
    const counters = document.querySelectorAll('.stat-number');
    const speed = 400;

    counters.forEach(counter => {
      const animate = () => {
        const value = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        const increment = value / speed;

        if (current < value) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(animate, 10);
        } else {
          if (value >= 3000) counter.innerText = "3K+";
          else if (value === 95) counter.innerText = "95%";
          else counter.innerText = value + "+";
        }
      };
      animate();
    });
  }, []);


  React.useEffect(() => { // circle count
    const counters = document.querySelectorAll(".count-text");

    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-stop");
        const speed = +counter.getAttribute("data-speed");
        const current = +counter.innerText;
        const increment = target / (speed / 50);

        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, 50);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }, []);

  React.useEffect(() => {      //abt-us tab section
    const buttons = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    function handleTabClick(e) {
      buttons.forEach(b => b.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      e.currentTarget.classList.add("active");
      const tabId = e.currentTarget.dataset.tab;
      const tabContent = document.getElementById(tabId);
      if (tabContent) tabContent.classList.add("active");
    }

    buttons.forEach(btn => {
      btn.addEventListener("click", handleTabClick);
    });

    return () => {
      buttons.forEach(btn => {
        btn.removeEventListener("click", handleTabClick);
      });
    };
  }, []);

  React.useEffect(() => {
    // Initialize Swiper for .what-we-do-slider
    // if (document.querySelector(".what-we-do-slider")) {
    //   new Swiper(".what-we-do-slider", {
    //     slidesPerView: 3,
    //     spaceBetween: 30,
    //     loop: true,
    //     pagination: {
    //       el: ".swiper-pagination",
    //       clickable: true,
    //     },
    //     autoplay: {
    //       delay: 3000,
    //       disableOnInteraction: false,
    //     },
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev",
    //     },
    //     breakpoints: {
    //       1200: {
    //         slidesPerView: 3,
    //         spaceBetween: 30,
    //       },
    //       992: {
    //         slidesPerView: 2,
    //         spaceBetween: 20,
    //       },
    //       576: {
    //         slidesPerView: 1,
    //         spaceBetween: 10,
    //       },
    //       0: {
    //         slidesPerView: 1,
    //         spaceBetween: 10,
    //       },
    //     },
    //   });
    // }
  }, []);


  function useGalleryPopup() { //gallery section img popup
    React.useEffect(() => {
      const overlay = document.querySelector('.gallery-overlay');
      if (!overlay) return;
      const overlayInner = overlay.querySelector('.gallery-overlay-inner');
      const overlayImg = overlay.querySelector('.gallery-overlay-img');
      const closeBtn = overlay.querySelector('.gallery-close');
      const imgs = document.querySelectorAll('.gallery-item img');

      function open(src, alt) {
        overlayImg.src = src;
        overlayImg.alt = alt || '';
        overlay.setAttribute('aria-hidden', 'false');
        requestAnimationFrame(() => overlayInner.classList.add('open'));
        document.body.style.overflow = 'hidden';
      }

      function close() {
        overlayInner.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        overlayImg.src = '';
        document.body.style.overflow = '';
      }

      imgs.forEach(img => {
        img.style.cursor = 'pointer';
        img.tabIndex = 0;
        img.addEventListener('click', () => open(img.currentSrc || img.src, img.alt));
        img.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') open(img.currentSrc || img.src, img.alt);
        });
      });

      overlay.addEventListener('click', (e) => {
        if (!overlayInner.contains(e.target)) close();
      });

      closeBtn.addEventListener('click', close);
      overlayImg.addEventListener('click', (e) => e.stopPropagation());

      function handleKey(e) {
        if (e.key === 'Escape' && overlay.getAttribute('aria-hidden') === 'false') close();
      }
      document.addEventListener('keydown', handleKey);

      let startY = null;
      function handleTouchStart(e) { startY = e.touches[0].clientY; }
      function handleTouchEnd(e) {
        if (!startY) return;
        const endY = e.changedTouches[0].clientY;
        if (Math.abs(endY - startY) > 80) close();
        startY = null;
      }
      overlayImg.addEventListener('touchstart', handleTouchStart);
      overlayImg.addEventListener('touchend', handleTouchEnd);

      return () => {
        imgs.forEach(img => {
          img.removeEventListener('click', () => open(img.currentSrc || img.src, img.alt));
          img.removeEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') open(img.currentSrc || img.src, img.alt);
          });
        });
        overlay.removeEventListener('click', (e) => {
          if (!overlayInner.contains(e.target)) close();
        });
        closeBtn.removeEventListener('click', close);
        overlayImg.removeEventListener('click', (e) => e.stopPropagation());
        document.removeEventListener('keydown', handleKey);
        overlayImg.removeEventListener('touchstart', handleTouchStart);
        overlayImg.removeEventListener('touchend', handleTouchEnd);
      };
    }, []);
  }
  useGalleryPopup();


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


  useEffect(() => {

    AOS.init({
      once: true,
      duration: 1000,
    });


    const header = document.querySelector(".header-section-1");
    let lastScroll = 0;

    const onScroll = () => {
      const current = window.scrollY;
      const trigger = window.innerHeight * 1.2; // 30%

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
    <div>
      <Header />


      <section className="hero-slider-active-1">
        <div className="swiper">
          <div className="swiper-wrapper">

            {/* Slide 1 */}
            <div className="swiper-slide">
              <div
                className="hero-side"
                style={{ backgroundImage: `url(${bgImage})` }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="hero-content-1">
                        <div
                          className="subtitle"
                          data-animation="animate__fadeInUp"
                          data-delay="0.3s"
                        >
                          <img src={icon1} alt="icon-1" />
                          <span>Let's Go Save Environment</span>
                        </div>

                        <div
                          className="title"
                          data-animation="animate__fadeInUp"
                          data-delay="0.4s"
                        >
                          <h1>
                            Empowering Innovation. Advancing <span>Education</span>{" "}
                            <span>Transforming Lives.</span>
                          </h1>
                        </div>

                        <div
                          className="text"
                          data-animation="animate__fadeInUp"
                          data-delay="0.5s"
                        >
                          <p>
                            Annamalai Foundation is a global non-profit organization
                            working at the intersection of education, innovation, and
                            community development. We connect minds across borders
                            students, educators, and innovators to create lasting
                            social and scientific impact.
                          </p>
                        </div>

                        <div
                          className="join-us"
                          data-animation="animate__fadeInUp"
                          data-delay="0.6s"
                        >
                          <a className="e-primary-btn has-icon" href="/econest/donations">
                            Join Us Today
                            <span className="icon-wrap">
                              <span className="icon">
                                <i className="fas fa-arrow-right"></i>
                                <i className="fas fa-arrow-right"></i>
                              </span>
                            </span>
                          </a>

                          <div className="author-wrap">
                            <img
                              src={author1}
                              alt="authors"
                            />
                            <div className="author-info">
                              <h5>122.6k+</h5>
                              <p>Team Members</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group-shape-1">
                  <img src={groupShape1} alt="group-shape-1" />
                </div>
                <div className="s-shape-1">
                  <img src={shape2} alt="s-shape-1" />
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="swiper-slide">
              <div
                className="hero-side"
                style={{ backgroundImage: "url('/src/assets/img/bg/hero-bg-6.webp')" }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="hero-content-1">
                        <div
                          className="subtitle"
                          data-animation="animate__fadeInUp"
                          data-delay="0.3s"
                        >
                          <img src={icon1} alt="icon-1" />
                          <span>Let’s Act for Nature’s Future</span>
                        </div>

                        <div
                          className="title"
                          data-animation="animate__fadeInUp"
                          data-delay="0.4s"
                        >
                          <h1>
                            Empowering Innovation. Advancing <span>Education</span>{" "}
                            <span>Transforming Lives.</span>
                          </h1>
                        </div>

                        <div
                          className="text"
                          data-animation="animate__fadeInUp"
                          data-delay="0.5s"
                        >
                          <p>
                            Annamalai Foundation is a global non-profit organization
                            working at the intersection of education, innovation, and
                            community development. We connect minds across borders
                            students, educators, and innovators to create lasting
                            social and scientific impact.
                          </p>
                        </div>

                        <div
                          className="join-us"
                          data-animation="animate__fadeInUp"
                          data-delay="0.6s"
                        >
                          <a className="e-primary-btn has-icon" href="/econest/donations">
                            Become One Today
                            <span className="icon-wrap">
                              <span className="icon">
                                <i className="fas fa-arrow-right"></i>
                                <i className="fas fa-arrow-right"></i>
                              </span>
                            </span>
                          </a>

                          <div className="author-wrap">
                            <img
                              src={author1}
                              alt="authors"
                            />
                            <div className="author-info">
                              <h5>122.6k+</h5>
                              <p>Earth Helpers</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group-shape-1">
                  <img src={groupShape1} alt="group-shape-1" />
                </div>
                <div className="s-shape-1">
                  <img src={shape2} alt="s-shape-1" />
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="swiper-slide">
              <div
                className="hero-side"
                style={{ backgroundImage: "url('/src/assets/img/bg/Frame 96.png')" }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="hero-content-1">
                        <div
                          className="subtitle"
                          data-animation="animate__fadeInUp"
                          data-delay="0.3s"
                        >
                          <img src={icon1} alt="icon-1" />
                          <span>Let's Go Save Environment</span>
                        </div>

                        <div
                          className="title"
                          data-animation="animate__fadeInUp"
                          data-delay="0.4s"
                        >
                          <h1>
                            Empowering Innovation. Advancing <span>Education</span>{" "}
                            <span>Transforming Lives.</span>
                          </h1>
                        </div>

                        <div
                          className="text"
                          data-animation="animate__fadeInUp"
                          data-delay="0.5s"
                        >
                          <p>
                            Annamalai Foundation is a global non-profit organization
                            working at the intersection of education, innovation, and
                            community development. We connect minds across borders
                            students, educators, and innovators to create lasting
                            social and scientific impact.
                          </p>
                        </div>

                        <div
                          className="join-us"
                          data-animation="animate__fadeInUp"
                          data-delay="0.6s"
                        >
                          <a className="e-primary-btn has-icon" href="/econest/donations">
                            Join Us Today
                            <span className="icon-wrap">
                              <span className="icon">
                                <i className="fas fa-arrow-right"></i>
                                <i className="fas fa-arrow-right"></i>
                              </span>
                            </span>
                          </a>

                          <div className="author-wrap">
                            <img
                              src={author1}
                              alt="authors"
                            />
                            <div className="author-info">
                              <h5>122.6k+</h5>
                              <p>Team Members</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group-shape-1">
                  <img src={groupShape1} alt="group-shape-1" />
                </div>
                <div className="s-shape-1">
                  <img src={shape2} alt="s-shape-1" />
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div
                className="hero-side"
                style={{ backgroundImage: "url('/src/assets/img/bg/hero-bg-6.webp')" }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="hero-content-1">
                        <div
                          className="subtitle"
                          data-animation="animate__fadeInUp"
                          data-delay="0.3s"
                        >
                          <img src={icon1} alt="icon-1" />
                          <span>Let’s Act for Nature’s Future</span>
                        </div>

                        <div
                          className="title"
                          data-animation="animate__fadeInUp"
                          data-delay="0.4s"
                        >
                          <h1>
                            Empowering Innovation. Advancing <span>Education</span>{" "}
                            <span>Transforming Lives.</span>
                          </h1>
                        </div>

                        <div
                          className="text"
                          data-animation="animate__fadeInUp"
                          data-delay="0.5s"
                        >
                          <p>
                            Annamalai Foundation is a global non-profit organization
                            working at the intersection of education, innovation, and
                            community development. We connect minds across borders
                            students, educators, and innovators to create lasting
                            social and scientific impact.
                          </p>
                        </div>

                        <div
                          className="join-us"
                          data-animation="animate__fadeInUp"
                          data-delay="0.6s"
                        >
                          <a className="e-primary-btn has-icon" href="/econest/donations">
                            Become One Today
                            <span className="icon-wrap">
                              <span className="icon">
                                <i className="fas fa-arrow-right"></i>
                                <i className="fas fa-arrow-right"></i>
                              </span>
                            </span>
                          </a>

                          <div className="author-wrap">
                            <img
                              src={author1}
                              alt="authors"
                            />
                            <div className="author-info">
                              <h5>122.6k+</h5>
                              <p>Earth Helpers</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group-shape-1">
                  <img src={groupShape1} alt="group-shape-1" />
                </div>
                <div className="s-shape-1">
                  <img src={shape2} alt="s-shape-1" />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="hero-slider-pagination-1"></div>

        <div className="hero-slider-social">
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

          <div className="text">Join Social:</div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">

            <div className="stat-item">
              <h3 className="stat-number" data-target="3000">0</h3>
              <p className="stat-text">
                Students
                <br />
                Trained
              </p>
            </div>

            <div className="stat-item">
              <h3 className="stat-number" data-target="100">0</h3>
              <p className="stat-text">
                Scholarships
                <br />
                Granted
              </p>
            </div>

            <div className="stat-item">
              <h3 className="stat-number" data-target="25">0</h3>
              <p className="stat-text">
                Research
                <br />
                Grants
              </p>
            </div>

            <div className="stat-item d-none d-sm-none d-md-none d-lg-block">
              <h3 className="stat-number" data-target="50">0</h3>
              <p className="stat-text">
                Rural Devlopment
                <br />
                Projects
              </p>
            </div>

            <div className="stat-item">
              <h3 className="stat-number" data-target="20">0</h3>
              <p className="stat-text">
                Global Partner
                <br />
                Institutions
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="what-we-do-section p-t-60 p-b-md-100 p-t-xs-80 p-b-xs-80">
        <div className="container why-us-section">
          <div className="section-top-2">
            <div className="left text-center">
              <div className="common-subtitle" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <img src={icon1} alt="icon-1" />
                <span>Why Us 11</span>
              </div>
              <div className="common-title text-center d-none d-sm-none d-md-none d-lg-block d-xl-block" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                <p>We believe that everyone deserves access to opportunities that empower them to learn, innovate, and grow. By bridging academia, research, and compassion, Annamalai Foundation is redefining how education transforms lives.</p>
              </div>
              <div className="common-title text-center d-block d-sm-block d-md-block d-lg-none d-xl-none" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                <p>We believe that everyone deserves access to opportunities that empower them to learn...</p>
              </div>
            </div>
          </div>
          <div className="row row-gap-md-5 row-gap-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
            <div className="col-xl-4 col-md-6 col-sm-12">
              <div className="project-card text-center">
                <div className="thumb">
                  <a href='/econest/services-details'>
                    <div className="image-container">
                      <img src={frame106} alt="thumb-14" />
                    </div>
                  </a>
                  <div className="content">
                    <h5>Innovation & Research</h5>
                    <p>
                      Access global experts, cutting-edge facilities, and collaborative networks to accelerate your research.
                    </p>
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
            </div>
            <div className="col-xl-4 col-md-6 col-sm-12">
              <div className="project-card text-center">
                <div className="thumb">
                  <a href='/econest/services-details'>
                    <div className="image-container">
                      <img src={frame107} alt="thumb-15" />
                    </div>
                  </a>
                  <div className="content">
                    <h5>Global Partnerships</h5>
                    <p>
                      Partner with us to foster cross-disciplinary projects and expand your research impact globally.
                    </p>
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
            </div>
            <div className="col-xl-4 col-md-6 col-sm-12">
              <div className="project-card text-center">
                <div className="thumb">
                  <a href='/econest/services-details'>
                    <div className="image-container">
                      <img src={frame108} alt="thumb-16" />
                    </div>
                  </a>
                  <div className="content">
                    <h5>Community Development</h5>
                    <p>
                      Transform your ideas into reality with mentorship, resources, and connections to research partners.
                    </p>
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
            </div>
          </div>


        </div>
        {/* <!-- <div className="shape-10">
    <img src={shape10} alt="shape-10"/>
	</div>
	<div className="shape-11">
    <img src={shape11} alt="shape-11"/>
	</div> --> */}
      </section>

      <section className="about-three">
        <div className="about-three__shape-1 d-none d-sm-none d-md-none d-lg-block">
          <img src={aboutShape1} alt="" />
        </div>
        <div className="about-three__shape-2 d-none d-sm-none d-md-none d-lg-block">
          <img src={aboutShape2} alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-md-7">
              <section className="about-section">
                <div className="container">
                  <h2>Who We Are</h2>
                  <p className="about-intro">
                    Annamalai Foundation is an international non-profit organization established to promote
                    education, research, and social service.
                  </p>

                  <div className="tab-buttons">
                    <button className="tab-btn active" data-tab="history">CORE VALUES</button>
                    <button className="tab-btn" data-tab="mission">MISSION & VISION</button>
                    <button className="tab-btn" data-tab="vision">ABOUT FOUNDER</button>
                  </div>

                  <div className="tab-content active" id="history">
                    <div className="scroll">
                      <div className="abt-para-container">
                        <div className="para">
                          <h4>Integrity : <span>We act with honesty, transparency, and accountability.</span></h4>
                        </div>
                        <div className="para">
                          <h4>Innovation : <span>We believe in the power of creative thinking.</span></h4>
                        </div>
                        <div className="para">
                          <h4>Service : <span>Our purpose is rooted in compassion and humanity.</span></h4>
                        </div>
                        <div className="para">
                          <h4>Collaboration : <span>Together, we achieve greater impact.</span></h4>
                        </div>
                        <div className="para">
                          <h4>Excellence : <span>We strive for the highest standards in every project.</span></h4>
                        </div>
                      </div>
                      <div className="abt-unique-para">
                        <h4>What Makes Us Unique :</h4>
                        <ul>
                          <li>Dual presence in India and the USA, enabling international collaboration.</li>
                          <li>Focus on both academic excellence and community welfare.</li>
                          <li>Blend of modern innovation with cultural and ethical values.</li>
                          <li>Transparent operations with measurable impact.</li>
                        </ul>
                      </div>
                    </div>



                    <div className="details-btn1 m-t-xs-15 m-t-sm-15">
                      <a className='e-primary-btn has-icon is-hover-white' href='/econest/services-details'>
                        KNOW MORE
                        <span className="icon-wrap">
                          <span className="icon"><i className="fas fa-arrow-right"></i><i
                            className="fas fa-arrow-right"></i></span>
                        </span>
                      </a>
                    </div>

                  </div>

                  <div className="tab-content" id="mission">
                    <div className="scroll">
                      <p>
                        To empower students, educators, and innovators through access to quality education and research.
                      </p>
                      <ul>
                        <li>To build bridges between Indian and international institutions.</li>
                        <li>To support technology-driven solutions for social and environmental challenges.</li>
                        <li>To serve communities through sustainable development programs.</li>
                      </ul>
                      <p>To create a world where knowledge, innovation, and compassion work together to uplift humanity.</p>

                    </div>
                    <div className="details-btn1">
                      <a className='e-primary-btn has-icon is-hover-white' href='/econest/services-details'>
                        KNOW MORE
                        <span className="icon-wrap">
                          <span className="icon"><i className="fas fa-arrow-right"></i><i
                            className="fas fa-arrow-right"></i></span>
                        </span>
                      </a>
                    </div>
                  </div>

                  <div className="tab-content" id="vision">
                    <div className="scroll">
                      <p>
                        <span style={{ fontWeight: 600 }}> A Grand Heritage : </span>
                        Perumal’s paternal grandfather, Mr. N. Arunchalam Chettiar, was a highly respected figure in the region, known for his honesty, traditional wisdom, and service to the community. His grandmother, Mrs. Muniyammal, lived an extraordinary life of 106 years—remaining active and independent till her final days without the need for walking sticks or medical support.</p>
                      <p><span style={{ fontWeight: 600 }}>The Visionary Father: A Village Scientist : </span>
                        Perumal’s father, Mr. Annamalai Chettiar (fondly called "Kannu"), was born as the fifth child in his family. He lived a full and purposeful life for 83 years, passing away on June 2, 2023. A man of exceptional ingenuity, he introduced practical solutions to uplift the local villages. From setting up flour mills, rice grinding machines, and battery-powered lighting systems for students, to supporting educational and farming innovations, he was endearingly known by his peers as the “Village Scientist.” His work inspired a generation of rural progress and educational focus.</p>
                    </div>
                    <div className="details-btn1">
                      <a className='e-primary-btn has-icon is-hover-white' href='/econest/services-details'>
                        KNOW MORE
                        <span className="icon-wrap">
                          <span className="icon"><i className="fas fa-arrow-right"></i><i
                            className="fas fa-arrow-right"></i></span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </section>

            </div>
            <div className="col-xl-5 col-md-5 wow fadeInRight" data-wow-delay=".3s">
              <div className="about-three__right">
                <div className="about-three__right-img">
                  <img src={aboutPerumal} alt="" />
                  <div className="about-three__round-text-box">
                    <div className="about-three__round-text-box-inner  rotate-me">
                      <div className="about-three__curved-circle">
                        <span className="char1"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.230769em", transform: "rotate(-173.573deg)", transformOrigin: "center 5.92308em" }}>-</span>
                        <span className="char2"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.115385em", transform: "rotate(-168.517deg)", transformOrigin: "center 5.92308em" }}>&nbsp;</span>
                        <span className="char3"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.346154em", transform: "rotate(-161.776deg)", transformOrigin: "center 5.92308em" }}>y</span>
                        <span className="char4"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-152.227deg)", transformOrigin: "center 5.92308em" }}>e</span>
                        <span className="char5"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.346154em", transform: "rotate(-142.678deg)", transformOrigin: "center 5.92308em" }}>a</span>
                        <span className="char6"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-133.129deg)", transformOrigin: "center 5.92308em" }}>r</span>
                        <span className="char7"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-124.141deg)", transformOrigin: "center 5.92308em" }}>s</span>
                        <span className="char8"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.230769em", transform: "rotate(-119.647deg)", transformOrigin: "center 5.92308em" }}>&nbsp;</span>
                        <span className="char8"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.115385em", transform: "rotate(-117.962deg)", transformOrigin: "center 5.92308em" }}>&nbsp;</span>
                        <span className="char9"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.384615em", transform: "rotate(-110.659deg)", transformOrigin: "center 5.92308em" }}>o</span>
                        <span className="char10"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-100.548deg)", transformOrigin: "center 5.92308em" }}>f</span>
                        <span className="char11"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.115385em", transform: "rotate(-94.3695deg)", transformOrigin: "center 5.92308em" }}>&nbsp;</span>
                        <span className="char12"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-88.1906deg)", transformOrigin: "center 5.92308em" }}>e</span>
                        <span className="char13"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.346154em", transform: "rotate(-78.6413deg)", transformOrigin: "center 5.92308em" }}>x</span>
                        <span className="char14"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-69.092deg)", transformOrigin: "center 5.92308em" }}>p</span>
                        <span className="char15"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-60.1044deg)", transformOrigin: "center 5.92308em" }}>e</span>
                        <span className="char16"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-51.1168deg)", transformOrigin: "center 5.92308em" }}>r</span>
                        <span className="char17"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.153846em", transform: "rotate(-44.3761deg)", transformOrigin: "center 5.92308em" }}>i</span>
                        <span className="char18"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-37.6355deg)", transformOrigin: "center 5.92308em" }}>e</span>
                        <span className="char19"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.384615em", transform: "rotate(-27.5244deg)", transformOrigin: "center 5.92308em" }}>n</span>
                        <span className="char20"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.384615em", transform: "rotate(-16.29deg)", transformOrigin: "center 5.92308em" }}>c</span>
                        <span className="char21"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-6.17896deg)", transformOrigin: "center 5.92308em" }}>e</span>
                        <span className="char22"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.115385em", transform: "rotate(2.84217e-14deg)", transformOrigin: "center 5.92308em" }}>&nbsp;</span>
                        <span className="char23"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.230769em", transform: "rotate(5.05551deg)", transformOrigin: "center 5.92308em" }}>-</span>
                        <span className="char24"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.115385em", transform: "rotate(10.111deg)", transformOrigin: "center 5.92308em" }}>&nbsp;</span>
                        <span className="char25"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.346154em", transform: "rotate(16.8517deg)", transformOrigin: "center 5.92308em" }}>y</span>
                        <span className="char26"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(26.401deg)", transformOrigin: "center 5.92308em" }}>e</span>
                        <span className="char27"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.346154em", transform: "rotate(35.9503deg)", transformOrigin: "center 5.92308em" }}>a</span>
                        <span className="char28"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(45.4996deg)", transformOrigin: "center 5.92308em" }}>r</span>
                        <span className="char29"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(54.4872deg)", transformOrigin: "center 5.92308em" }}>s</span>
                        <span className="char30"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.115385em", transform: "rotate(60.6661deg)", transformOrigin: "center 5.92308em" }}>&nbsp;</span>
                        <span className="char31"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.384615em", transform: "rotate(67.9685deg)", transformOrigin: "center 5.92308em" }}>o</span>
                        <span className="char31"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.384615em", transform: "rotate(67.9685deg)", transformOrigin: "center 5.92308em" }}>o</span>
                        <span className="char32"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(78.0795deg)", transformOrigin: "center 5.92308em" }}>f</span>
                        <span className="char33"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.115385em", transform: "rotate(84.2585deg)", transformOrigin: "center 5.92308em" }}>&nbsp;</span>
                        <span className="char34"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(90.4375deg)", transformOrigin: "center 5.92308em" }}>e</span>
                        <span className="char35"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.346154em", transform: "rotate(99.9868deg)", transformOrigin: "center 5.92308em" }}>x</span>
                        <span className="char36"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(109.536deg)", transformOrigin: "center 5.92308em" }}>p</span>
                        <span className="char37"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(118.524deg)", transformOrigin: "center 5.92308em" }}>e</span>
                        <span className="char38"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(127.511deg)", transformOrigin: "center 5.92308em" }}>r</span>
                        <span className="char39"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.153846em", transform: "rotate(134.252deg)", transformOrigin: "center 5.92308em" }}>i</span>
                        <span className="char40"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(140.993deg)", transformOrigin: "center 5.92308em" }}>e</span>
                        <span className="char41"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.384615em", transform: "rotate(151.104deg)", transformOrigin: "center 5.92308em" }}>n</span>
                        <span className="char42"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.384615em", transform: "rotate(162.338deg)", transformOrigin: "center 5.92308em" }}>c</span>
                        <span className="char43"
                          style={{ position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(172.449deg)", transformOrigin: "center 5.92308em" }}>e</span>
                      </div>
                    </div>
                    <div className="about-three__count count-box">
                      <h3 className="count-text" data-stop="15" data-speed="1500">00</h3>
                      <span>+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="what-we-do-section p-t-60 p-b-100 p-b-md-100 p-t-xs-80 p-b-xs-80" style={{ backgroundImage: "url(/src/assets/img/bg/what-we-do-bg-1.jpg)" }}>
        <div className="container">
          <div className="section-top-2">
            <div className="left text-center">
              <div className="common-subtitle" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <img src={icon1} alt="icon-1" />
                <span>Why Us 1</span>
              </div>
              <div className="common-title text-start" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                <h2>Join a thriving community of researchers, innovators, and experts committed to advancing knowledge and creating meaningful impact.</h2>
              </div>
            </div>
          </div>

          {/* Swiper Wrapper */}
          <div className="swiper what-we-do-slider" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
            <div className="swiper-wrapper">
              {/* Slide 1 */}
              <div className="swiper-slide">
                <div className="project-card text-center">
                  <div className="thumb">
                    <a href="/econest/services-details">
                      <div className="image-container">
                        <img src={thumb14} alt="thumb-14" />
                        <div className="overlay"></div>
                      </div>
                    </a>
                    <div className="content">
                      <h5>Education & Scholarship Program</h5>
                      <p>We provide educational support and scholarships for underprivileged students to pursue higher studies...</p>
                      <div className="details-btn">
                        <a className="e-primary-btn has-icon is-hover-white" href="/econest/services-details">
                          KNOW MORE
                          <span className="icon-wrap"><span className="icon"><i className="fas fa-arrow-right"></i><i className="fas fa-arrow-right"></i></span></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="swiper-slide">
                <div className="project-card text-center">
                  <div className="thumb">
                    <a href="/econest/services-details">
                      <div className="image-container">
                        <img src={thumb15} alt="thumb-15" />
                        <div className="overlay"></div>
                      </div>
                    </a>
                    <div className="content">
                      <h5>Research & Innovation <br />Program</h5>
                      <p>We identify and support innovators working in emerging fields like AI, IoT, Robotics, and Clean Energy.</p>
                      <div className="details-btn">
                        <a className="e-primary-btn has-icon is-hover-white" href="/econest/services-details">
                          KNOW MORE
                          <span className="icon-wrap"><span className="icon"><i className="fas fa-arrow-right"></i><i className="fas fa-arrow-right"></i></span></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 3 */}
              <div className="swiper-slide">
                <div className="project-card text-center">
                  <div className="thumb">
                    <a href="/econest/services-details">
                      <div className="image-container">
                        <img src={thumb16} alt="thumb-16" />
                        <div className="overlay"></div>
                      </div>
                    </a>
                    <div className="content">
                      <h5>International Collaboration Program</h5>
                      <p>We believe knowledge should travel across borders. Our collaboration initiatives bring Indian students...</p>
                      <div className="details-btn">
                        <a className="e-primary-btn has-icon is-hover-white" href="/econest/services-details">
                          KNOW MORE
                          <span className="icon-wrap"><span className="icon"><i className="fas fa-arrow-right"></i><i className="fas fa-arrow-right"></i></span></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Slide 4 */}
              <div className="swiper-slide">
                <div className="project-card text-center">
                  <div className="thumb">
                    <a href="/econest/services-details">
                      <div className="image-container">
                        <img src={thumb15} alt="thumb-17" />
                        <div className="overlay"></div>
                      </div>
                    </a>
                    <div className="content">
                      <h5>Community Development Program</h5>
                      <p>We work to uplift communities through social, cultural, and environmental initiatives.</p>
                      <div className="details-btn">
                        <a className="e-primary-btn has-icon is-hover-white" href="/econest/services-details">
                          KNOW MORE
                          <span className="icon-wrap"><span className="icon"><i className="fas fa-arrow-right"></i><i className="fas fa-arrow-right"></i></span></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* New Slide 5 */}
              <div className="swiper-slide">
                <div className="project-card text-center">
                  <div className="thumb">
                    <a href="/econest/services-details">
                      <div className="image-container">
                        <img src={thumb15} alt="thumb-17" />
                        <div className="overlay"></div>
                      </div>
                    </a>
                    <div className="content">
                      <h5>Community Development Program</h5>
                      <p>We work to uplift communities through social, cultural, and environmental initiatives.</p>
                      <div className="details-btn">
                        <a className="e-primary-btn has-icon is-hover-white" href="/econest/services-details">
                          KNOW MORE
                          <span className="icon-wrap"><span className="icon"><i className="fas fa-arrow-right"></i><i className="fas fa-arrow-right"></i></span></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* New Slide 6 */}
              <div className="swiper-slide">
                <div className="project-card text-center">
                  <div className="thumb">
                    <a href="/econest/services-details">
                      <div className="image-container">
                        <img src={thumb15} alt="thumb-17" />
                        <div className="overlay"></div>
                      </div>
                    </a>
                    <div className="content">
                      <h5>Community Development Program</h5>
                      <p>We work to uplift communities through social, cultural, and environmental initiatives.</p>
                      <div className="details-btn">
                        <a className="e-primary-btn has-icon is-hover-white" href="/econest/services-details">
                          KNOW MORE
                          <span className="icon-wrap"><span className="icon"><i className="fas fa-arrow-right"></i><i className="fas fa-arrow-right"></i></span></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Swiper Pagination & Navigation */}
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>

        {/* 
  <div className="shape-10"><img src={shape10} alt="shape-10" /></div>
  <div className="shape-11"><img src={shape11} alt="shape-11" /></div>
        */}
      </section>

      <section className="team-section">
        <div className="team-head">
          <h2>Meet Our Dedicated Team</h2>
          <p>
            Join a thriving community of researchers, innovators, and experts
            committed to advancing knowledge and creating meaningful impact.
          </p>
        </div>

        <div className="team-container">
          <div className="team-card">
            <div className="p-2">
              <Link to="volunteerdetails">
                <img src={team1} alt="Member 1" />
              </Link>
              <h4>Padmashri Dr. Annadurai Mylswamy</h4>
              <p className="role">Former ISRO Director, India</p>
            </div>
          </div>

          <div className="team-card">
            <div className="p-2">
              <Link to="volunteerdetails">
                <img src={team2} alt="Member 2" />
              </Link>
              <h4>Dr. Antony Jeevarajan</h4>
              <p className="role">
                Human Health and Performance (HH&P) Directorate
              </p>
            </div>
          </div>

          <div className="team-card">
            <div className="p-2">
              <Link to="volunteerdetails">
                <img src={team3} alt="Member 3" />
              </Link>
              <h4>Dr. Swati Mohan</h4>
              <p className="role">Aerospace engineer</p>
            </div>
          </div>

          <div className="team-card">
            <div className="p-2">
              <Link to="volunteerdetails">
                <img src={team4} alt="Member 4" />
              </Link>
              <h4>Prof. Sultan Ahmed Ismail</h4>
              <p className="role">Member, TN State Commission</p>
            </div>
          </div>
          <div className="team-card">
            <div className="p-2">
              <Link to="volunteerdetails">
                <img src={team5} alt="Member 4" />
              </Link>
              <h4>Prof. Na.Ganesan</h4>
              <p className="role">Director, NASA, USA</p>
            </div>
          </div>
        </div>

        <div className="details-btn1">
          <a className="e-primary-btn has-icon is-hover-white" href="#">
            KNOW MORE
            <span className="icon-wrap">
              <span className="icon">
                <i className="fas fa-arrow-right"></i>
                <i className="fas fa-arrow-right"></i>
              </span>
            </span>
          </a>
        </div>
      </section>

      <section className="events-section">
        <div className="events-head">
          <h2>Events</h2>
          <p>
            Join a thriving community of researchers, innovators, and experts
            committed to advancing knowledge and creating meaningful impact.
          </p>
        </div>

        <div className="events-container">
          {/* <!-- Card 1 --> */}
          <div className="event-card">
            <div className="event-img">
              <img src={event1} alt="AI Fest 2025" />
              <div className="event-date">
                <span className="day">20</span>
                <span className="month">November</span>
                <span className="year">2025</span>
              </div>
            </div>
            <div className="event-content">
              <h4>Youth Leadership & Innovation Camp 2025</h4>
              <p>
                Tirupattur’s Biggest Technology Expo. Platinum Jubilee Special
                Edition Sacred Heart College.
              </p>
              <div className="details-btn">
                <a
                  className="e-primary-btn has-icon is-hover-white"
                  href="/econest/services-details"
                >
                  KNOW MORE
                  <span className="icon-wrap">
                    <span className="icon">
                      <i className="fas fa-arrow-right"></i>
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </span>
                </a>
              </div>{" "}
            </div>
          </div>

          {/* <!-- Card 2 --> */}
          <div className="event-card">
            <div className="event-img">
              <img src={event2} alt="AI Fest 2025" />
              <div className="event-date">
                <span className="day">20</span>
                <span className="month">November</span>
                <span className="year">2025</span>
              </div>
            </div>
            <div className="event-content">
              <h4>International Research Collaboration Meet</h4>
              <p>
                Tirupattur’s Biggest Technology Expo. Platinum Jubilee Special
                Edition Sacred Heart College.
              </p>
              <div className="details-btn">
                <a
                  className="e-primary-btn has-icon is-hover-white"
                  href="/econest/services-details"
                >
                  KNOW MORE
                  <span className="icon-wrap">
                    <span className="icon">
                      <i className="fas fa-arrow-right"></i>
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </span>
                </a>
              </div>{" "}
            </div>
          </div>

          {/* <!-- Card 3 --> */}
          <div className="event-card">
            <div className="event-img">
              <img src={event3} alt="AI Fest 2025" />
              <div className="event-date">
                <span className="day">20</span>
                <span className="month">November</span>
                <span className="year">2025</span>
              </div>
            </div>
            <div className="event-content">
              <h4>Global Education Forum 2025 (USA-India Partnership)</h4>
              <p>
                Tirupattur’s Biggest Technology Expo. Platinum Jubilee Special
                Edition Sacred Heart College.
              </p>
              <div className="details-btn">
                <a
                  className="e-primary-btn has-icon is-hover-white"
                  href="/econest/services-details"
                >
                  KNOW MORE
                  <span className="icon-wrap">
                    <span className="icon">
                      <i className="fas fa-arrow-right"></i>
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </span>
                </a>
              </div>{" "}
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <h2>Event Gallery</h2>

        <div className="gallery-grid">
          <div className="gallery-item">
            <img src={gallery1} alt="Event 1" />
          </div>
          <div className="gallery-item">
            <img src={gallery2} alt="Event 2" />
          </div>
          <div className="gallery-item">
            <img src={gallery3} alt="Event 3" />
          </div>
          <div className="gallery-item">
            <img src={gallery4} alt="Event 4" />
          </div>
          <div className="gallery-item">
            <img src={gallery5} alt="Event 5" />
          </div>
          <div className="gallery-item">
            <img src={gallery6} alt="Event 6" />
          </div>

          {/* Hidden on small screens */}
          <div className="gallery-item d-none d-sm-none d-md-none d-lg-block">
            <img src={gallery7} alt="Event 7" />
          </div>
          <div className="gallery-item d-none d-sm-none d-md-none d-lg-block">
            <img src={gallery8} alt="Event 8" />
          </div>
        </div>

        <div className="details-btn1">
          <a
            className="e-primary-btn has-icon is-hover-white"
            href="/econest/services-details"
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

        {/* Overlay */}
        <div className="gallery-overlay" role="dialog" aria-hidden="true">
          <div className="gallery-overlay-inner">
            <button className="gallery-close" aria-label="Close gallery">
              &times;
            </button>
            <img className="gallery-overlay-img" src="" alt="" />
          </div>
        </div>
      </section>

      <section className="latest-blog-section p-t-80 p-t-xs-80 p-b-80 p-b-xs-20 p-b-md-20 p-b-lg-20 p-b-xl-20">
        <div className="container">
          <div className="row justify-content-between m-b-xl-120 m-b-lg-100 m-b-md-80">
            <div className="col-xl-3 col-md-6 col-12">
              <div className="latest-blog-content" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                <div className="common-title text-start">
                  <h2>Check Latest Blog Post</h2>
                </div>
                <div className="text">
                  <p>Join a thriving community of researchers, innovators, and experts committed to advancing knowledge.</p>
                </div>
                <div className="details-btn1">
                  <a className='e-primary-btn has-icon is-hover-white' href='/econest/services-details'>
                    EXPLORE ALL POST
                    <span className="icon-wrap">
                      <span className="icon"><i className="fas fa-arrow-right"></i><i className="fas fa-arrow-right"></i></span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-6 col-12">
              <div className="blog-slider-active" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                <div className="swiper">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="blog-card">
                        <div className="thumb">
                          <a href='/econest/blog-details'><img alt="thumb-5" src={event1} /></a>
                          {/* <!-- <div className="category">
                            <a href='/econest/blog-details'>Forest</a>
                          </div> --> */}
                          <div className="event-date">
                            <h2>09</h2>
                            <h5>Jan</h5><span>2025</span>
                          </div>
                        </div>
                        <div className="content">
                          <div className="content-top p-0">
                            <div className="title">
                              <h3><a href='/econest/blog-details'>INNOVATE 25 – AI FEST 2025</a></h3>
                            </div>
                            <div className="text">
                              <p>Tirupattur’s Biggest Technology Expo. Platinum Jubilee Special Edition Sacred Heart College. </p>
                            </div>
                          </div>
                          <div className="content-bottom">
                            <a className='e-primary-btn has-icon has-small' href='/econest/blog-details'>KNOW
                              MORE
                              <span className="icon-wrap"><span className="icon"><i className="fas fa-arrow-right"></i><i className="fas fa-arrow-right"></i></span></span></a>
                            <div className="social-share">
                              <button className="total-shared"><i className="fa-solid fa-share-nodes"></i>
                                <span>367</span></button>
                              <div className="social-links">
                                <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
                                <a href="https://twitter.com"><i className="fab fa-x-twitter"></i></a>
                                <a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a>
                                <a href="https://linkedin.com"><i className="fab fa-linkedin-in"></i></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="blog-card">
                        <div className="thumb">
                          <a href='/econest/blog-details'><img alt="thumb-6" src={event2} /></a>
                          {/* <!-- <div className="category">
                            <a href='/econest/blog-details'>Recycle</a>
                          </div> --> */}
                          <div className="event-date">
                            <h2>24</h2>
                            <h5>Feb</h5><span>2025</span>
                          </div>
                        </div>
                        <div className="content">
                          <div className="content-top p-0">
                            <div className="title">
                              <h3><a href='/econest/blog-details'>Expert Network</a></h3>
                            </div>
                            <div className="text">
                              <p>Connect directly with Subject Matter Experts who can guide, mentor, and collaborate on your projects.y</p>
                            </div>
                          </div>
                          <div className="content-bottom">
                            <a className='e-primary-btn has-icon has-small' href='/econest/blog-details'>KNOW
                              MORE
                              <span className="icon-wrap"><span className="icon"><i className="fas fa-arrow-right"></i><i className="fas fa-arrow-right"></i></span></span></a>
                            <div className="social-share">
                              <button className="total-shared"><i className="fa-solid fa-share-nodes"></i>
                                <span>367</span></button>
                              <div className="social-links">
                                <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
                                <a href="https://twitter.com"><i className="fab fa-x-twitter"></i></a>
                                <a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a>
                                <a href="https://linkedin.com"><i className="fab fa-linkedin-in"></i></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="blog-card">
                        <div className="thumb">
                          <a href='/econest/blog-details'><img alt="thumb-5" src={event1} /></a>
                          {/* <!-- <div className="category">
                            <a href='/econest/blog-details'>Forest</a>
                          </div> --> */}
                          <div className="event-date">
                            <h2>09</h2>
                            <h5>Jan</h5><span>2025</span>
                          </div>
                        </div>
                        <div className="content">
                          <div className="content-top p-0">
                            <div className="title">
                              <h3><a href='/econest/blog-details'>Research Resources</a></h3>
                            </div>
                            <div className="text">
                              <p>Access cutting-edge research facilities, databases, and tools through our partner institutions.</p>
                            </div>
                          </div>
                          <div className="content-bottom">
                            <a className='e-primary-btn has-icon has-small' href='/econest/blog-details'>KNOW
                              MORE
                              <span className="icon-wrap"><span className="icon"><i className="fas fa-arrow-right"></i><i className="fas fa-arrow-right"></i></span></span></a>
                            <div className="social-share">
                              <button className="total-shared"><i className="fa-solid fa-share-nodes"></i>
                                <span>367</span></button>
                              <div className="social-links">
                                <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
                                <a href="https://twitter.com"><i className="fab fa-x-twitter"></i></a>
                                <a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a>
                                <a href="https://linkedin.com"><i className="fab fa-linkedin-in"></i></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="blog-card">
                        <div className="thumb">
                          <a href='/econest/blog-details'><img alt="thumb-6" src={event2} /></a>
                          {/* <!-- <div className="category">
                            <a href='/econest/blog-details'>Recycle</a>
                          </div> --> */}
                          <div className="event-date">
                            <h2>24</h2>
                            <h5>Feb</h5><span>2025</span>
                          </div>
                        </div>
                        <div className="content">
                          <div className="content-top p-0">
                            <div className="title">
                              <h3><a href='/econest/blog-details'>Collaborative Environment</a></h3>
                            </div>
                            <div className="text">
                              <p>Work alongside international scholars in a supportive ecosystem designed for innovation.</p>
                            </div>
                          </div>
                          <div className="content-bottom">
                            <a className='e-primary-btn has-icon has-small' href='/econest/blog-details'>KNOW
                              MORE
                              <span className="icon-wrap"><span className="icon"><i className="fas fa-arrow-right"></i><i className="fas fa-arrow-right"></i></span></span></a>
                            <div className="social-share">
                              <button className="total-shared"><i className="fa-solid fa-share-nodes"></i>
                                <span>367</span></button>
                              <div className="social-links">
                                <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
                                <a href="https://twitter.com"><i className="fab fa-x-twitter"></i></a>
                                <a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a>
                                <a href="https://linkedin.com"><i className="fab fa-linkedin-in"></i></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="blog-pagination"></div>
              </div>
            </div>
          </div>
          {/* <!-- <div className="latest-blog-row-bottom" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
            <div className="row-bottom-thumb">
              <div className="thumb"><img alt="thumb" src={thumb84} /></div>
            </div>
            <div className="row row-gap-4 align-items-center">
              <div className="col-md-6 col-12">
                <div className="common-title text-start">
                  <h2>Get interesting <span><img alt="icon" src={icon12} /></span> news
                    <span><i className="fa-solid fa-arrow-right-long"></i></span></h2>
                </div>
                <p>Sign up to get the latest updates!</p>
              </div>
              <div className="col-md-6 col-12">
                <form className="form-1">
                  <div className="input-wrap-2 m-b-20">
                    <input placeholder="example@gmail.com" type="email" />
                  </div>
                  <button className="e-primary-btn has-icon" type="submit">Subscribe Now
                    <span className="icon-wrap"><span className="icon"><i className="fa-regular fa-arrow-right"></i><i className="fa-regular fa-arrow-right"></i></span></span>
                  </button>
                </form>
              </div>
            </div>
          </div> --> */}
        </div>
        {/* <!-- <div className="shape"><img alt="shape" src={shape38} /></div> --> */}
      </section>
      <Footer />
   </div>
  );
}

export default Home;
