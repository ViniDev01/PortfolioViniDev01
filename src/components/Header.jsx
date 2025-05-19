import React from 'react';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, UserSearch, House, ScrollText, Contact, X } from "lucide-react";

function Header() {

    const [isOpen, setIsOpen] = useState(false);
        const toggleMenu = () => {
            setIsOpen(!isOpen);
        };
        
        const closeMenu = () => {
            setIsOpen(false);
        };

    return (

        <>
            <header className="header">
                <div className="logo">
                    <h1>SVinicios</h1>
                </div>
                <nav className="nav-Desktop">
                    <ul>
                        <li><NavLink to={`/`}>Início</NavLink></li>
                        <li><NavLink to="/sobre">Sobre</NavLink></li>
                        <li><NavLink to="/projects">Projetos</NavLink></li>
                        <li><NavLink to="/contact" className="contato">Contato</NavLink></li>
                    </ul>
                </nav>

                <nav className="nav-Mobile">
                    
                        <Menu className="icon-menu" onClick={toggleMenu} />
                        
                    
                    
                    <ul style={{ left: isOpen ? "0" : "768px" }}>
                        
                        <X className="icon-close" onClick={closeMenu} />
                        
                        <li><NavLink to={`/`}><House /> Início</NavLink></li>
                        <li><NavLink to="/sobre"><UserSearch />Sobre</NavLink></li>
                        <li><NavLink to="/projects"><ScrollText /> Projetos</NavLink></li>
                        <li><NavLink to="/contact" className="contato"><Contact /> Contato</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;