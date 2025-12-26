import React from 'react';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import Footer from './Footer';
import Header from './Headers';


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
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </section>

      <Footer />

    </div>
  );
}
export default ContactUs;