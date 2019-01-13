<template>
  <div class="rencana-kerja-edit">
    <div class="container text-left">
      <br>
      <div class="row">
        <div class="col-sm-12 linkapp-container">
          <div class="container text-left">
            <br>
            <div class="row">
              <div class="col-sm-12 linkapp-container">
                <div class="panel panel-success">
                  <TujuanForm v-if="step == 0" :tujuan="tujuan"/>
                  <IndikatorForm v-if="step == 1"
                                 :indikators="tujuan.indikators"
                                 :tujuanName="tujuan.name"/>
                  <KegiatanForm v-if="step == 2"
                                 :indikators="tujuan.indikators"
                                 :tujuanName="tujuan.name"/>
                  <ResikoForm v-if="step == 3"
                                 :indikators="tujuan.indikators"
                                 :tujuanName="tujuan.name"/>
                  <div class="panel-footer">
                    <!-- <div class="btn-group" style="padding: 20px"> -->
                      <button v-if="step > 0"
                              type="button"
                              class="btn btn-info"
                              v-on:click="back()">Back
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <button v-if="step < 3"
                              type="button"
                              class="btn btn-info"
                              v-on:click="next()">Next</button>
                      &nbsp;
                      <button v-if="step == 3"
                              type="button"
                              class="btn btn-success"
                              v-on:click="save()">Save</button>
                    <!-- </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TujuanForm from '@/components/AdminPage/RencanaKerja/Form/TujuanForm';
import IndikatorForm from '@/components/AdminPage/RencanaKerja/Form/IndikatorForm';
import KegiatanForm from '@/components/AdminPage/RencanaKerja/Form/KegiatanForm';
import ResikoForm from '@/components/AdminPage/RencanaKerja/Form/ResikoForm';
import { mapGetters } from 'vuex';
import { base_url } from '@/store/config';
import router from '@/router';
 import swal from 'sweetalert';

export default {
  props: ['tujuanId'],
  components: { TujuanForm, IndikatorForm, KegiatanForm, ResikoForm },
  name: 'RencanaKerjaEdit',
  data() {
    return {
      step: 0,
    };
  },
  created() {
    if (this.tujuanId != '1') {
      this.$store.dispatch('getTujuan', this.tujuanId);
      console.log('tujuan');
    }
  },
  methods: {
    next() {
      let validation = this.validate(this.step)
      console.log('validation', validation)
      if (!validation.is_valid) {
        swal({
          title:'INVALID!',
          text: validation.message,
          icon: 'error',
          button: 'OK',
        }).then(name => {
          console.log('step', this.step)
          this.step = this.step;
        });
      } else {
        this.step += 1
      }
    },
    back() {
      this.step -= 1;
    },
    validate(step) {
      const self = this
      const indikators = self.tujuan.indikators;
      let result ={'is_valid': false, 'message': ''}
      if (step === 0) {
        if (self.tujuan.name === '' || self.tujuan.name === undefined){
          return {'is_valid': false, 'message': 'nama tujuan tidak boleh kosong!!'}
        } else if (self.tujuan.unit_pemilik_resiko === '' || self.tujuan.unit_pemilik_resiko === undefined){
          return {'is_valid': false, 'message': 'unit pemilik resiko tidak boleh kosong!!'}
        } else if (self.tujuan.unit_eselon === '' || self.tujuan.unit_eselon === undefined){
          return {'is_valid': false, 'message': 'unit eselon tidak boleh kosong!!'}
        } else if (self.tujuan.periode === '' || self.tujuan.periode === undefined){
          return {'is_valid': false, 'message': 'periode tidak boleh kosong!!'}
        } else if (self.tujuan.kegiatan === '' || self.tujuan.kegiatan === undefined){
          return {'is_valid': false, 'message': 'kegiatan tidak boleh kosong!!'}
        }else {
          return {'is_valid': true, 'message': ''}
        }
      }
      else if (step === 1) {
        let idk_name = []
        indikators.map(function(indikator) {
          if (indikator.name === '') {
            idk_name.push(false)
          } else {
            idk_name.push(true)
          }
        })
        if (idk_name.indexOf(false) !== -1){
          return {'is_valid': false, 'message': 'nama indikator tidak boleh kosong'}
        } else {
          return {'is_valid': true, 'message': ''}
        }
      } else if (step === 2){
        let idk_kegiatan = []
        let kg_name = []
        indikators.map(function(indikator) {
          const kegiatans = indikator.kegiatans
          if (indikator.kegiatans.length == 0) {
            idk_kegiatan.push(false)
          } else {
            kegiatans.map(function(kegiatan) {
              if (kegiatan.name === '') {
                kg_name.push(false)
              } else {
                kg_name.push(true)
              } 
            })
          }
        });
        if (idk_kegiatan.indexOf(false) !== -1){
          return {'is_valid': false, 'message': 'indikator harus memiliki minimal 1 kegiatan'}
        } else if (kg_name.indexOf(false) !== -1) {
          return {'is_valid': false, 'message': 'nama kegiatan tidak boleh kosong!!'}
        } else {
          return {'is_valid': true, 'message': ''}
        }
      } else if (step === 3){
        let kg_rk = []
        let rk_name = []
        indikators.map(function(indikator) {
          const kegiatans = indikator.kegiatans
          kegiatans.map(function(kegiatan) {
            const resiko_kegiatan = kegiatan.resiko_kegiatan
            if (kegiatan.resiko_kegiatan.length === 0) {
              kg_rk.push(false)
            } else {
              resiko_kegiatan.map(function(rk) {
                if (rk.sumber_resiko === '') {
                  rk_name.push(false)
                } else {
                  rk_name.push(true)
                }
              });
            }
          })
        });
        if (kg_rk.indexOf(false) !== -1){
          return {'is_valid': false, 'message': 'kegiatan harus memiliki minimal 1 resiko'}
        } else if (rk_name.indexOf(false) !== -1) {
          return {'is_valid': false, 'message': 'sumber_resiko tidak boleh kosong!!'}
        } else {
          return {'is_valid': true, 'message': ''}
        }
      }
    },
    save() {
      let validation_step3 = this.validate(this.step)
      console.log('validation save', validation_step3)
      if (validation_step3.is_valid){
        console.log(JSON.stringify(this.tujuan));
        const header = new Headers({
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          mode: 'no-cors',
        });
        const opt = {
          method: 'POST',
          headers: header,
          body: JSON.stringify(this.tujuan),
        };
        fetch(`${base_url}/rencana-kerja`, opt)
          .then((response) => {
            if (response.status == 200) {
              console.log(response);
              return response.json();
            }
          }).then((res) => {
            console.log(res);
            router.push(`/admin/rencana-kerja/detail/${res.tujuan_id}`);
          }).catch((err) => {
            console.log('err', err);
          });
      } else {
        swal({
          title:'INVALID!',
          text: validation_step3.message,
          icon: 'error',
          button: 'OK',
        }).then(name => {
          console.log('step', this.step)
          this.step = this.step;
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      tujuan: 'tujuan',
      riskFormList: 'riskFormList',
    }),
  },
};
</script>
<style type="text/css">
  .sub-field {
    padding: 10px;
  }
</style>
