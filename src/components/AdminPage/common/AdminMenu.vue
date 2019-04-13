<template>
  <div id="admin-menu">
    <div class="container">
      <div class="row">
        <carousel-3d class="navbar" 
                     display=7
                     width=164 
                     height=152 
                     space=200 
                     :controls-visible="true"
                     @after-slide-change="onAfterSlideChange">        
          <slide v-for="menu, i in menus" class="nav-bar-item" :index="i" :key="i" >
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
import { base_url } from '@/store/config';
import router from '@/router';
import { mapGetters } from 'vuex';

export default {
  name: 'AdminMenu',
  data() {
    return {
      active: '',
      menus: [
          {
            title: "Rencana Kerja",
            icon: "edit",
            route: "/admin/rencana-kerja/list",
            color: "green"
          },
          {
            title: "Berita",
            icon: "newspaper",
            route: "/admin/berita/list",
            color: "green"
          },
          {
            title: "Struktur Organisasi",
            icon: "sitemap",
            route: "/admin",
            color: "green"
          },
          {
            title: "Unit Kerja",
            icon: "vector-square",
            route: "/admin/unit-kerja/list",
            color: "green"
          },
          {
            title: "Dokumen",
            icon: "file",
            route: "/admin/download/list",
            color: "green"
          },
          {
            title: "Vidio",
            icon: "video",
            route: "/admin/video/list",
            color: "green"
          },
          {
            title: "Galeri",
            icon: "images",
            route: "/admin/galery/list",
            color: "green"
          },
          {
            title: "User",
            icon: "user",
            route: "/admin/user/list",
            color: "green"
          }
        ]
    };
  },
  created() {
  },
  methods: {
    navActive(menu) {
      this.active = menu;
    },
    onAfterSlideChange(idx){
      router.push(this.menus[idx].route)
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
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

#admin-menu {
  -webkit-box-shadow: 0 8px 6px -6px grey;
       -moz-box-shadow: 0 8px 6px -6px grey;
            box-shadow: 0 8px 6px -6px grey;
}

.nav-bar-item{
  border-radius: 10%;
  background-color: #ffffff;
  border-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
  text-align: center;
  padding-top: 15%;
}

.nav-item > p {
  padding-top: 20%;
}
</style>

