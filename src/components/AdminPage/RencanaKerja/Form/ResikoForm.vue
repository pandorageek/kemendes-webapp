<template>
  <div class='resiko-form'>
    <b-form class="mb-4">
      <h4>Resiko Kegiatan</h4>
      <br>
      <b-card v-for="(indikator, idx) in indikators" class="mt-2">
        <b-input-group :prepend="'Indikator - '+number(idx)" class="mb-2">
          <b-form-input v-model="indikator.name" type="text" disabled>
          </b-form-input>
        </b-input-group>
        <hr>
        <b-form v-for="(kegiatan, kgidx) in indikator.kegiatans" class="mt-4 ml-4">
          <b-input-group :prepend="'Kegiatan - '+number(kgidx)">
            <b-form-input v-model="kegiatan.name" type="text" disabled>
            </b-form-input>
            <b-input-group-append>
              <b-btn variant="outline-info" v-on:click="add(idx, kgidx)">+</b-btn>
            </b-input-group-append>
          </b-input-group>

          <b-card  v-for="(resiko, r_idx) in kegiatan.resiko_kegiatan" class="mt-2">
            <span class="card-text large">
              Resiko Kegiatan - {{number(idx)}}.{{number(kgidx)}}.{{ number(r_idx) }}
            </span>
            <b-btn variant="outline-danger"
                   size="sm"
                   v-on:click="remove(idx, kgidx, r_idx)">-</b-btn>
            <hr/>
            <br>
            <b-form>
              <b-form-group label="Sumber Resiko"
                            horizontal
                            :label-cols="3"
                            class="p-1">
                <b-form-input v-model="resiko.sumber_resiko" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Kategori Resiko"
                            horizontal
                            :label-cols="3"
                         class="p-1">
                <b-form-input v-model="resiko.kategori_resiko" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Resiko"
                            horizontal
                            label-cols="3"
                         class="p-1">
                <b-form-input v-model="resiko.resiko" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Penyebab Resiko"
                            horizontal
                            :label-cols="3"
                            class="p-1">
                <b-form-input v-model="resiko.penyebab_resiko" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Dampak"
                            horizontal
                            :label-cols="3"
                            class="p-2">
                <b-form-input v-model="resiko.dampak_resiko" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Pengendalian Uraian"
                            horizontal
                            :lbel-cols="3"
                            class="p-1">
                <b-form-input v-model="resiko.pengendalian_uraian" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Pengendalian Kategori"
                            horizontal
                            :lbel-cols="3"
                            class="p-1">
                <b-form-input v-model="resiko.pengendalian_kategori" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Resiko Residual"
                            horizontal
                            :lbel-cols="3"
                            class="p-1">
                <b-form-input v-model="resiko.resiko_residual" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Pemilik Resiko"
                            horizontal
                            :lbel-cols="3"
                            class="p-1">
                <b-form-input v-model="resiko.pemilik_resiko" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Pengukuran Kemungkinan"
                            horizontal
                            :lbel-cols="3"
                            class="p-1">
                <b-form-select v-model="resiko.pengukuran_kemungkinan_key"
                               :options="pengukuran_kemungkinan_options" class="mb-3">
                </b-form-select>
                <b-form-input class="hidden" v-model="resiko.pengukuran_kemungkinan" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Pengukuran Dampak"
                            horizontal
                            :lbel-cols="3"
                            class="p-1">
                <b-form-select v-model="resiko.pengukuran_dampak_key"
                               :options="pengukuran_dampak_options" class="mb-3">
                  <template slot="first">
                    <!-- this slot appears above the options from 'options' prop -->
                    <option :value="null" disabled>-- Please select an option --</option>
                  </template>
                </b-form-select>
                <b-form-input v-model="resiko.pengukuran_dampak" type="text" class="hidden">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Pengukuran Status Resiko"
                            horizontal
                            :lbel-cols="3"
                            class="p-1">
                <b-input-group>
                  <b-form-input v-model="resiko.pengukuran_status_resiko" type="text">
                  </b-form-input>
                  <b-input-group-append>
                    <b-btn variant="outline-info"
                       size="sm"
                       v-on:click="calculateST(resiko)">calc</b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
              <b-form-group label="Level Resiko"
                            horizontal
                            :lbel-cols="3"
                            class="p-1">
                <b-form-input v-model="resiko.level_resiko" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Peringkat Resiko"
                            horizontal
                            :lbel-cols="3"
                            class="p-1">
                <b-form-input v-model="resiko.peringkat_resiko" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="RTP"
                            horizontal
                            :lbel-cols="3"
                            class="p-1">
                <b-form-input v-model="resiko.rtp" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Penanggung Jawab"
                            horizontal
                            :lbel-cols="3"
                            class="p-1">
                <b-form-input v-model="resiko.penanggung_jawab" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Target Waktu"
                            horizontal
                            :lbel-cols="3"
                            class="p-1">
                <b-form-input v-model="resiko.target_waktu" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Komunikasi"
                            horizontal
                            :lbel-cols="3"
                            class="p-1">
                <b-form-input v-model="resiko.komunikasi" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Rencana Pemantauan"
                            horizontal
                            :lbel-cols="3"
                            class="p-1">
                <b-form-input v-model="resiko.pemantauan" type="text">
                </b-form-input>
              </b-form-group>
            </b-form>
          </b-card>
        </b-form>
      </b-card>
    </b-form>
  </div>
</template>
<script>
export default {
  props: ['indikators', 'tujuanName'],
  name: 'ResikoForm',
  data() {
    return {
      pengukuran_kemungkinan_map: {
        1: 'Sangat Jarang',
        2: 'Jarang',
        3: 'Kadang - kadang/ mungkin',
        4: 'Hampir Pasti',
        5: 'Sering'
      },
      pengukuran_dampak_map: {
        0: '',
        1: 'Sangat Rendah',
        2: 'Kecil',
        3: 'Menengah/Medium/Moderat',
        4: 'Besar',
        5: 'Sangat Besar/Katastropik'
      },
      pengukuran_kemungkinan_options: [
        {'value': 1, 'text': 'Sangat Jarang'},
        {'value': 2, 'text': 'Jarang'},
        {'value': 3, 'text': 'Kadang - kadang/ mungkin'},
        {'value': 4, 'text': 'Hampir Pasti'},
        {'value': 5, 'text': 'Sering'}
      ],
      pengukuran_dampak_options: [
        {'value': 1, 'text': 'Sangat Rendah'},
        {'value': 2, 'text': 'Kecil'},
        {'value': 3, 'text': 'Menengah/Medium/Moderat'},
        {'value': 4, 'text': 'Besar'},
        {'value': 5, 'text': 'Sangat Besar/Katastropik'}
      ],
      status_resiko_map: []
    };
  },
  created(){
    let indikators = this.indikators
    var self = this
    indikators.map(function(indikator) {
      let kegiatans = indikator.kegiatans
      kegiatans.map(function(kegiatan) {
        let resiko_kegiatan = kegiatan.resiko_kegiatan
        resiko_kegiatan.map(function(rk) {
          if (rk.pengukuran_kemungkinan !== '' && rk.pengukuran_kemungkinan !== undefined) {
            for (let key in self.pengukuran_kemungkinan_map) {
              if (self.pengukuran_kemungkinan_map[key] === rk.pengukuran_kemungkinan) {
               rk['pengukuran_kemungkinan_key'] = key
              }
            }
          }
          if (rk.pengukuran_dampak !== '' && rk.pengukuran_dampak !== undefined) {
            for (let key in self.pengukuran_dampak_map) {
              if (self.pengukuran_dampak_map[key] === rk.pengukuran_dampak) {
               rk['pengukuran_dampak_key'] = key
              }
            }
          }
        })
      })
    })
  },
  methods: {
    add(idx, kgidx) {
      console.log('here', this.indikators[idx].kegiatans[kgidx]);
      const data_resiko = {
        id: '',
        sumber_resiko: '',
        kategori_resiko: '',
        resiko: '',
        penyebab_resiko: '',
        dampak_resiko: '',
        pengendalian_uraian: '',
        pengendalian_kategori: '',
        resiko_residual: '',
        pemilik_resiko: '',
        pengukuran_kemungkinan_key: 0,
        pengukuran_kemungkinan: '',
        pengukuran_dampak_key: 0,
        pengukuran_dampak: '',
        pengukuran_status_resiko: '',
        level_resiko: '',
        peringkat_resiko: '',
        rtp: '',
        penanggung_jawab: '',
        target_waktu: '',
        komunikasi: '',
        pemantauan: '',
      };
      this.indikators[idx].kegiatans[kgidx].resiko_kegiatan.push(data_resiko);
    },
    remove(idx, kgidx, r_idx) {
      this.indikators[idx].kegiatans[kgidx].resiko_kegiatan.splice(r_idx, 1);
    },
    calculateST(resiko) {
      if (resiko.pengukuran_kemungkinan_key == '' && resiko.pengukuran_dampak_key == '') {
        alert('warning');
      } 
      resiko.pengukuran_kemungkinan = this.pengukuran_kemungkinan_map[resiko.pengukuran_kemungkinan_key]
      resiko.pengukuran_dampak = this.pengukuran_dampak_map[resiko.pengukuran_dampak_key]
      const pengukuran_kemungkinan = resiko.pengukuran_kemungkinan_key * resiko.pengukuran_dampak_key
      resiko.pengukuran_status_resiko = pengukuran_kemungkinan
      
    },
    number(idx) {
      return idx + 1
    }
  },
};
</script>
<style type="text/css">
  .panel-footer {
    text-align: right !important;
  }
  .panel-success {
    margin-left: 10%;
    margin-right: auto;
  }
  .hidden {
    visibility: hidden;
  }
</style>
