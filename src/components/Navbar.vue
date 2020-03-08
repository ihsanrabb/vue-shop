  <template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">Hajj Shop</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link custom-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/productPage" class="nav-link custom-link" href="#">Shop Now</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link custom-link" href="#">About</router-link>
          </li>
        </ul>
        
          <a data-toggle="modal" data-target="#login">
            <img class="custom-icon" src="../assets/svg/user-icon.svg" />
          </a>
          <a data-toggle="modal" data-target="#miniCart">
            <img class="custom-icon" src="../assets/svg/cart-icon.svg">
          </a>
        
      </div>  
  </nav>
    
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="../styles/Navbar.scss" />
