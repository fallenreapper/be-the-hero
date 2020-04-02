<template>
  <div class="logon-container">
      <section class="form">
          <img :src="require('@/assets/logo.svg')" alt="Be The Hero" />
          <form >  
              <h1>Faça  seu Logon</h1>

              <input placeholder="Sua ID" v-model="id" />
              <button class="button" @click="handleLogon">Entrar</button>
              
              <a class="back-link" @click="$router.push('/register')">
                  Não tenho Cadastro
              </a>
          </form>
      </section>
      <img :src="require(`@/assets/heroes.png`)" alt="Heroes" />
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data(){
    return {
      id : "",
    }
  },
  methods :{
    async handleLogon(){
      try{
        console.log(this.id);
        console.log(api);
        const response = await api.post('sessions',{ id : this.id, });
        console.log(response.data.name);

        localStorage.setItem('ongId', this.id);
        localStorage.setItem('ongName', response.data.name);

        this.$router.push("/profile")
      }catch(err){
        console.log(err);
        alert("falha no login");
      }
    },
  }
}
</script>

<style scoped>
  .logon-container{
      width: 100%;
      max-width: 1120px;
      height: 100vh;
      margin:  0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
  }

  .logon-container section.form{
      width: 100%;
      max-width: 350px;
      margin-right: 30px;
  }

  .logon-container section.form form {
      margin-top:100px;
  }

  .logon-container section.form form h1{
      font-size: 32px;
      margin-bottom: 32px;
  }
</style>