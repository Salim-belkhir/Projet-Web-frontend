<template>
    <div id="page">
        <h1>Inscription</h1>

        <h4>Veuillez renseigner s'il vous plaît les informations suivantes pour vous inscrire</h4>
        <h4>et pouvoir proposer vos voitures à la location</h4>
        
        <form action="">
            <div class="container">


                <div v-if="!showNext">

                    <div>
                        <label for="name">Email : </label>
                        <input type="text" placeholder="nom@mail.com" required v-model="mail">
                    </div>

                    <div>
                        <label for="password"> Mot de passe : </label>
                        <input type="password" required v-model="password">
                    </div>

                    <div>
                        <input id="next" type="submit" value="Suivant" @click="Next">
                    </div>

                </div>





                <div v-if="showNext">
                    <div>
                        <label for="fname">Nom de l'agence de location : </label>
                        <input type="text" placeholder="Dupont" required v-model="nom">
                        </div>

                        <div>
                            <label for="name">N° de téléphone : </label>
                            <input type="text" placeholder="+33 6 77 88 99 00" minlength="10" maxlength="10" required v-model="numero">
                        </div>

                        <div>
                            <label for="name">Rue : </label>
                            <input type="text" placeholder="5 Rue de l'aiguillerie" required v-model="rue">
                        </div>


                        <div>
                            <label for="name">Ville : </label>
                            <input type="text" placeholder="Montpellier" required v-model="ville">
                        </div>


                        <div>
                            <label for="name">Code Postal : </label>
                            <input type="text" placeholder="34000" required maxlength="5" v-model="code">
                        </div>


                        <div class="content">
                            <input type="submit" value="S'incrire" @click="OnPush">
                        </div>


                    </div>
            
                    

                </div>


                
            
            

        </form>
    </div>
</template>



<script>


export default {
    name: 'InscriptionView',
    data(){
        return{
            nom : "",
            password : "",
            mail : "",
            numero : "",
            rue: "",
            ville: "",
            code : null,
            showNext : false
        }
    },
    methods : {
        OnPush(){
            let entreprise = { 
                nom: this.nom , 
                password: this.password,  
                mail: this.mail, 
                numero: this.numero,
                rue: this.rue,
                ville: this.ville,
                code: this.code
            }
            fetch('http://localhost:8000/api/auth/signup/society',{
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                    },
                method: 'POST',
                body: JSON.stringify(entreprise)
            })
            .then(data => data.json())
            .then( res => console.log(res.body))
            this.$router.push({ name : 'login-society'});
        },
        Next(){
            if(this.mail == "" || this.password == ""){
                return;
            }
            this.showNext = true;
        }
    }
}
</script>



<style scoped>

form{
    padding-top: 20px;
}


#page{
    padding-top: 30px;
    background-color: darkblue;
    color : whitesmoke;
    border-radius: 30px;
    width : auto;
    margin-right: 10%;
    margin-left: 10%;
    text-align: center;
    margin-top: 30px;
    padding-bottom: 50px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}


form div div{
    margin: 20px;
}



form input[type=text], form input[type=password], #next{
    border-radius: 10px;
    padding: 5px;
}


form input[type=text]:hover, form input[type=password]:hover, #next:hover{
    background-color: lightblue;
    cursor: pointer;
}




#container{
    /*
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto auto auto auto auto auto;
    row-gap: 20px;
    */
    text-align: left;   
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