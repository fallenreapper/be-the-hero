import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';


export default function Profile(){
    const history = useHistory();
    const { ongName , ongId } = localStorage;
    const [ incidents, setIncidents ] = useState([]);
    useEffect(()=> {
        api.get('profile',{
            headers: {
                Authorization : ongId,
            }
        }).then( (response)=>{
            setIncidents(response.data);
            console.log(incidents);
        });
    },[ ongId ]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${ id }`,{
                headers: {
                    Authorization : ongId,
                }
            })
            setIncidents(incidents.filter(x=> x.id !== id ));
        }catch(err){
            console.log(err);
            alert("erro ao deletar caso tente novamente ");
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg}  alt="Be The Hero" />
                <span> Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new" >Cadastrar Novonovo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1> Casos Cadastrados </h1>

            <ul>
                {incidents.map( x => ( 
                    <li key={ x.id }>
                        <strong>CASO: </strong>
                        <p> {x.title} </p>
                        
                        <strong> DESCRIÇÃO: </strong>
                        <p> {x.description}</p>

                        <strong> VALOR: </strong>
                        <p>{ Intl.NumberFormat('pt-BR', { style : 'currency', currency : 'BRL' }).format(x.value) }</p>
                        <button type="button" onClick={ ()=> handleDeleteIncident( x.id ) }>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}