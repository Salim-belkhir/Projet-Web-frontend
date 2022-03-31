<template>
    <div>
        <h3>Vous etes sur le point de supprimer cet élément.</h3>
        <h3>Etes-vous sûr de vouloir supprimer ?</h3>

        <button @click="Suivant">Je confirme la suppression</button>
    </div>
    
</template>


<script>
export default {
    name : 'DeleteView',
    methods : {
        Suivant(){
            this.$router.push({name : 'myaccount'})
        }
    }
}
</script>