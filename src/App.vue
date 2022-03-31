<template>

  <nav> 
    <router-link to="/home">Accueil</router-link>
    <div class="dropdown">
      <div class="dropbtn" v-if="$store.getters.getUserId == null && $store.getters.getUserToken == null">Se connecter</div>
        <div class="dropdown-content">
          <router-link to="/login-client">Espace Client</router-link>
          <router-link to="/login-society">Espace Professionnel</router-link>
        </div>
      </div>
    <router-link to="/research" v-if="!$store.getters.getSociety">Rechercher</router-link> 
    <div class="dropdown">
      <div class="dropbtn" v-if="$store.getters.getUserId == null && $store.getters.getUserToken == null">Inscription</div>
        <div class="dropdown-content">
          <router-link to="/signup-society">Inscrire son entreprise</router-link>
          <router-link to="/signup-client">S'inscrire en tant que client</router-link>
        </div>
    </div>
    <router-link v-if="$store.getters.getUserId!=null && $store.getters.getUserToken!=null" to="/myaccount">Mon Compte</router-link>
    <button id="disconnect" @click="Deconnect" v-if="$store.getters.getUserId!=null && $store.getters.getUserToken!=null">Déconnexion</button>
  </nav>
  <router-view></router-view>

</template>

<script>



export default {
  name : 'App',
  methods : {
    Deconnect(){
      this.$store.commit("CHANGE_USERID", null);
      this.$store.commit("CHANGE_TOKEN", null);
      this.$store.commit("CHANGE_SOCIETY", false);
      this.$router.push({name : 'home'});
    }
  }

}
</script>

<style>

html{

  background-color: #d9d9d9;
}

button{
  text-decoration: none;
}

#disconnect{
  padding: 5px;
  border : none;
  border-radius: 5px;
  border: none;
  background-color: lightblue;
}

#disconnect:hover {
  background-color: lightblue;
  cursor : pointer;
  border : 2px blue solid;
  padding: -2px;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 60px;
}

nav {
  background-color: darkblue ;
  padding: 30px;
  font : white;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}

nav a {
  text-decoration: none;
  font-weight: bold;
  color: white;
  margin: 8px;
  padding-right: 13px;
}

nav a.router-link-exact-active {
  color: lightgrey;
}


/*body{
  background-image: linear-gradient(to bottom, #ccebff, #b3e0ff, #99d6ff, #4db8ff);
  background-repeat: no-repeat;
}*/


/********   Menu déroulant    ***********/

/* Style The Dropdown Button */


.dropbtn {
  font-weight: bold;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    margin-right: 20px;
}
  
/* The container <div> - needed to position the dropdown content */
.dropdown {
position: relative;
display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
display: none;
position: absolute;
background-color: #f9f9f9;
min-width: 160px;
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
color: black;
padding: 12px 16px;
text-decoration: none;
display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f1f1}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
/*.dropdown:hover .dropbtn {
background-color: blue;
}*/



</style>
