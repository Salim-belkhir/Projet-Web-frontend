<template>

    <div>
        <h1>Recherche</h1>


        <form action="" @submit.prevent="Onsubmit">

            <div>
                <label for="lieu">Localisation</label>
                <input class="val" type="text" required v-model="localisation">
                <datalist >
                    <option value="Montpellier" >Montpellier</option>
                </datalist>
            </div>

            <div>
                <label for="date-début">Date de début</label>
                <input class="val" type="date" id="start" name="date-début"  min="2022-03-28" max="2024-12-31" required v-model="dateDeb">
            </div>

            <div>
                <label for="date-fin">Date de fin</label>
                <input class="val" type="date" id="end" name="date-fin"  min="2022-03-28" max="2024-12-31" required v-model="dateFin">
            </div>

            <div>
                <label for="prix">Prix maximum par journée</label>
                <select name="prix" id="price" v-model="prixMax">
                    <option value="aucun">Pas de maximum</option>
                    <option value="30">30€</option>
                    <option value="40">40€</option>
                    <option value="50">50€</option>
                    <option value="60">60€</option>
                    <option value="70">70€</option>
                    <option value="80">80€</option>
                </select>
            </div>

            <div>
                <label for="type">Type de véhicule</label>
                <select name="type" id="type" v-model="type">
                    <option>Pas de catégories</option>
                </select>
            </div>

            <div class="content">
                <input type="submit" value="Rechercher">
            </div>
        </form>



        <h3 v-if="showResults">Résultats de la recherche du {{ dateDeb }} au {{ dateFin }}</h3>

        <div v-if="showResults">
            <div>
                <div class="container">
                    <div v-for="x in cars" v-bind:key="x.id">
                        <div  class="cards"  v-if="x.showCar">
                            <div id="imageCar"><img :src="x.photo" alt="" srcset=""></div>
                            <div id="marque">Marque : {{x.marque}}</div>
                            <div id="modele">Modèle : {{x.modele}}</div>
                            <div id="tarif">Tarif : {{x.prix}}€/jour </div>
                            <div id="typeCar">Type de Voiture : {{x.type}}</div>
                            <div id="reserver"><button :disabled="$store.getters.getUserId == null" @click="Reservation(x.id)">Réserver</button></div>

                        </div>
                    </div>
                </div>

             </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name : 'RechercheVue',
    data(){
        return{
            showResults : false,
            localisation : "",
            dateDeb: "",
            dateFin: "",
            prixMax: null,
            type : "",
            cars : []
        }
    },
    created(){
        fetch('http://localhost:8000/api/stuff/cars')
        .then(res => res.json())
        .then( data => {
            for(let i = 0; i < data.length; i++){
                console.log(data[i])
                let car = {
                        id: data[i].idVoiture,
                        marque: data[i].Marque,
                        modele : data[i].Modèle,
                        localisation: data[i].Localisation,
                        prix : data[i].PrixJournalier,
                        idEntreprise : data[i].idEntreprise,
                        idType : data[i].idTypeVoiture,
                        photo : data[i].photo,
                        type : data[i].libelléType,
                        showCar : true
                    }
                    console.log(car)
                this.cars.push(car)
            }
        });
        

        fetch('http://localhost:8000/api/stuff/types')
        .then(data => data.json())
        .then(response => {
            for (let i=0; i<response.length; i++){
                let select = document.getElementById('type');
                let option = document.createElement("option");
                option.value = response[i].libelléType;
                let text = document.createTextNode(`${response[i].libelléType}`);
                option.appendChild(text);
                select.appendChild(option);
            }
        });
    },
    methods : {
        Onsubmit(){
            this.$store.commit('CHANGE_DATE_DEBUT', this.dateDeb);
            this.$store.commit('CHANGE_DATE_FIN', this.dateFin);
            this.showResults = true;
            for(let i=0 ; i<this.cars.length; i++){
                if(this.cars[i].localisation != this.localisation){
                    this.cars[i].showCar = false;
                }
                if(this.cars[i].prix > this.prixMax && this.prixMax!=null){
                    this.cars[i].showCar = false;
                }
                if(this.cars[i].type != this.type && this.type!=""){
                    this.cars[i].showCar = false;
                }
            }
            /*let research = { 
                localisation : this.localisation,
                dateDeb : this.dateDeb,
                dateFin : this.dateFin, 
                prixMax : this.prixMax,
                type : this.type
                }
            console.log(research);
            fetch('http://localhost:8000/api/stuff/cars/disponibilities', {
                headers: { 
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'},
                method : 'POST',
                body : JSON.stringify(research)
            })
            .then(response => response.json())
            .then(data => {
                var tab = [];
                console.log(data)
                for(let i = 0; i<data.length; i++){
                    let car = {
                        id: data[i].idVoiture,
                        marque: data[i].Marque,
                        localisation: data[i].Localisation,
                        prix : data[i].PrixJournalier,
                        idEntreprise : data[i].idEntreprise,
                        idType : data[i].idTypeVoiture,
                        nomEntreprise : "",
                        type : data[i].libelléType,
                        images : []
                    }
                    tab.push(car);
                }
                //console.log(tab)
                this.cars = tab;
                //console.log(this.cars)
            });*/
        },
        Reservation(car){
            this.$router.push({name : 'reservation', params : { id : car}})
        }
    }
}
</script>



<style scoped>

#marque{
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 1;
}

#modele{
    grid-row-start: 2;
    grid-column-start: 4;
}

#reserver{
    grid-column-start: 5;
    grid-column-end: 6;
    grid-row-start: 5;
}

#reserver button{
    border: none;
    border-radius: 10px;
    padding: 8px;
    cursor: pointer;
    background-color: green;
}

#reserver button:hover{
    background-color: lightgreen;
}

#tarif{
    padding-top: 10px;
    grid-row-start: 5;
    grid-column-start: 2;
}

#typeCar{
    grid-row-start: 3;
    grid-column-start: 4;
}

#imageCar{    
    grid-row-start: 1;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 3;
}

.cards{
    border : black 3px solid;
    padding: 10px;
    border-radius: 8px;
    margin: 10px;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-template-rows: auto auto auto auto;
    text-align: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.cards img{
    border-radius: 6px;
    width : 200px;
}

.container{
    margin-top: 30px;
    margin-right: 10%;
    margin-left: 10%;
    display : grid;
    grid-template-columns: auto auto;
}
 
 /** Formulaire **/


form{
    border: #090221 5px solid;
    position: relative;
    display: grid;
    grid-template-columns: auto auto auto;
    background-color: #4400cc;
    border-radius: 20px;
    box-sizing: border-box;
    height: 400px;
    padding: 20px;
    padding-left: auto;
    padding-right: auto;
    margin-right: 10%;
    margin-left: 10%;
    width: auto; 
    color: #fff;
    align-items: center;
    align-self: center;
    font-family: Arial, Helvetica, sans-serif;
    font-weight : bold;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

form input{
    cursor: pointer;
    padding: 3px;
    border-radius: 5px;
}

form select{
    padding : 3px;
    border-radius: 5px;
    background-color: white;
}

.val:hover, #price:hover, #type:hover{
    border: #005AFE 3px solid;
    padding: 3px;
}

form label{
    padding-right: 10px;
}

form div {
    width: 70;
    font-size: 15px;
}

.content{
    margin-top: 20%;
    margin-left: 30%;
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
    font-size: 1.1rem;
    font-family: 'Atlata', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
}



</style>