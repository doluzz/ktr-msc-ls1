<template>
    <div>
        <div id="Connecté">
            <h1>Vous êtes connecté</h1>
            <p>
                <button @click="Déconnexion">Déconnexion</button>
            </p>
            <p>
                <button @click="pathCarte">Créer une nouvelle carte</button>
            </p>
        </div>
        <div id="Déconnecté">
            <h1>Vous n'êtes pas connecté</h1>
            <p>
                <button @click="pathCo">Pour se connecter</button>
            </p>
            <p>
                <button @click="pathIns">Pour s'inscrire</button>
            </p>
        </div>

    </div>
</template>

<script>

export default {
    name: 'Home',
    mounted: function() {
        var divDeco = document.getElementById("Déconnecté");
        var divCo = document.getElementById("Connecté");
        if (localStorage.getItem('Status') == 'connecté') {
            divCo.style.display = "block";
            divDeco.style.display = "none";
        } else {
            divCo.style.display = "none";
            divDeco.style.display = "block";
        }
    },
    methods: {
        Déconnexion(){
            localStorage.removeItem('Status');
            localStorage.removeItem('User')
            location.reload()
        },
        pathCo(){
            this.$router.push('/Connexion');
        },
        pathIns(){
            this.$router.push('/Inscription');
        },
        pathCarte(){
            this.$router.push('/Carte');
        },
    },
}

</script>

<style>
   #Déconnecté{
       display: block;
   }
    #Connecté{
       display: none;
   }
</style>