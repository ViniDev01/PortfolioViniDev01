// src/pages/About.jsx
import React from 'react';
import Header from '../components/Header';
import BannerAbout from '../components/BannerAboutPage';
import AboutTextPage from '../components/AboutTextPage';
import FooterAboutPage from '../components/FooterAboutPage';



function AboutPage() {
    return (
        <div className='about-page'>
            <Header />
            <BannerAbout />
            <AboutTextPage />
            <FooterAboutPage />
            
        </div>
    )
}

export default AboutPage;