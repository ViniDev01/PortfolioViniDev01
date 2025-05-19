import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import Whatsapp from '../assets/whatsapp-hover.png'

function FooterAboutPage() {
    return (
        <div className="footer-contato">
            <h2>contato</h2>

            <div className="icons">
                <div className="icon">
                    <a href="https://mail.google.com/mail/?view=cm&to=contato.viniciosss@gmail.com&su=Assunto do e-mail&body=Olá, quero falar com você sobre:" target='_blank' className='hi-desktop'>
                        <div className='box-icon'><Mail /></div>
                        <span>E-mail</span>
                        <span>contato.viniciosss@gmail.com</span>
                    </a>
                    <a href="mailto:contato.viniciosss@email.com?subject=Assunto do e-mail&body=Olá, quero falar com você sobre:" target='_blank' className='hi-mobile'>
                        <div className='box-icon'><Mail /></div>
                        <span>E-mail</span>
                        <span>contato.viniciosss@gmail.com</span>
                    </a>
                </div>
                <div className="icon">
                    <a href="https://www.linkedin.com/in/vinidev01/" target='_blank'>
                        <div className='box-icon'><Linkedin /></div>
                        <span>Linkedin</span>
                        <span>@vinicios</span>
                    </a>
                </div>
                <div className="icon">
                    <a href="https://github.com/ViniDev01" target='_blank'>
                        <div className='box-icon'><Github /></div>
                        <span>Github</span>
                        <span>@ViniDev01</span>
                    </a>
                </div>
                <div className="icon">
                    <a href="https://wa.me/5511945567985?text=Olá,%20gostaria%20de%20mais%20informações." target='_blank'>
                        <div className='box-icon'><img src={Whatsapp} alt='Whatsapp' /></div>
                        <span>Whatsapp</span>
                        <span>11 945567985</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default FooterAboutPage;