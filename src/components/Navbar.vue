<template>
  <div class="navbar">
    <nav class="nav-extended teal">
      <div class="nav-content">
        <router-link :to="{ name: 'Index'}">
          <span class="nav-title">
            VUE-IT!
            <h6>a POST-IT App powered by Firestore</h6>
          </span>
        </router-link>
        <a href="#" class="btn-floating btn-large halfway-fab teal darken-2">
          <router-link :to="{ name: 'AddPost' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
    <footer>
      <p>copyright &copy; 2019 Roberto Castelli - www.robertocastelli.dev - special thanks to Shaun Pelling</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style>
.navbar nav {
  padding: 0 20px;
  text-align: center;
}

footer {
  color: #35495e;
  text-align: center;
}
</style>