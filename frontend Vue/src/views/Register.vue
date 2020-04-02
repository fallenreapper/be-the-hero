<template>
  <div class="register-container">
    <div class="content">
      <section>
        <img :src="require('@/assets/logo.svg')" alt="Be The Hero" />
        <h1>Cadastro</h1>
        <p>Faça o cadastro, entre na plataforma e ajude pessoas a encontrarem os casos  da sua ONG.</p>
        <a class="back-link" @click="$router.push('/')">
          Já Tenho Cadastro
        </a>
      </section>
      <form >
        <input v-model="name" placeholder="Nomae da ONG" />
        <input v-model="email" type="email" placeholder="E-mail" />
        <input v-model="whatsapp" placeholder="Whatsapp" />
        <div class="input-group">
          <input v-model="city" placeholder="Cidade" />
          <input v-model="uf" placeholder="UF" :style="{ width : 80 }" />
        </div>
        <button class="button" type="button" @click="handleRegister">cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../services/api';
export default {
  data(){
    return {
      name : "",
      email : "",
      whatsapp : "",
      city : "",
      uf : "",
    }
  },
  methods : {
    async handleRegister(){
      try{
        const  response = await api.post('ongs',this.$data);
        console.log( `Seu ID de acesso: ${ response.data.id }`);
        this.$router.push("/");
      }catch(err){
        console.log( err );
      }
    }
  }
}
</script>

<style scoped>
  .register-container{
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin:  0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .register-container .content{
    width: 100%;
    padding: 96px;
    background: #f0f0f5;
    box-shadow: 0 0 100px rgba(0,0,0,.1);
    border-radius: 8px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .register-container .content section{
    width: 100%;
    max-width: 380px;
  }

  .register-container .content section h1{
    margin: 64px 0 32px;
    font-size: 32px;
  }

  .register-container .content section p{
    font-size: 18px;
    color: #727280;
    line-height:32px ;
  }


  .register-container  form{
    width: 100%;
    max-width: 450px;
  }

  .register-container  form input{
    margin-top: 8px;
  }

  .register-container  form .input-group{
    display: flex;
  }

  .register-container  form .input-group input + input{
    margin-left: 8px;
  }
</style>