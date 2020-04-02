<template>
  <div class="new-incident-container">
      <div class="content">
          <section>
              <img :src="require('@/assets/logo.svg')" alt="Be The Hero" />

              <h1>Cadastro de novo caso</h1>
              <p>Descreva o caso detalhadamente  para encontrar  um heroi para resolver isso.</p>
              
              <a @click="$router.push('/register')" >Voltar para Home</a>
          </section>
          <form>
              <input v-model="title" placeholder="Titulo do caso" />
              <textarea v-model="description" placeholder="Descrição" />
              <input v-model="value" placeholder="Valor em reais" />

              <button class="button" type="button" @click="handleNewIncident">cadastrar</button>
          </form>
      </div>
  </div>
</template>

<script>
  import api from '../services/api';
  export default {
    data(){
      return{
        title : "",
        description : "",
        value : "",
      }
    },
    methods : {
      async handleNewIncident(){
          try{
            await api.post('incidents', this.$data , {
              headers: {
                authorizarion : localStorage.getItem("ongId"),
              }
            });
            this.$router.push("/profile")
          }catch(err){
            console.log( err );
          }
      }
    }
  }
</script>

<style scoped>
  .new-incident-container{
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin:  0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .new-incident-container .content{
    width: 100%;
    padding: 96px;
    background: #f0f0f5;
    box-shadow: 0 0 100px rgba(0,0,0,.1);
    border-radius: 8px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .new-incident-container .content section{
    width: 100%;
    max-width: 380px;
  }

  .new-incident-container .content section h1{
    margin: 64px 0 32px;
    font-size: 32px;
  }

  .new-incident-container .content section p{
    font-size: 18px;
    color: #727280;
    line-height:32px ;
  }


  .new-incident-container  form{
    width: 100%;
    max-width: 450px;
  }

  .new-incident-container  form input,
  .new-incident-container  form textarea{
    margin-top: 8px;
  }
</style>