
import React, { useEffect, useState } from 'react';
import { ScrollText, Check } from 'lucide-react';

function BenefitsList() {

    const [mobile, setMobile] = useState(false);
    const [showAllBenefists, setShowAllBenefists] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth < 768);
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const allBenefists = [
        {
            title: "Design Responsivo",
            description: "Seu site funcionará perfeitamente em <strong>computadores, tablets e celulares</strong>."
        },
        {
            title: "Interface Moderna e Intuitiva",
            description: "<strong>Layouts limpos</strong>, agradáveis e fáceis de navegar, seguindo as últimas tendências de <strong>UI/UX</strong>."
        },
        {
            title: "Performance Otimizada",
            description: "Carregamento rápido com boas práticas de desempenho e <strong>SEO básico</strong>."
        },
        {
            title: "Código Limpo e Escalável",
            description: "Escrito com boas práticas, facilitando manutenção e futuras melhorias."
        },
        {
            title: "Integração com APIs",
            description: "Seu projeto pode se comunicar com <strong>bancos de dados</strong>, <strong>serviços externos</strong>, ou <strong>sistemas personalizados</strong>."
        },
        {
            title: "Funcionalidades Interativas",
            description: "Animações, sliders, menus dinâmicos, formulários funcionais e muito mais com <strong>JavaScript</strong> e <strong>React</strong>."
        },
        {
            title: "Documentação e Suporte Inicial",
            description: "Entrega com instruções básicas de uso e suporte para os primeiros ajustes."
        }
    ];

    const visibleBenefits = mobile && !showAllBenefists ? allBenefists.slice(0, 4) : allBenefists;


    return (
        <div className="benefits-list">
            <h2>Benefícios do Projeto <ScrollText /></h2>
            
            <ul>     
                {visibleBenefits.map((benefit, index) => (
                    <li key={index} className="benefits-list__item">
                        <h3>
                            <Check />
                            {benefit.title}
                        </h3>

                        <p dangerouslySetInnerHTML={{ __html:benefit.description}} />
                    </li>
                ))}       
            </ul>

            {mobile && (
                <>
                    {!showAllBenefists ? (
                        <button onClick={() => setShowAllBenefists(true)} className='btn' style={{border: 'none'}}>mostrar mais</button>
                    ) : (
                        <button onClick={() => setShowAllBenefists(false)} className='btn' style={{border: 'none'}}>Mostrar menos</button>
                    )}
                </>
            )}
            
        </div>
    )
}

export default BenefitsList;