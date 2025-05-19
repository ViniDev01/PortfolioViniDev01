import React from 'react';
import { Link } from "react-router-dom";
//import MinhaFoto from "../assets/minhafoto.png";
import avatar from "../assets/avatar1.avif";

function About() {
    return (
        <div className="about">
            <div className="about-left">
                <h2>Que tal me conhecer melhor?</h2>

                <p>
                    Desenvolvedor Front-end especializado em criar experiências digitais rápidas, escaláveis 
                    e com foco em performance, acessibilidade e design responsivo.
                </p>

                <Link to="/sobre" className="btn-about btn">Saiba mais </Link>
            </div>

            <div className="about-right">
                <div className='image-container'>
                    <picture>
                        <source srcSet={avatar} type="image/avif" />
                        <source srcSet="/assets/avatar1.webp" type="image/webp" /> 
                        <img src="/assets/avatar1.jpg" alt="Vinicios" /> 
                    </picture>
                </div>
                
            </div>
        </div>
    )
}

export default About;