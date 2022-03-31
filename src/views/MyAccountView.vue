<template>
    <div v-if="$store.getters.getUserId!=null && $store.getters.getUserToken!=null">
        <h1>Mon Compte</h1>

        <div>
            <h2>Mes informations</h2>

            

            <div id="informations">

                <p>Vous pouvez modifier directement vos informations, et les valider en cliquant sur "Modifier mes informations"</p>

                <div>
                    <label for="name">Email : </label>
                    <input type="text"  v-model="mail">
                </div>

                <div>
                    <label for="password">Mot de passe : </label>
                    <input type="password" name="mdp" id="mdp" v-model="password">
                </div>

                <div v-if="!$store.getters.getSociety">
                    <label for="fname">Nom : </label>
                    <input type="text"  v-model="nom">
                </div>

                <div v-if="$store.getters.getSociety">
                    <label for="Name">Nom de l'agence : </label>
                    <input type="text" v-model="nom">
                </div>
            
                <div v-if="!$store.getters.getSociety">
                    <label for="name">Prénom : </label>
                    <input type="text" v-model="prenom">
                </div>

                <div>
                    <label for="name">N° de téléphone : </label>
                    <input type="text" v-model="numero">
                </div>

                <div>
                    <label for="name">Rue : </label>
                    <input type="text"  required v-model="rue">
                </div>


                <div>
                    <label for="name">Ville : </label>
                    <input type="text"  required v-model="ville">
                </div>


                <div>
                    <label for="name">Code Postal : </label>
                    <input type="text"  required v-model="code">
                </div>

                <div>
                    <button class="modif" @click="Change">Modifiez mes informations</button>
                    <input v-if="showPassword"  type="text" v-model="password">
                </div>
            </div>
        </div>
        
        
        <div v-if="$store.getters.getSociety">
            <h2>Mes voitures</h2>

            <button class="ajout" @click="AjoutVoiture">Ajouter une voiture</button>

            <table id="table1">
                <tr>
                    <th>Marque</th>
                    <th>Modèle</th>
                    <th>Localisation</th>
                    <th>Prix journalier</th>
                    <th></th>
                    <th></th>
                </tr>
                <tr v-for="car in cars" :key="car.id">
                    <td> {{car.marque}}</td>
                    <td> {{car.modele}} </td>
                    <td> {{car.localisation}} </td>
                    <td> {{car.PrixJournalier}} </td>
                    <td><button class="maj" @click="Update(car)">Mettre à jour</button></td>
                    <td><button class="delete" @click="SupprimerVoiture(car)">Supprimer</button></td>
                </tr>
            </table>


        </div>



        <div>
            <h2>Mes réservations</h2>

            <button class="ajout" @click="Reservations">Voir les reservations</button>

            <table v-if="showRes">
                <tr>
                    <th>idReservation</th>
                    <th v-if="$store.getters.getSociety">idClient</th>
                    <th v-else>idVoiture</th>
                    <th>Date de Début</th>
                    <th>Date de Fin</th>
                    <th>Prix Total</th>
                    <th></th>
                </tr>
                <tr v-for="res in reservations" :key="res.id">
                    <td> {{res.id}}</td>
                    <td v-if="$store.getters.getSociety"> {{ res.idClient }} </td>
                    <td v-else> {{ res.idVoiture }} </td>
                    <td> {{ res.dateDeb }} </td>
                    <td> {{ res.dateFin}} </td>
                    <td> {{ res.prixTotal }} </td>
                    <td><button class="delete" @click="DeleteReservation(res.id)">Supprimer</button></td>
                </tr>
            </table>
        </div>

    </div>

    <div v-else>
        <h1>Vous n'avez pas les droits pour accéder à cette page</h1>
    </div>

    
</template>


<script>

export default {
    name: 'AccountView',
    data(){
        return{
            nom : "",
            password : "",
            prenom: "",
            mail : "",
            numero : "",
            rue: "",
            ville: "",
            code : null,
            cars : [],
            reservations : [],
            showRes : false
        }
    },
    created(){
        if(this.$store.getters.getSociety){
            fetch('http://localhost:8000/api/stuff/societies/'+this.$store.getters.getUserId)
            .then(response => response.json())
            .then(data => {
                this.nom = data[0].nom;
                this.rue = data[0].rueEntreprise;
                this.ville = data[0].villeEntreprise;
                this.code = data[0].CPEntreprise;
                this.numero = data[0].numeroEntreprise;
                this.mail = data[0].mailEntreprise;
            })
            fetch('http://localhost:8000/api/stuff/societies/'+this.$store.getters.getUserId+'/cars')
            .then(res => res.json())
            .then(data => {
                for(let i=0; i<data.length; i++){
                    let car = {
                        id : data[i].idVoiture,
                        marque : data[i].Marque,
                        modele : data[i].Modèle,
                        localisation : data[i].Localisation,
                        PrixJournalier : data[i].PrixJournalier,
                        show : true
                    }
                    this.cars.push(car);
                }
            });
        }
        else{
            fetch('http://localhost:8000/api/stuff/clients/'+this.$store.getters.getUserId)
            .then(response => response.json())
            .then(data => {
                this.nom = data[0].nomClient;
                this.prenom = data[0].prenomClient;
                this.mail = data[0].mailClient;
                this.numero = data[0].numeroClient;
                this.rue = data[0].RueClient;
                this.ville = data[0].VilleClient;
                this.code = data[0].CPClient;
            });
            fetch('http://localhost:8000/api/stuff/reservations/client/'+this.$store.getters.getUserId)
            .then( data => data.json())
            .then( res => {
                for(let y=0; y<res.length ; y++){
                    let reservation = {
                        id : res[y].idReservation,
                        idVoiture : res[y].idVoiture,
                        idClient : res[y].idClient,
                        dateDeb : res[y].date_debut.substr(0,10),
                        dateFin : res[y].date_fin.substr(0,10),
                        prixTotal : res[y].prixTotal
                    };
                    this.reservations.push(reservation);
                }
            })

        }
    },
    methods : {
        Reservations(){
            for(let j = 0; j < this.cars.length ; j++){
                console.log("J'y arrive pas")
                console.log(this.cars)
                fetch('http://localhost:8000/api/stuff/reservations/cars/'+this.cars[j].id)
                .then(data => data.json())
                .then( res => {
                    console.log(res);
                    for(let y = 0; y < res.length ; y++){
                        let reservation = {
                            id : res[y].idReservation,
                            idVoiture : res[y].idVoiture,
                            idClient : res[y].idClient,
                            dateDeb : res[y].date_debut.substr(0,10),
                            dateFin : res[y].date_fin.substr(0,10),
                            prixTotal : res[y].prixTotal
                        };
                        this.reservations.push(reservation);
                    }
                })
            }
            this.showRes = true
        },
        Change(){
            if(this.$store.getters.getSociety){
                const society = {
                    nom : this.nom,
                    rue : this.rue,
                    ville : this.ville,
                    code : this.code, 
                    mail : this.mail, 
                    numero : this.numero,
                    password : this.password
                }
                fetch('http://localhost:8000/api/stuff/societies/' + this.$store.getters.getUserId, {
                    headers : {
                        'Authorization' : `Bearer ${this.$store.getters.getUserToken}`,
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    method : 'put',
                    body : JSON.stringify(society)
                })
                console.log("mise a jour entreprise")
                
            }
            else {
                const client = {
                    nom : this.nom,
                    prenom : this.prenom,
                    rue : this.rue,
                    ville : this.ville,
                    code : this.code, 
                    mail : this.mail, 
                    numero : this.numero,
                    password : this.password
                }
                fetch('http://localhost:8000/api/stuff/clients/'+ this.$store.getters.getUserId, {
                    headers : {
                        'Authorization' : `Bearer ${this.$store.getters.getUserToken}`,
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    method : 'put',
                    body : JSON.stringify(client)
                })
                console.log("Mise a jour client")
                console.log(client)
            }
        },
        DeleteReservation(id){
            console.log("J'envoie l'ordre de suppression")
            this.$router.push({name : 'delete'});
            fetch('http://localhost:8000/api/stuff/reservations/'+id, {
                headers : {
                    'Authorization' : `Bearer ${this.$store.getters.getUserToken}`,
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                method: 'delete'
            })
        },
        SupprimerVoiture(car){
            this.$router.push({name : 'delete'});
            fetch('http://localhost:8000/api/stuff/cars/'+car.id, {
                headers : {
                    'Authorization' : `Bearer ${this.$store.getters.getUserToken}`,
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                method : 'DELETE'
            })
            .then(res => res.json())
            .then(response => console.log(response))        
        },
        Update(id){
            this.$router.push({ name : 'add-car', params : id })
        },
        AjoutVoiture(){
            this.$router.push({ name : 'add-car'})
        }
    }
}
</script>


<style scoped>

h1{
    font-size: 35px;
}

h2{
    font-size: 25px;
    color : #0066cc;

}

button{
    margin: 15px;
}

#informations{
    padding-top: 30px;
    padding-bottom: 30px;
    font-size : bold;
    margin-left : 10%;
    margin-right: 10%;
    border-radius: 20px;
    border: 3px solid blue;
    display: grid;
    grid-template-columns: auto  auto;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    font-size: 15px;
}

#informations div{
    padding-top: 20px;
    padding-bottom: 20px;
}

input{
    color : black;
    border-radius: 10px;
    padding: 5px;
}

table {
margin-left: auto;
margin-right: auto;
text-align: center;
border: medium solid #000000;
width: 50%;
}

table tr:nth-child(odd){
  background-color:rgb(165, 164, 164);
}

td, th {
width: 50%;
}

#informations input, #informations input[type=password] {
    background-color: lightyellow;
}

.delete{
    width: 120px;
    background-color: red;
    color: black;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    padding: 4px;
}

p{
    grid-column-start: 1;
    grid-column-end: 3;
}

.maj{
    width: 120px;
    background-color: green;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    padding: 4px;
}

.delete:hover{
    background-color: darkred;
    color: white;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}

.maj:hover{
    background-color:  darkgreen;
    color: white;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}

.ajout{
    background-color: blue;
    border: none;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
}

.modif:hover , .ajout:hover{
    background-color : darkblue;
    box-shadow: rgba(12, 74, 245, 0.4) 5px 5px, rgba(17, 49, 190, 0.3) 10px 10px, rgba(16, 32, 104, 0.2) 15px 15px, rgba(6, 26, 94, 0.1) 20px 20px, rgba(4, 17, 58, 0.05) 25px 25px;
    color : white
}

.modif{
    background-color: blue;
    border : none;
    padding : 5px;
    border-radius : 5px;
    cursor: pointer;
}

</style>