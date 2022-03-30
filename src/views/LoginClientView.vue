<template>
    <div>
        <form action="">
            <h1>Page de connexion</h1>

            <h4>Veuillez vous connecter à votre compte Client s'il vous plaît</h4>


            <div id="container">
                 
                <label for="login">Identifiant : </label>
                <input type="text" v-model="login" required>
                      
            
                <label for="password">Mot de passe : </label>
                <input type="password" v-model="password" required>

            
            </div>
            <div class="content">
                <input  type="button" value="Se connecter" @click="sendData">
            </div>

            <p>Vous ne possèdez pas de compte ?</p>
            <router-link to="/signup-client">Inscrivez-vous</router-link>



            
        </form>
    </div>    
</template>


<script>

import { mapState } from 'vuex'


export default {
    name : 'Login-log',
    data(){
        return{
            login : "",
            password : ""
        }
    },
    computed : {
       ...mapState(['isSociety', 'user']),
        Society(){
            return this.$store.getters.getIsSociety;
        }
    },
    methods : {
        sendData(){
            let identifiants = { email : this.login, password : this.password}
            //const bcrypt = require('bcrypt');
            //bcrypt.hash(this.password, 10, function(err, hash) {
                //if(err){  console.log(err); }
                //identifiants.password = hash
            //});
            fetch('http://localhost:8000/api/auth/login/client',{
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                method: 'POST',
                body: JSON.stringify( identifiants )
            })
            .then(data => data.json())
            .then(res => {
                if(res.status == 401){
                    alert("Mauvais email ou mauvais mot de passe");
                    return;
                }
                if(res.status == 500){
                    alert("Une erreur s'est produite")
                    return;
                }
                this.$store.commit("CHANGE_TOKEN", res.token);
                this.$store.commit("CHANGE_USERID", res.userId)
                console.log(this.$store.getters.getUser);
                if(this.$store.getters.getUserToken != null){
                    this.$router.push({ name : 'myaccount'});
                }
            }); 
        }
    }
}

</script>




<style scoped>

form a{
    color : white;
}

form{
    background-color: darkblue;
    color : whitesmoke;
    border-radius: 30px;
    width : auto;
    margin-left: 15%;
    margin-right: 15%;
    text-align: center;
    margin-top: 30px;
    padding-bottom: 50px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

form div{
    margin: 10%;
}



form input[type=text], form input[type=password]{
    border-radius: 10px;
    padding: 5px;
}


form input[type=text]:hover{
    background-color: lightblue;
    cursor: pointer;
}


h1{
    padding: 10px;
}

#container{
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto ;
    row-gap: 20px;
}


.content{
    margin-left: 60%;
    align-content: center;
    position: relative;
    width: 180px;
    height: 55px;
    background-color: #090221;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    overflow: hidden;
}


.content::before, .content::after{
    content: "";
    position: absolute;
    top: -130%;
    width: 100px;
    height: 100px;
    background-color: #005AFE;
    transform-origin: right bottom;
    transition: .5s;
}



.content::before{
    left: -5%;
}

.content::after{
    right:-5%;
    transform-origin: left bottom;
}


.content:hover::before{
    transform: rotate(-90deg);
}

.content:hover::after{
    transform: rotate(90deg);
}


.content input{
    position: relative;
    z-index: 1;
    width: 172px;
    height: 47px;
    border-radius: 30px;
    outline: none;
    border: none;
    background-color: #090221;
    color: #fff;
    cursor: pointer;
    font-size: 15px;
    font-family: 'Atlata', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
}



</style>