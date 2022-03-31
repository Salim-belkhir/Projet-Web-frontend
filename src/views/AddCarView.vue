<template>
    <div id="display" v-if="$store.getters.getUserId!=null && $store.getters.getUserToken!=null">
        <h1>Ajout de voiture</h1>


        <div>
            <label for="marque">Marque de la voiture : </label>
            <input type="text" required v-model="marque">
        </div>

        <div>
            <label for="modele">Modèle de la voiture : </label>
            <input type="text" required v-model="modele">
        </div>

        <div>
            <label for="localisation">Localisation de la voiture : </label>
            <input type="text" required v-model="localisation">
        </div>

        <div>
            <label for="prix">Prix Journalier souhaité : </label>
            <input type="number" name="prix" required v-model="prixJournalier">
        </div>

        <div>
            <label for="type">Type de voiture : </label>
            <select name="type" id="type" v-model="type">
            </select>
        </div>

        <div>
            <button @click="Onsubmit">Valider</button>
        </div>
    </div>

    <div v-else>
        <h1>La page n'est pas accessible</h1>
    </div>
</template>



<style scoped>

#display{
    display: grid;
    grid-template-columns: auto;
    background-color: darkblue;
    border-radius: 20px;
    color : white;
    padding-bottom: 20px;
    padding-top: 20px;
    margin-top : 40px;
    margin-left: 10%;
    margin-right: 10%;
}

button{
    background-color: blue;
    border: none;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    width: 90px;

}

input{
    border-radius: 5px;
}

input:hover{
    border: 4px solid blue;
}

button:hover{
    background-color: lightblue;
}

#display div{
    padding: 10px;
}

</style>



<script>
export default {
    name : 'AddCarView',
    props : ['id'],
    data(){
        return{
            idVoiture : null,
            marque : "",
            modele : "",
            localisation : "",
            prixJournalier : null,
            idEntreprise : null,
            type : ""
        }
    }, 
    created(){
        console.log(this.id)
        if(this.id == null){
            this.idEntreprise = this.$store.getters.getUserId;
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
            
            })
        }
        else{
            fetch('http://localhost:8000/api/stuff/cars/'+this.id)
            .then(data => data.json())
            .then(response => {
                this.idVoiture = response[0].idVoiture;
                this.marque = response[0].Marque;
                this.modele = response[0].Modèle;
                this.localisation = response[0].Localisation;
                this.prixJournalier = response[0].PrixJournalier;
            })

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
            
            })

            fetch('http:/localhost:8000/api/stuff/types/'+this.id)
            .then(data => data.json())
            .then(res => this.type = res[0].libelléType)
        }
    },
    methods : {
        Onsubmit(){
            this.idEntreprise = this.$store.getters.getUserId
            let car = {
                marque : this.marque,
                modele : this.modele,
                localisation : this.localisation,
                type : this.type,
                prixJournalier : this.prixJournalier,
                idEntreprise : this.$store.getters.getUserId
            }
            if( this.id == null){
                fetch('http://localhost:8000/api/stuff/cars',{
                    headers : {
                        'Authorization' : `Bearer ${this.$store.getters.getUserToken}`,
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                    },
                    method : 'POST',
                    body : JSON.stringify(car)
                })
            }
            else{
                console.log("Je vais envoyer la reqête")
                fetch('http://localhost:8000/api/stuff/cars/'+this.id, {
                    headers : {
                        'Authorization' : `Bearer ${this.$store.getters.getUserToken}`,
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                    },
                    method : 'put',
                    body : JSON.stringify(car)
                })
            }
            
            this.$router.push({name : 'myaccount'})
        }
    }

}
</script>