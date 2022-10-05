<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light"  >
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Usuario" class="nav-link">Usuário</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Paciente" class="nav-link">Paciente</router-link>
                </li>
            </ul>
        </div>
    </nav>
    <router-view></router-view>

</template>

<script>

export default {
        name: 'App',

}
</script>

<style>
    li {
        margin:10px;  
    }
    a {
        text-decoration: none;
    }

    /* #home {
        width: 100vw;
        height: 100vh;
        background-size: cover;
        background-image: url('./assets/wallpaper.png'); 
        opacity: 1.0;
        display: inline-table;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;
        max-width:100%; 
    } */

    nav {
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
        color: antiquewhite;
    }

    #content {
        width: 100vw;
        height: 100vh;
        background-color: white;
        opacity: 1.0;
        display: inline-table;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;
        padding:30px;
    }

</style>
