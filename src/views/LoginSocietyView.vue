<template>
    <div>
        <form action="">
            <h1>Page de connexion</h1>

            <h2>Espace Professionnel</h2>

            <h5>Vous êtes une agence de location ? Vous êtes au bon endroit</h5>

            <h4>Veuillez vous connecter s'il vous plaît</h4>

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
            <router-link to="/signup-society">Inscrivez-vous</router-link>



            
        </form>
    </div>    
</template>


<script>



export default {
    name : 'LoginSocietyView',
    data(){
        return{
            login : "",
            password : ""
        }
    },
    methods : {
        sendData(){
            let identifiants = { email : this.login, password : this.password}
            fetch('http://localhost:8000/api/auth/login/society',{
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
                this.$store.commit("CHANGE_USERID", res.userId);
                if(this.$store.getters.getUserToken != null){
                    this.$store.commit("CHANGE_SOCIETY", true);
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
    width : 600px;
    margin-left: auto;
    margin-right: auto;
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