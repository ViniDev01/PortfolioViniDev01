import React from 'react';
import { useState } from "react";
import emailjs from '@emailjs/browser';
import Footer from "../components/Footer";
import Header from "../components/Header";

function Contact() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    async function sendEmail(e) {
        e.preventDefault();

        if(!name || !email || !message) {
            alert('Por favor, preencha todos os campos')
            return;
        }

            try {
                console.log('Enviando dados para EmailJS...');
                const response = await emailjs.send(
                    'service_ox1bhje',
                    'template_43pxg1i',
                    {
                        from_name: name,
                        from_email: email,
                        message: message,
                    },
                    {
                        publicKey: 'WpzITMFsMIiGtWwLg'
                    }
                );
                console.log('Sucesso! Resposta:', response);
                alert('Mensagem enviada com sucesso!');
                
                // Limpa o formulário
                setName('');
                setEmail('');
                setMessage('');
                
            }catch (err) {
                console.error('Erro detalhado:', {
                message: err.message,
                status: err.status,
                text: err.text,
                stack: err.stack
            });
                alert('Erro ao enviar mensagem: ' + err.text);
            }
        
    }

    return (
        <>
            <Header />
            <section className="contact-section">
                <div className="contact-text">
                    <h2>Vamos conversar?</h2>
                    <p>Tem um projeto em mente ou só quer trocar uma ideia? Preencha o formulário e vamos falar sobre desenvolvimento front-end!</p>
                </div>

                <form className="contact-form" onSubmit={sendEmail}>
                    <input 
                    type="text" 
                    placeholder="Seu nome" 
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
                    />
                    <input 
                    type="email" 
                    placeholder="Seu e-mail" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    />
                    <textarea 
                    placeholder="Sua mensagem" 
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    ></textarea>
                    <button type="submit">Enviar mensagem</button>
                </form>
            </section>

            <Footer />
        </>

    )
}

export default Contact;