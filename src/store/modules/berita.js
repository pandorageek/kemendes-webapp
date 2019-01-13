import { getListBerita, getBerita, postBerita, getTitlesBerita, deleteBerita } from '@/api/berita';
import router from '@/router';

const state = {
  listBerita: [],
  beritaTitles: [],
  berita: {},
  is_uploaded: false,
};

const mutations = {
  LIST_BERITA: (state, res) => {
    state.listBerita = res;
  },
  TITLES_BERITA: (state, res) => {
    state.beritaTitles = res;
  },
  GET_BERITA: (state, res) => {
    state.berita = res;
  },
  UPLOAD_BERITA: (state, res) => {
    state.is_uploaded = true;
  },
};

const actions = {
  async fetchListBerita(context) {
    const res = await getListBerita();
    context.commit('LIST_BERITA', res);
  },
  async fetchTitlesBerita(context) {
    const res = await getTitlesBerita();
    context.commit('TITLES_BERITA', res);
  },
  async fetchBerita(context, berita_id) {
    const res = await getBerita(berita_id);
    console.log('berita', res);
    context.commit('GET_BERITA', res);
  },
  async uploadBerita(context, formData) {
    const res = await postBerita(formData);
    console.log('upload berita', res);
    context.commit('UPLOAD_BERITA', res);
    router.push('/admin/berita/list');
  },
  async removeBerita(context, berita_id) {
    const res = await deleteBerita(berita_id);
    router.push('/admin/berita/list');
  }
};

const getters = {
  listBerita(state) {
    console.log('getters', state.listBerita);
    return state.listBerita;
  },
  berita(state) {
    return state.berita;
  },
  isUploaded(state) {
    return state.is_uploaded;
  },
};

export default { state, mutations, actions, getters };
