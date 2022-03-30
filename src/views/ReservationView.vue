<template>
    <div>
        <h3>Réservation</h3>

        <div>
            
        </div>

        
        
    </div>
</template>


<script>
export default {
    name:'ReservationView',
    props: ['id'],
    data(){
        return{
            avis : []
        }
    },
    created(){
        fetch('http://localhost:8000/api/stuff/cars/'+this.id)
        .then()
        

        fetch('http://localhost:8000/api/stuff/reservations/cars/'+this.id)
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
        })
    }
}
</script>


<style scoped>



</style>