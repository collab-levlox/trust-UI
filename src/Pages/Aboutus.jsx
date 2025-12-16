import React from 'react';
import { Link } from "react-router-dom";
import { useEffect } from 'react';


function Aboutus() {

  React.useEffect(() => {
    function handleScroll() {  // header sticky
      let header = document.querySelector(".header-section");
      if (!header) return;
      let scrollY = window.scrollY;
      let pageHeight = document.body.scrollHeight;
  
      let triggerPoint = pageHeight * 0.06; // 12%
  
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
                          <li><a href="blog.html">About Us</a></li>
                      </ul>
                  </div>
                  <div className="breadcrumb-title" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                      <h2>About Us</h2>
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

      <section className="about-three">
  <div className="about-three__shape-1 d-none d-sm-none d-md-none d-lg-block">
    <img src="/src/assets/images/shapes/about-three-shape-1.png" alt="" />
  </div>
  <div className="about-three__shape-2 d-none d-sm-none d-md-none d-lg-block">
    <img src="/src/assets/images/shapes/about-three-shape-2.png" alt="" />
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
              <span style={{fontWeight: 600}}> A Grand Heritage : </span>
                Perumal’s paternal grandfather, Mr. N. Arunchalam Chettiar, was a highly respected figure in the region, known for his honesty, traditional wisdom, and service to the community. His grandmother, Mrs. Muniyammal, lived an extraordinary life of 106 years—remaining active and independent till her final days without the need for walking sticks or medical support.</p>
              <p><span style={{fontWeight: 600}}>The Visionary Father: A Village Scientist : </span>
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
            <img src="/src/assets/img/abt-us-1.jpg" alt="" />
            <div className="about-three__round-text-box">
              <div className="about-three__round-text-box-inner  rotate-me">
                <div className="about-three__curved-circle">
                  <span className="char1"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.230769em", transform: "rotate(-173.573deg)", transformOrigin: "center 5.92308em"}}>-</span>
                  <span className="char2"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.115385em", transform: "rotate(-168.517deg)", transformOrigin: "center 5.92308em"}}>&nbsp;</span>
                  <span className="char3"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.346154em", transform: "rotate(-161.776deg)", transformOrigin: "center 5.92308em"}}>y</span>
                  <span className="char4"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-152.227deg)", transformOrigin: "center 5.92308em"}}>e</span>
                  <span className="char5"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.346154em", transform: "rotate(-142.678deg)", transformOrigin: "center 5.92308em"}}>a</span>
                  <span className="char6"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-133.129deg)", transformOrigin: "center 5.92308em"}}>r</span>
                  <span className="char7"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-124.141deg)", transformOrigin: "center 5.92308em"}}>s</span>
                  <span className="char8"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.230769em", transform: "rotate(-119.647deg)", transformOrigin: "center 5.92308em"}}>&nbsp;</span>
                  <span className="char8"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.115385em", transform: "rotate(-117.962deg)", transformOrigin: "center 5.92308em"}}>&nbsp;</span>
                  <span className="char9"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.384615em", transform: "rotate(-110.659deg)", transformOrigin: "center 5.92308em"}}>o</span>
                  <span className="char10"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-100.548deg)", transformOrigin: "center 5.92308em"}}>f</span>
                  <span className="char11"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.115385em", transform: "rotate(-94.3695deg)", transformOrigin: "center 5.92308em"}}>&nbsp;</span>
                  <span className="char12"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-88.1906deg)", transformOrigin: "center 5.92308em"}}>e</span>
                  <span className="char13"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.346154em", transform: "rotate(-78.6413deg)", transformOrigin: "center 5.92308em"}}>x</span>
                  <span className="char14"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-69.092deg)", transformOrigin: "center 5.92308em"}}>p</span>
                  <span className="char15"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-60.1044deg)", transformOrigin: "center 5.92308em"}}>e</span>
                  <span className="char16"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-51.1168deg)", transformOrigin: "center 5.92308em"}}>r</span>
                  <span className="char17"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.153846em", transform: "rotate(-44.3761deg)", transformOrigin: "center 5.92308em"}}>i</span>
                  <span className="char18"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-37.6355deg)", transformOrigin: "center 5.92308em"}}>e</span>
                  <span className="char19"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.384615em", transform: "rotate(-27.5244deg)", transformOrigin: "center 5.92308em"}}>n</span>
                  <span className="char20"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.384615em", transform: "rotate(-16.29deg)", transformOrigin: "center 5.92308em"}}>c</span>
                  <span className="char21"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(-6.17896deg)", transformOrigin: "center 5.92308em"}}>e</span>
                  <span className="char22"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.115385em", transform: "rotate(2.84217e-14deg)", transformOrigin: "center 5.92308em"}}>&nbsp;</span>
                  <span className="char23"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.230769em", transform: "rotate(5.05551deg)", transformOrigin: "center 5.92308em"}}>-</span>
                  <span className="char24"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.115385em", transform: "rotate(10.111deg)", transformOrigin: "center 5.92308em"}}>&nbsp;</span>
                  <span className="char25"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.346154em", transform: "rotate(16.8517deg)", transformOrigin: "center 5.92308em"}}>y</span>
                  <span className="char26"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(26.401deg)", transformOrigin: "center 5.92308em"}}>e</span>
                  <span className="char27"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.346154em", transform: "rotate(35.9503deg)", transformOrigin: "center 5.92308em"}}>a</span>
                  <span className="char28"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(45.4996deg)", transformOrigin: "center 5.92308em"}}>r</span>
                  <span className="char29"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(54.4872deg)", transformOrigin: "center 5.92308em"}}>s</span>
                  <span className="char30"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.115385em", transform: "rotate(60.6661deg)", transformOrigin: "center 5.92308em"}}>&nbsp;</span>
                  <span className="char31"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.384615em", transform: "rotate(67.9685deg)", transformOrigin: "center 5.92308em"}}>o</span>
                  <span className="char31"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.384615em", transform: "rotate(67.9685deg)", transformOrigin: "center 5.92308em"}}>o</span>
                  <span className="char32"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(78.0795deg)", transformOrigin: "center 5.92308em"}}>f</span>
                  <span className="char33"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.115385em", transform: "rotate(84.2585deg)", transformOrigin: "center 5.92308em"}}>&nbsp;</span>
                  <span className="char34"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(90.4375deg)", transformOrigin: "center 5.92308em"}}>e</span>
                  <span className="char35"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.346154em", transform: "rotate(99.9868deg)", transformOrigin: "center 5.92308em"}}>x</span>
                  <span className="char36"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(109.536deg)", transformOrigin: "center 5.92308em"}}>p</span>
                  <span className="char37"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(118.524deg)", transformOrigin: "center 5.92308em"}}>e</span>
                  <span className="char38"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(127.511deg)", transformOrigin: "center 5.92308em"}}>r</span>
                  <span className="char39"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.153846em", transform: "rotate(134.252deg)", transformOrigin: "center 5.92308em"}}>i</span>
                  <span className="char40"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(140.993deg)", transformOrigin: "center 5.92308em"}}>e</span>
                  <span className="char41"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.384615em", transform: "rotate(151.104deg)", transformOrigin: "center 5.92308em"}}>n</span>
                  <span className="char42"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.384615em", transform: "rotate(162.338deg)", transformOrigin: "center 5.92308em"}}>c</span>
                  <span className="char43"
                    style={{position: "absolute", left: "50%", marginLeft: "-0.307692em", transform: "rotate(172.449deg)", transformOrigin: "center 5.92308em"}}>e</span>
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
					<img src="/src/assets/img/icons/icon-1.svg" alt="icon-1"/>
					<span>Why Us</span>
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
								<img src="/src/assets/img/thumbs/Frame 106.jpg" alt="thumb-14"/>
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
								<img src="/src/assets/img/thumbs/Frame 107.jpg" alt="thumb-15"/>
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
								<img src="/src/assets/img/thumbs/Frame 108.jpg" alt="thumb-16"/>
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
		<img src="assets/img/shapes/shape-10.webp" alt="shape-10"/>
	</div>
	<div className="shape-11">
		<img src="assets/img/shapes/shape-11.webp" alt="shape-11"/>
	</div> --> */}
      </section>

      <section className="team-section">
  <div className="team-head">
    <h2>Meet Our Dedicated Team</h2>
    <p>
      Join a thriving community of researchers, innovators, and experts committed to advancing
      knowledge and creating meaningful impact.
    </p>
  </div>

  <h2>Managing Trustee</h2>
  <div className="team-container-3" style={{marginBottom: "80px"}}>
    <div className="team-card">
		<div className="p-2">
		<a href="#">
      <img src="/src/assets/img/thumbs/manage-trust-1.jpg" alt="Member 1" />
	  </a>
      <h4>Mr. Perumal Annamalai</h4>
      <p className="role">Former ISRO Director, India</p>
	  </div>
    </div>

    <div className="team-card">
		<div className="p-2">
		<a href="#">
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="280" fill="black" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>	  </a>
      <h4>Mrs. Mahima Kamal</h4>
      <p className="role">Human Health and Performance (HH&P) Directorate</p>
	  </div>
    </div>

    <div className="team-card">
		<div className="p-2">
		<a href="#">
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="280" fill="black" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>	  </a>
      <h4>Mrs. Sridevi Perumal</h4>
      <p className="role">Aerospace engineer</p>
	  </div>
    </div>
  </div>

  <h2>Science Review Committee</h2>
  <div className="team-container">
    <div className="team-card">
		<div className="p-2">
		<a href="#">
      <img src="/src/assets/team/team-1.webp" alt="Member 1" />
	  </a>
      <h4>Padmashri Dr. Annadurai Mylswamy</h4>
      <p className="role">Former ISRO Director, India</p>
	  </div>
    </div>

    <div className="team-card">
		<div className="p-2">
		<a href="#">
      <img src="/src/assets/team/team-2.webp" alt="Member 2" />
	  </a>
      <h4>Dr. Antony Jeevarajan</h4>
      <p className="role">Human Health and Performance (HH&P) Directorate</p>
	  </div>
    </div>

    <div className="team-card">
		<div className="p-2">
		<a href="#">
      <img src="/src/assets/team/team-3.webp" alt="Member 3" />
	  </a>
      <h4>Dr. Swati Mohan</h4>
      <p className="role">Aerospace engineer</p>
	  </div>
    </div>

    <div className="team-card">
		<div className="p-2">
		<a href="#">
      <img src="/src/assets/team/team-4.webp" alt="Member 4" />
	  </a>
      <h4>Prof. Sultan Ahmed Ismail</h4>
      <p className="role">Member, TN State Commission</p>
	  </div>
    </div>
    <div className="team-card">
		<div className="p-2">
		<a href="#">
      <img src="/src/assets/team/team-5.webp" alt="Member 4" />
	  </a>
      <h4>Prof. Na.Ganesan</h4>
      <p className="role">Director, NASA, USA</p>
	  </div>
    </div>
  </div>

  <h2>Advisors</h2>
  <div className="team-container-3">
    <div className="team-card">
		<div className="p-2">
		<a href="#">
      <img src="/src/assets/img/thumbs/advisor-1.jpg" alt="Member 1" />
	  </a>
      <h4>Dr. Padmanaban Mohanan</h4>
      <p className="role">Seoul Natl. Univ. Korea</p>
	  </div>
    </div>

    <div className="team-card">
		<div className="p-2">
		<a href="#">
      <img src="/src/assets/img/thumbs/advisor-2.jpg" alt="Member 2" />
	  </a>
      <h4>Prof.R.Kurinji Vendhan</h4>
      <p className="role">Director, Tamil University, India</p>
	  </div>
    </div>

    <div className="team-card">
		<div className="p-2">
		<a href="#">
      <img src="/src/assets/img/thumbs/advisor-3.jpg" alt="Member 3" />
	  </a>
      <h4>Dr.Thiruvengadam Arumugam</h4>
      <p className="role">MD Anderson R&D Lab, USA</p>
	  </div>
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
                          <a href='/econest/blog-details'><img alt="thumb-5" src="/src/assets/img/event-1.jpg" /></a>
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
                          <a href='/econest/blog-details'><img alt="thumb-6" src="/src/assets/img/event-2.jpg" /></a>
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
                          <a href='/econest/blog-details'><img alt="thumb-5" src="/src/assets/img/event-1.jpg" /></a>
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
                          <a href='/econest/blog-details'><img alt="thumb-6" src="/src/assets/img/event-2.jpg" /></a>
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
              <div className="thumb"><img alt="thumb" src="assets/img/thumbs/thumb-84.webp" /></div>
            </div>
            <div className="row row-gap-4 align-items-center">
              <div className="col-md-6 col-12">
                <div className="common-title text-start">
                  <h2>Get interesting <span><img alt="icon" src="assets/img/icons/icon-12.svg" /></span> news
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
        {/* <!-- <div className="shape"><img alt="shape" src="assets/img/shapes/shape-38.webp" /></div> --> */}
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
export default Aboutus;