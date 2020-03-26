import React, { useState } from 'react';
import { Link , useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident(){
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState();
    const [ value, setValue ] = useState();

    const history = useHistory();
    const ongId = localStorage.getItem("ongId");
    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title
            ,description
            ,value
        }

        try{
            await api.post('incidents',data , {
                headers: {
                    authorizarion : ongId,
                }
            });
            history.push("/profile");
        }catch(err){
            console.log( err );
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
    
                    <h1>Cadastro de novo caso</h1>
                    <p>Descreva o caso detalhadamente  para encontrar  um heroi para resolver isso.</p>
                                        
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input value={title} onChange={ e => setTitle(e.target.value) } placeholder="Titulo do caso" />
                    <textarea value={description} onChange={ e => setDescription(e.target.value) } placeholder="Descrição" />
                    <input value={value} onChange={ e => setValue(e.target.value) } placeholder="Valor em reais" />

                    <button className="button" type="submit ">cadastrar</button>
                </form>
            </div>
        </div>);
}