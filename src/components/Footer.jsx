import React, { useEffect, useState } from 'react';
import { Instagram, Linkedin, Github } from 'lucide-react';
function Footer() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])
    
    return (
        <footer>
            <div className="footer-content">
                <h2>Entre em contato conosco</h2>

                {!isMobile ? (
                    <a href="https://mail.google.com/mail/?view=cm&to=contato.viniciosss@gmail.com&su=Assunto do e-mail&body=Olá, quero falar com você sobre:" target="_blank" >
                        contato.viniciosss@gmail.com
                    </a>
                ) : (
                    <a href="mailto:contato.viniciosss@email.com?subject=Assunto do e-mail&body=Olá, quero falar com você sobre:" target="_blank">
                        contato.viniciosss@gmail.com
                    </a>
                )}
                
                

                <div className="socials">
                    <div className="logo">
                        <h1>SVinicios</h1>
                    </div>

                    <div className="container-socials">
                        <div className="socials-icons">
                            <a href='https://www.instagram.com/viniidev01/' target='_blank'><Instagram /></a>
                            <a href='https://github.com/ViniDev01' target='_blank'><Github /></a>
                            <a href="https://www.linkedin.com/in/vinidev01/" target='_blank'><Linkedin /></a>
                            <a href="https://wa.me/5511945567985?text=Olá,%20gostaria%20de%20mais%20informações." target='_blank'><div className='icon-whatsapp'></div></a>
                        </div>
                    </div>
                </div>
                <p>&copy; 2023 SVinicios. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer;