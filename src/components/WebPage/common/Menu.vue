<template>
  <div id="menu">
    <div class="container">
      <div class="row">
        <carousel-3d class="navbar"
                     width=164
                     height=152
                     space=200
                     :controls-visible="true"
                     @after-slide-change="onAfterSlideChange">        
          <slide v-for="menu, i in menus" class="nav-bar-item slide" :index="i" :key="i" >
            <router-link :to="menu.route" class="nav-item">
                <font-awesome-icon :icon="menu.icon" size="4x" :class="`icon-${menu.color}`"></font-awesome-icon>
                <p>{{ menu.title }}</p>
            </router-link>
          </slide>
        </carousel-3d>
      </div>
    </div>
  </div>
</template>
<script>
import { base_url } from "@/store/config";
import router from '@/router';
import { mapActions, mapState } from "vuex";

export default {
  name: "Menu",
  data() {
    return {
      msg: "",
      username: "",
      password: "",
      currentIdx: 0,
      menus: [
          {
            title: "Beranda",
            icon: "home",
            route: "/",
            color: "red"
          },
          {
            title: "Tentang DitjenPKP",
            icon: "info-circle",
            route: "/about",
            color: "green"
          },
          {
            title: "Unit Kerja",
            icon: "vector-square",
            route: "/unitkerja",
            color: "green"
          },
          {
            title: "Berita",
            icon: "newspaper",
            route: "/berita",
            color: "green"
          },
          {
            title: "Layanan",
            icon: "handshake",
            route: "/about",
            color: "green"
          },
        ]
    };
  },
  computed: mapState({
    berita: state => state.berita.listBerita,
    unitKerja: state => state.unitKerja.unitKerjaList
  }),
  methods: {
    ...mapActions({
      fetchUnitKerja: "fetchListUnitKerja", // map `this.increment()` to `this.$store.dispatch('increment')`
      fetchBerita: "fetchListBerita"
    }),
    onAfterSlideChange(idx){
      router.push(this.menus[idx].route)
    }
  },
  async mounted() {
    await Promise.all([this.fetchUnitKerja(), this.fetchBerita()]);
    // await this.fetchUnitKerja();
    // await this.fetchBerita();
  }
};
</script>
<style type="text/css" scoped>
a {
  color: inherit;
}

a:hover {
  color: #0b5445;
  text-decoration: none;
}

.prev, .next {
  background-color: #9e2a3b;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  text-align: center;
}

.prev > span, .next > span {
  color:#ffffff;
  text-align: center;
  font-size: 40px;
}


.bg-tosca {
  background-color: #0b5445;
}

.bg-tosca:hover {
  background-color: #0b5445;
}

.text-boldtosca {
  color: #008080;
}

.icon-red {
  color: #9e2a3b;
  align-self: center
}

.icon-green {
  color: #0b5445;
  align-self: center;
}

#menu {
  -webkit-box-shadow: 0 8px 6px -6px grey;
       -moz-box-shadow: 0 8px 6px -6px grey;
            box-shadow: 0 8px 6px -6px grey;
}

.nav-bar-item{
  border-radius: 10% !important;
  background-color: #ffffff !important;
  border-color: #ffffff !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  z-index: -1;
}

.nav-bar-item:hover {
  box-shadow: 0 10px 20px rgba(33,33,33,.2); 
}

.navbar {
  padding: 100px 0;
}

.nav-bar-item{
  height: 100%;
  display: flex;
  justify-content: center;
  text-align: center !important;
  padding-top: 15%;
}

.nav-item > p {
  padding-top: 20%;
}

.carousel-3d-slide {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    overflow: hidden;
    top: 0;
    border-radius: 20px;
    /* border-color: #000; */
    /* border-color: rgba(0,0,0,.4); */
    /* border-style: solid; */
    background-size: cover;
    background-color: white; 
    display: block;
    margin: 0;
    box-sizing: border-box;
    /* text-align: left; */
}
</style>

