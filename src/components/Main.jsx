import React from 'react';
import Banner from './Banner.jsx';
import Projects from './Projects.jsx';
import About from './About.jsx';
import BenefitsList from './BenefitsList.jsx';

function Main() {
  return (
    <>
        <Banner />
        <About />
        <Projects />
        <BenefitsList />
    </>
  );
}

export default Main;