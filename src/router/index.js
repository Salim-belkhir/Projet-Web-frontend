import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Rates from '../views/ReservationView'
import LoginClient from '../views/LoginClientView.vue'
//import ResearchView from '../views/ResearchView.vue'
import SignupClientView from '../views/SignupClientView.vue'
import AccountView from '../views/MyAccountView.vue'
import ReservationView from '../views/ReservationView.vue'
import NotFound from '../views/NotFound.vue'
import LoginSocietyView from '../views/LoginSocietyView.vue'
import SignupSocietyView from '../views/SignupSocietyView.vue'
import Research from '../views/ResearchVue.vue'
import AddCar from '../views/AddCarView.vue'
import DeleteView from '../views/DeleteView.vue'



const routes = [
  {
    path : '',
    name : 'home',
    component : HomeView,
    meta : { 
      title : 'Accueil'
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta : {
      title : 'Accueil'
    }
  },
  {
    path : '/add-car',
    name : 'add-car',
    component : AddCar,
    meta : {
      title : 'Ajout Voiture'
    },
    props : true
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta : {
      title : 'Accueil'
    }
  },
  {
    path: '/rates',
    name: 'rates', 
    component: Rates
  },
  {
    path : '/login-society',
    name : 'login-society',
    component : LoginSocietyView,
    meta : {
      title : 'Connexion'
    }
  },
  {
    path: '/login-client',
    name: 'login-client',
    component: LoginClient,
    meta : {
      title : 'Connexion'
    }
  },
  {
    path: '/research',
    name: 'research',
    component: Research,
    meta : {
      title : 'Recherche'
    }
  },
  {
    path:'/signup-client',
    name: 'signup-client',
    component: SignupClientView,
    meta : {
      title : 'Inscription'
    }
  },
  {
    path : '/signup-society',
    name : 'signup-society',
    component : SignupSocietyView
  },
  {
    path: '/myaccount',
    name: 'myaccount',
    component: AccountView,
    meta : {
      title : 'Mon Compte'
    }
  },
  {
    path : '/reservation/:id',
    name : 'reservation',
    component : ReservationView,
    meta : {
      title : 'Réservation'
    },
    props : true
  },
  {
    name : 'NotFound',
    path : '/:pathMatch(.*)',
    component : NotFound,
    meta : {
      title : '404 Not Found'
    }
  },
  {
    path : '/delete',
    name : 'delete',
    component : DeleteView,
    meta : {
      title : 'Suppression'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.afterEach((to, from) => {
  from;
  document.title = to.meta.title;
})

export default router
