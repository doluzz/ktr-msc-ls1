<template>
    <div>
        <h1>Liste carte</h1>
        Nom <input v-model="nameCarte" type="text">
        Nom entreprise <input v-model="entrCarte" type="text">
        Email <input v-model="emailCarte" type="text">
        Téléphone <input v-model="telCarte">
        <p>
            <button @click="addCarte">Nouvelle carte</button>
        </p>
        <div v-if="cartes.nbCarte">
            <div class="bold">
                <p>Vos cartes : </p>
            </div>
            <ul>
                <li class="liC" v-if="cartes.carte1">Nom : {{cartes.carte1.name}} <br> Nom Entreprise : {{cartes.carte1.compagny}} <br> Email : {{cartes.carte1.email}} <br> Téléphone : {{cartes.carte1.phone}}
                </li>
                <li class="liC" v-if="cartes.carte2">Nom : {{cartes.carte2.name}} <br> Nom Entreprise : {{cartes.carte2.compagny}} <br> Email : {{cartes.carte2.email}} <br> Téléphone : {{cartes.carte2.phone}}
                </li>
                <li class="liC" v-if="cartes.carte3">Nom : {{cartes.carte3.name}} <br> Nom Entreprise : {{cartes.carte3.compagny}} <br> Email : {{cartes.carte3.email}} <br> Téléphone : {{cartes.carte3.phone}}
                </li>
            </ul>
        </div>
        <div>
            <h3 class="marIn"> Suivez les cartes votre ami <br> </h3>
            <input v-model="followCard">
        </div>
        <p>
            <button @click="follow">Follow</button>
        </p>
        <div class="bold" v-if="cartes.followFriend">
            <p>Vous suivez : {{cartes.followFriend}}</p>
        </div>
        <div>
            <ul>
                <li class="liC" v-if="followList.carte1">Nom : {{followList.carte1.name}} <br> Nom Entreprise : {{followList.carte1.compagny}} <br> Email : {{followList.carte1.email}} <br> Téléphone : {{followList.carte1.phone}}
                </li>
                <li class="liC" v-if="followList.carte2">Nom : {{followList.carte2.name}} <br> Nom Entreprise : {{followList.carte2.compagny}} <br> Email : {{followList.carte2.email}} <br> Téléphone : {{followList.carte2.phone}}
                </li>
                <li class="liC" v-if="followList.carte3">Nom : {{followList.carte3.name}} <br> Nom Entreprise : {{followList.carte3.compagny}} <br> Email : {{followList.carte3.email}} <br> Téléphone : {{followList.carte3.phone}}
                </li>
            </ul>
        </div>
        <p>
            <button @click="Déconnexion">Déconnexion</button>
        </p>
    </div>
</template>

<script>
import axios from 'axios'
const baseURL = 'http://localhost:3000/comptes'

export default {
    name: 'Carte',
    data: function () {
        return{
            nameCarte: "",
            entrCarte: "",
            emailCarte: "",
            telCarte: "",
            cartes: [],
            followCard: "",
            followList: [],
            idLS: ""
        }
    },
    async created(){
        try {
            var idLS = localStorage.getItem('User')
            const res = await axios.get(baseURL, {params: {id:idLS}})
            this.cartes = res.data[0]
            if (this.cartes.followFriend) {
                const respo = await axios.get(baseURL, {params: {name: res.data[0].followFriend}})
                this.followList = respo.data[0]
            }
        } catch (e) {
            console.error(e)
        }

    },
    mounted: function() {
        if (localStorage.getItem('Status') != 'connecté') {
            alert("Vous n'êtes pas connecté")
            this.$router.push('/');
        }
    },
    methods: {
        async addCarte() {
            var regex = /^[A-Za-z0-9_-]{3,30}$/
            console.log("la")
            if (regex.test(this.entrCarte)) {
                var idLS = localStorage.getItem('User')
                const resp = await axios.get(baseURL, {params: {id:idLS}})
                var nb = resp.data[0].nbCarte
                if (nb == undefined) {
                    nb = 1
                    await axios.patch(baseURL+ "/" + idLS, {nbCarte: nb})
                    const body = {carte1 :{id: nb, name: this.nameCarte, compagny: this.entrCarte, email: this.emailCarte, phone: this.telCarte}}
                    await axios.patch(baseURL+ "/" + idLS, body)
                    location.reload()
                } else if (nb == 1){
                    nb = nb + 1
                    await axios.patch(baseURL+ "/" + idLS, {nbCarte: nb})
                    const body = {carte2 :{id: nb, name: this.nameCarte, compagny: this.entrCarte, email: this.emailCarte, phone: this.telCarte}}
                    await axios.patch(baseURL+ "/" + idLS, body)
                    location.reload()
                } else if (nb == 2){
                    nb = nb + 1
                    await axios.patch(baseURL+ "/" + idLS, {nbCarte: nb})
                    const body = {carte3 :{id: nb, name: this.nameCarte, compagny: this.entrCarte, email: this.emailCarte, phone: this.telCarte}}
                    await axios.patch(baseURL+ "/" + idLS, body)
                    location.reload()
                } else {
                    alert("Limite de 3 cartes atteintes")
                }
            } else {
                alert("Erreur Entreprise Seulement des lettres en 3 et 16 caractères")
                }

        },
        Déconnexion(){
            localStorage.removeItem('Status');
            localStorage.removeItem('User')
            location.reload()
        },
        async follow() {
            const respo = await axios.get(baseURL, {params: {name: this.followCard}})
            if (respo.data.length == 0) {
                alert("Votre ami n'a pas de compte")
            } else if (respo.data.length >= 2) {
                alert("Problème contactez l'admin")
            } else if (respo.data.length == 1) {
                if (respo.data[0].nbCarte == undefined) {
                    alert("Votre ami n'a pas de carte")
                } else {
                    this.followList = respo.data[0]
                    await axios.patch(baseURL+ "/" + this.cartes.id, {followFriend: this.followCard})
                    location.reload()
                }
            }
        }
    },
}

</script>

<style>
.liC {
    margin-bottom: 2%;
    list-style-type:none;
}
.bold {
    font-weight: bold
}
.marIn {
    margin-bottom: 1%;
    text-decoration: underline;
}
</style>

