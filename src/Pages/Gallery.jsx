import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from './Headers';
import Footer from './Footer';
import { mediaListAPI } from '../Hoc/api';



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



  // gallery data and grouping
  const [galleryItems, setGalleryItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('ALL');

  useEffect(() => {
    let mounted = true;
    async function fetchGallery() {
      try {
        const res = await mediaListAPI({ postType: 'GALLERY' });
        const payload = res && res.data ? (Array.isArray(res.data) ? res.data : (res.data.data || res.data.items || [])) : (Array.isArray(res) ? res : []);
        if (!mounted) return;
        const items = payload || [];

        // group by parent title (fallback to 'Uncategorized') and dedupe by key/id/url
        const map = {};
        items.forEach(it => {
          const parentTitle = it.parentTitle || (it.parent && (it.parent.title || it.parent)) || 'Uncategorized';
          const key = String(parentTitle).trim() || 'Uncategorized';
          if (!map[key]) map[key] = { title: parentTitle, items: [], seen: new Set() };
          const uniqueId = it.key || it.id || it.url || it.filename || JSON.stringify(it);
          if (!map[key].seen.has(uniqueId)) {
            map[key].seen.add(uniqueId);
            map[key].items.push(it);
          }
        });

        const groupsArr = Object.keys(map).map(k => ({ key: k.replace(/\s+/g, '_').toLowerCase(), title: map[k].title, items: map[k].items }));
        if (mounted) {
          setGalleryItems(items);
          setGroups(groupsArr);
          if (groupsArr.length > 0) setSelectedGroup('ALL');
        }
      } catch (err) {
        console.error('Failed to load gallery items', err);
      }
    }
    fetchGallery();
    return () => { mounted = false; };
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
        {/* Tabs for categories (generated from media parent titles) */}
        <div className="tabs">
          <button className={selectedGroup === 'ALL' ? 'active' : ''} onClick={() => setSelectedGroup('ALL')}>ALL</button>
          {groups.map(g => (
            <button key={g.key} className={selectedGroup === g.key ? 'active' : ''} onClick={() => setSelectedGroup(g.key)}>{g.title}</button>
          ))}
        </div>

        {/* Image gallery (grouped) */}
        <div className="gallery">
          {selectedGroup === 'ALL' ? (
            groups.map(g => (
              <div className={`category-${g.key}`} key={g.key}>
                {g.items.map((it, i) => {
                  const src = it.url || (it.key ? (process.env.REACT_APP_MEDIA_BASE_URL ? `${process.env.REACT_APP_MEDIA_BASE_URL.replace(/\/$/, '')}/${String(it.key).replace(/^\//, '')}` : it.key) : (it.thumbnail || it.filename || '/src/assets/img/thumbs/thumb-32.webp'));
                  const title = it.title || it.filename || g.title || 'Gallery Image';
                  return (
                    <a key={it.id || i} href={src} data-fslightbox={g.key} data-title={title}>
                      <img src={src} alt={title} />
                    </a>
                  );
                })}
              </div>
            ))
          ) : (
            (() => {
              const g = groups.find(x => x.key === selectedGroup);
              if (!g) return <div>No items for this category.</div>;
              return (
                <div className={`category-${g.key}`}>
                  {g.items.map((it, i) => {
                    const src = it.url || (it.key ? (process.env.REACT_APP_MEDIA_BASE_URL ? `${process.env.REACT_APP_MEDIA_BASE_URL.replace(/\/$/, '')}/${String(it.key).replace(/^\//, '')}` : it.key) : (it.thumbnail || it.filename || '/src/assets/img/thumbs/thumb-32.webp'));
                    const title = it.title || it.filename || g.title || 'Gallery Image';
                    return (
                      <a key={it.id || i} href={src} data-fslightbox={g.key} data-title={title}>
                        <img src={src} alt={title} />
                      </a>
                    );
                  })}
                </div>
              );
            })()
          )}
        </div>
      </section>

    <Footer />

    </div>
  );
}
export default Gallery;