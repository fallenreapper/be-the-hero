<template>
  <div class="profile-container">
    <header>
      <img :src="require('@/assets/logo.svg')" alt="Be The Hero" />
      <span> Bem vinda, {{ ongName }}</span>

      <a class="button" @click="$router.push('/incidents/new')">
        Cadastrar novo caso
      </a>
      <button type="button" @click="handleLogout">logout</button>
    </header>

    <h1>Casos Cadastrados </h1>
    <ul>
      <li v-for="x in incidents" :key="x.id">
        <strong>CASO: </strong>
        <p> {{x.title}} </p>
        
        <strong> DESCRIÇÃO: </strong>
        <p> {{x.description}}</p>

        <strong> VALOR: </strong>
        <p>{{ Intl.NumberFormat('pt-BR', { style : 'currency', currency : 'BRL' }).format( x.value ) }}</p>
        <button type="button" @click="handleDeleteIncident( x.id )">
            lixo
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  import api from "../services/api";
  export default {
    data(){
      return {
        incidents : [],
        ongName : "",
      }
    },
    async created(){
      this.ongName = localStorage.getItem("ongName");
      this.ongId = localStorage.getItem("ongId");

      const response = await api.get('profile',{
          headers: {
              Authorization : this.ongId,
          }
      });
      this.incidents = response.data;
      console.log(this.incidents);
    },
    methods : {
      async handleDeleteIncident(id){
        try{
          await api.delete(`incidents/${ id }`,{
            headers: {
              Authorization : this.ongId,
            }
          })
          this.incidents = this.incidents.filter(x=> x.id !== id );
        }catch(err){
          console.log(err);
          alert("erro ao deletar caso tente novamente ");
        }
      },
      async handleLogout(){
        localStorage.clear();
        this.$router.push('/');
      }
    },
  }
</script>

<style scoped>
  .profile-container{
    width: 100%;
    max-width: 1180px;
    padding: 0 30px;
    margin: 32px auto;
  }

  .profile-container header{
    display: flex;
    align-items: center;
  }

  .profile-container header span{
    font-size: 20px;
    margin-left: 24px;
  }

  .profile-container header img{
    height: 64px;
  }

  .profile-container header a{
    width: 260px;
    margin-left: auto;
    margin-top: 0;
  }

  .profile-container header button{
    height: 60px;
    width: 60px;
    border-radius: 4px;
    border: 1px solid #dcdce6;
    background: transparent;
    transition: border-color .2s;
    margin-left: 16px;
  }

  .profile-container header button:hover{
    border-color: #999;
  }

  .profile-container h1{
    margin-top :80px;
    margin-bottom: 24px;
  }

  .profile-container ul{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-gap: 24px;
    list-style: none;  
  }

  .profile-container ul li{
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    position: relative;
  }

  .profile-container ul li button{
    position: absolute;
    top: 24px;
    right: 24px;
    border: 0 ;
    background: transparent;
  }

  .profile-container ul li button:hover{
    opacity: .8;
  }

  .profile-container ul li strong{
    display: block;
    margin-bottom:16px;
    color: #41414d;
  }

  .profile-container ul li p + strong{
    margin-top: 32px;
  }

  .profile-container ul li p{
    color: #737380;
    line-height: 21px;
    font-size: 16px;
  }
</style>