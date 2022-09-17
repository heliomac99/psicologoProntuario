<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/" class="nav-link" >Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Paciente" class="nav-link" >Paciente</router-link>
                </li>
            </ul>
        </div>

    </nav>
    <router-view></router-view>

</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
    li {
        margin:10px;
    }
    nav {
        margin-bottom:20px;
    }
    a {
        text-decoration: none;
    }
</style>
