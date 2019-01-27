import { getListUser,
         getUser,
         postUser,
         getListRole,
         getListStrukturJabatan } from '@/api/user';
import router from '@/router';

const state = {
  listUser: [],
  userData: {},
  listRole: [],
  strukturJabatan: {},
  optJabatan: [],
  optDirektorat: [],
};

const mutations = {
  listUser: (state, res) => {
    state.listUser = res;
  },
  user: (state, res) => {
    if (res.role) {
      res.role = res.role.$oid;
    }
    state.userData = res;
  },
  listRole: (state, res) => {
    let optRole = [];
    for (const role of res) {
      optRole.push({ value: role._id.$oid, text: role.name });
    }
    state.listRole = optRole;
  },
  strukturJabatan: (state, res) => {
    state.strukturJabatan = res;
  },
};

const actions = {
  async fetchListUser(context) {
    const res = await getListUser();
    context.commit('listUser', res);
  },
  async fetchUser(context, user_id) {
    const res = await getUser(user_id);
    context.commit('user', res);
  },
  async fetchListRole(context) {
    const res = await getListRole();
    context.commit('listRole', res);
  },
  async createUser(context, formData) {
    const res = await postUser(formData);
    context.commit('user', res);
    router.push('/admin/user/list');
  },
  async fetchListStrukturJabatan(context) {
    const res = await getListStrukturJabatan();
    context.commit('strukturJabatan', res);
  },
  getDirektoratOptbyJabatan(context, jabatan) {
    context.commit('listDirektoratbyJabatan', jabatan)
  }
};

const getters = {
  listUser(state) {
    return state.listUser;
  },
  userData(state) {
    return state.userData;
  },
  listRole(state) {
    return state.listRole;
  },
  strukturJabatan(state) {
    return state.strukturJabatan;
  },
  optJabatan(state) {
    return state.strukturJabatan.jabatan
  },
  optDirektorat(state) {
    let options = []
    return state.strukturJabatan.direktorats
  }
};

export default { state, mutations, actions, getters };
