<template>
    <div>
        <h1 class="title">Inscription</h1>

        <h4 class="subtitle">Veuillez renseigner s'il vous plaît les informations suivantes pour vous inscrire</h4>

    
        <form class="formulaire" action="" @submit.prevent="onSubmit">
            <div class="input-container">
                <div>
                    <label for="fname">Nom : </label>
                    <input type="text" placeholder="Dupont" v-model="firstname" required>
                </div>
            
                <div>
                    <label for="name">Prénom : </label>
                    <input type="text" placeholder="Marc" v-model="name" required>
                </div>

                <div>
                    <label for="name">Email : </label>
                    <input type="text" placeholder="nom@mail.com" v-model="mail" required>
                </div>

                <div>
                    <label for="name">Numéro de téléphone : </label>
                    <input type="text" placeholder="0677889900" v-model="numero" maxlength="10" minlength="10" required>
                </div>


                <div>
                    <label for="name">Rue : </label>
                    <input type="text" placeholder="5 Rue de l'aiguillerie" v-model="rue" required>
                </div>


                <div>
                    <label for="name">Ville : </label>
                    <input type="text" placeholder="Montpellier" v-model="ville" required>
                </div>


                <div>
                    <label for="name">Code Postal : </label>
                    <input type="text" placeholder="34000" v-model="code" required>
                </div>

                <div class="content">
                    <input type="submit">
                </div>
            </div>
            

        
            
            

        </form>
    </div>
</template>


<script>
export default {
    
}
</script>

<style scoped>

</style>