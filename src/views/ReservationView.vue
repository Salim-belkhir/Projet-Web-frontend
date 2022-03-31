<template>
    <div id="page">
        <h1>Réservation</h1>

        <div id="affichage">
            <div class="image"><img :src="photo"></div>
            <div id="informations">
                <div class="marque"> Marque : "{{marque}}" </div>
                <div class="modele"> Modèle : "{{modele}}" </div>
                <div class="localisation"> Localisation : "{{localisation}}"</div>
                <div class="tarif"> Tarif : {{prixJournalier}}€ /jour</div>
                <div class="dateDebut"> Début de la réservation : "{{$store.getters.getDateDebut}}" </div>
                <div class="dateFin"> Fin de la réservation : "{{$store.getters.getDateFin}}" </div>
                <div class="duree"> Durée : {{Duree}} jours </div>
                <div class="prix"> Prix Total : {{ PrixTotal }}€</div>    
            </div>  
        </div>

        <div id="avis">
            <h2>Liste des Avis</h2>
            <div class="cards" v-for="rate in avis" :key="rate.id">
                <div> 🎫 Numéro de la réservation : {{rate.id}} </div>
                <div> ⭐ Etoiles : {{rate.etoiles}}/5 </div>
                <div> 💬 Commentaire laissé : <br> "{{rate.commentaire}}" </div>
            </div>

        </div>


        <div>
            <input required id="checkbox" type="checkbox" v-model="check">Je reconnais avoir l'argent nécessaire pour pouvoir payer 
        </div>
        
        <div>
            <button id="valider" @click="Reserver">Valider la réservation</button>
        </div>
    </div>
</template>


<script>
export default {
    name:'ReservationView',
    props: ['id'],
    data(){
        return{
            check : null,
            avis : [],
            modele : "",
            marque : "",
            type : "",
            prixJournalier : null,
            localisation : "",
            photo : ""
        }
    },
    created(){
        fetch('http://localhost:8000/api/stuff/cars/'+this.id)
        .then(res => res.json())
        .then( data =>{
            this.modele = data[0].Modèle;
            this.marque = data[0].Marque;
            this.type = data[0].libelléType;
            this.prixJournalier = data[0].PrixJournalier;
            this.localisation = data[0].Localisation;
            this.photo = data[0].photo;
        });
        

        /*fetch('http://localhost:8000/api/stuff/reservations/cars/'+this.id)
        .then( data => data.json())
        .then( res => {
            for(let i=0; i<res.length; i++){
                let idReservation = res[i].idReservation;
                fetch('http://localhost:8000/api/stuff/rates/'+idReservation)
                .then(response => response.json())
                .then( data => {
                    for(let j = 0; j<data.length; j++){
                        this.avis.push(data[j])
                    }
                })
            }
        });*/

        fetch('http://localhost:8000/api/stuff/rates/'+this.id)
        .then(res => res.json())
        .then(data => {
            for(let i=0; i<data.length; i++){
                let rate = { 
                    id : data[i].idReservation,
                    etoiles : data[i].etoiles,
                    commentaire : data[i].commentaire  
                }
                this.avis.push(rate)
            }
        })
    },
    methods : {
        Reserver(){
            let reservation = {
                idVoiture : this.id,
                idClient : this.$store.getters.getUserId,
                dateDeb : this.$store.getters.getDateDebut,
                dateFin : this.$store.getters.getDateFin,
                prixTotal : this.PrixTotal
            }
            console.log(reservation)
            if(this.check == true){
                fetch('http://localhost:8000/api/stuff/reservations', {
                    method : 'post',
                    headers : {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(reservation)
                })

            }
            else{
                alert("Vous n'avez pas cocher la case")
            }
            this.$router.push({name : 'myaccount'})
        }
    },
    computed : {
        Duree(){
            let DateDeb = this.$store.getters.getDateDebut.split('-');
            let DateFin = this.$store.getters.getDateFin.split('-');

            console.log(DateDeb)
            let annee = parseInt(DateFin[0]) - parseInt(DateDeb[0])
            let mois = parseInt(DateFin[1]) - parseInt(DateDeb[1])
            let jours = parseInt(DateFin[2]) - parseInt(DateDeb[2])
            return (annee*365) + (mois * 30) + (jours);
        },
        PrixTotal(){
            return this.prixJournalier * this.Duree;
        }
    }
}
</script>


<style scoped>

h2{
    margin-top: 20px;
    margin-left: 30px;
}

.cards{
    border: 3px solid grey;
    border-radius: 4px;
    padding: 10px;
    margin: 10px;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
}

#avis{
    text-align: left;
}


#affichage{
    display: grid;
    grid-template-columns: auto auto auto;
}

#informations{
    display: grid;
    grid-template-columns: auto auto;
    text-align: left;
}

/*
#car{
    display: grid;
    grid-template-columns: auto auto ;
    grid-template-rows: auto auto auto auto auto;
}

.marque{
    grid-row-start: 2;
}

.modele{
    grid-row-start: 2;
}

.localisation{
    grid-row-start: 3;
    grid-column-start: 4;
}

.tarif{
    grid-row-start : 3;
    grid-column-start: 5;
}

.dateDebut{
    grid-row-start : 4;
    grid-column-start: 4;
}

.dateFin{
    grid-row-start: 4;
    grid-column-start: 5;
}

.image{
    grid-column-start: 1;
    grid-row-start: 1;
    grid-column-end: 4;
    grid-row-end: 4;
}
*/
h1{
    text-align: left;
}

h1{
    padding-left : 10%;
    margin-top: 30px;
}

img{
    border-radius: 15px;
    width: 500px;
}

#checkbox{
    text-align: left;
    margin-top: 40px;
}


#valider{
    padding: 6px;
    margin-top: 30px;
    background: blue;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    color: black;
}

#valider:hover{
    background-color: lightblue;
}



</style>