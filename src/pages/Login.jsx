import React, { useEffect } from 'react';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase"; 
import { useUser } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';


import '../css/Login.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user } = useUser(); // Hook para obter o usuário atual e o estado de carregamento
    const navigate = useNavigate(); // Hook para navegação entre páginas

    useEffect(() => {
        if (user) {
            navigate('/admin'); // Redireciona para a página de projetos se o usuário já estiver logado
        }
    }, [user, navigate]); // Adiciona 'navigate' como dependência para evitar warnings

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Limpa mensagens de erro anteriores
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/create-project'); // Redireciona para a página de projetos após o login
        } catch (error) {
            setError('Erro ao fazer login. Verifique suas credenciais.');
            console.error("Erro no login:", error);
        }
    }
    return (
        <div className="login-container">
            
            <form onSubmit={handleLogin}>
                <h1>Login Portfolio</h1>
                <label>
                Seu email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <br />
                <label>
                Sua senha:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Login</button>
                {error && <p className="erro">{error}</p>}
            </form>
        </div>
    );
}

export default Login;