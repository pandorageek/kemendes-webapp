<template>
  <div class='tujuan-form'>
    <b-form>
      <h5> Tujuan </h5>
      <b-form-group horizontal :label-cols="3" label="Tujuan">
        <b-form-input v-model="tujuan.name" type="text">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Unit Pemilik Resiko"
                    :label-cols="3"
                    size="lg"
                    horizontal>
        <b-form-select v-model="tujuan.unit_pemilik_resiko"
                       :options="optDirektorat"
                       v-if="super_role.indexOf(user.role) !== -1">
        </b-form-select>
        <b-form-input v-model="tujuan.unit_pemilik_resiko"
                      type="text"
                      v-else readonly>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Unit Eselon III/IV"
                    :label-cols="3"
                    size="lg"
                    horizontal>
        <b-form-select v-model="tujuan.unit_eselon"
                       :options="optJabatan"
                       v-if="super_role.indexOf(user.role) !== -1">
        </b-form-select>
        <b-form-input v-model="tujuan.unit_eselon" type="text" v-else readonly>
        </b-form-input>
      </b-form-group>
      <b-form-group horizontal :label-cols="3" label="Periode">
        <b-form-input v-model="tujuan.periode" type="text">
        </b-form-input>
      </b-form-group>
      <b-form-group horizontal :label-cols="3" label="Kegiatan">
        <b-form-input v-model="tujuan.kegiatan" type="text">
        </b-form-input>
      </b-form-group>
    </b-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: ['tujuan'],
  name: 'TujuanForm',
  data() {
    return {
      name: this.tujuan.name,
      unit_pemilik_resiko: this.tujuan.unit_pemilik_resiko,
      unit_eselon: this.tujuan.unit_eselon,
      kegiatan: this.tujuan.kegiatan,
      super_role: ['admin', 'superadmin', 'Eselon I']
    };
  },
  methods: {
    unitPemilikResiko() {
      if (this.tujuan.unit_pemilik_resiko == '' || this.tujuan.unit_pemilik_resiko == undefined) {
        this.tujuan.unit_pemilik_resiko = this.user.direktorat
      }
    },
    unitEselon() {
      if (this.tujuan.unit_eselon == '' || this.tujuan.unit_eselon == undefined) {
        this.tujuan.unit_eselon = this.user.role
      }
    },
  },
  created() {
    this.$store.dispatch('fetchListStrukturJabatan');
    this.unitPemilikResiko();
    this.unitEselon()
  },
  computed: {
    ...mapGetters({
      user: 'user',
      optJabatan: 'optJabatan',
      optDirektorat: 'optDirektorat'
    }),
  },
};
</script>
<style type="text/css">
  .panel-footer {
    text-align: right !important;
  }
</style>
