<template>
    <div>
        <h1>Inscription</h1>
        Nom <input v-model="name" type="text">
        Mot de passe <input v-model="mdp" type="password">
        Nom entreprise <input v-model="entr" type="text">
        Email <input v-model="email" type="text">
        Téléphone <input v-model="tel">
        <p>
            <button @click="addCompte">Inscription</button>
        </p>
        <p>
            <button @click="pathCo">Pour se connecter</button>
        </p>
    </div>
</template>

<script>
import axios from 'axios'
const baseURL = 'http://localhost:3000/comptes'

export default {
    name: 'Inscription',
    data: function () {
        return {
            name: "",
            mdp: "",
            entr: "",
            email: "",
            tel: "",
            comptes: [],
        }
    },
    
    async created(){
        try {
            const res = await axios.get(baseURL)
            this.comptes = res.data
        } catch (e) {
            console.error(e)
        }
    },
    
    mounted: function () {
        if (localStorage.getItem('Status') == 'connecté') {
            alert("Vous êtes dèjà connecté")
            this.$router.push('/');
        }
    },

    methods: {
        async addCompte() {
           var regex = /^[A-Za-z0-9_-]{3,30}$/

            if (!regex.test(this.name)) {
                alert("Erreur Nom Seulement des lettres en 3 et 16 caractères")
            } else {
                regex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,}$/

                if (!regex.test(this.mdp)) {
                    alert("Erreur Mot de passe doit contenir 1maj, 1nombre et au moins 6 caractères")
                } else {
                    regex = /^[A-Za-z0-9_-]{3,16}$/

                    if (!regex.test(this.entr)) {
                        alert("Erreur Entreprise Seulement des lettres en 3 et 16 caractères")
                    } else {
                        regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/

                        if (!regex.test(this.email)) {
                            alert("Erreur Votre adresse mail n'est pas conforme")
                        } else {
                            regex = /^\d+$/

                            if (!regex.test(this.tel)) {
                                alert("Erreur Votre numéro de téléphone n'est pas bon")
                            } else {
                                const resp = await axios.get(baseURL, {params: {name:this.name}})

                                if (resp.data.length == 0) {
                                    this.$store.commit('encrypt', this.mdp)
                                    const res = await axios.post(baseURL, {name: this.name, mdp: this.$store.state.mdp, compagny: this.entr, email: this.email, phone: this.tel})
                                    this.comptes = [this.comptes, res.data]
                                    this.name = ""; this.mdp = ""; this.entr = ""; this.email = ""; this.tel = "";
                                    this.$router.push('/Connexion');
                                } else {
                                    alert("Nom déjà utilisé")
                                }
                            }
                        }
                    }
                }
            }
        },

        pathCo(){
        this.$router.push('/Connexion');
        },  
    },

}

</script>