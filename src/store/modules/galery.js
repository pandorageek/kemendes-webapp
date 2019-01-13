import { getListGalery, getGalery, postGalery, deleteGalery } from '@/api/galery';
import router from '@/router';

const state = {
  listGalery: [],
  galery: {},
};

const mutations = {
  listGalery: (state, res) => {
    state.listGalery = res;
  },
  galery: (state, res) => {
    state.galery = res;
  },
};

const actions = {
  async fetchListGalery(context) {
    const res = await getListGalery();
    context.commit('listGalery', res);
  },
  async fetchGalery(context, image_id) {
    const res = await getGalery(image_id);
    context.commit('galery', res);
  },
  async uploadGalery(context, formData) {
    const res = await postGalery(formData);
    // context.commit('isVideoUploaded', res)
    router.push('/admin/galery/list');
  },
  async removeGalery(context, image_id) {
    const res = await deleteGalery(image_id);
  }
};

const getters = {
  listGalery(state) {
    return state.listGalery;
  },
  galery(state) {
    return state.galery;
  },
};

export default { state, mutations, actions, getters };
