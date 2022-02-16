<template>
    <div>
        Nom <input v-model="name" type="text">
        Mot de passe <input v-model="mdp" type="password">
        <p>
            <button @click="coCompte">Connexion</button>
        </p>
        <p>
            <button @click="pathIns">Pour s'inscrire</button>
        </p>
    </div>
</template>

<script>
import axios from 'axios'
const baseURL = 'http://localhost:3000/comptes'

export default {
    name: 'Connexion',
    data: function () {
        return {
            name: "",
            mdp: "",
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
        async coCompte() {
            const ress = await axios.get(baseURL, { params: {name:this.name} })
            if (ress.data.length == 0) {
                alert("Pas le bon Nom ou Mot de passe")
            } else if (ress.data.length == 1) {
                console.log(ress.data[0].mdp)
                var mdpCo = ress.data[0].mdp
                this.$store.commit('encrypt', this.mdp)
                console.log(this.$store.state.mdp)
                if (this.$store.state.mdp == mdpCo) {
                    var donnee = ress.data[0].id
                    this.$store.dispatch('login', donnee)
                    console.log("Connexion")
                    this.$router.push('/');
                } else {
                    alert("Pas le bon Nom ou Mot de passe")
                }
            } else {
                alert("Plusieurs comptes on le même nom contactez l'admin")
            }
        },
        pathIns(){
            this.$router.push('/Inscription');
        },
    },

}

</script>