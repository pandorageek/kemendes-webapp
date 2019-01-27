import swal from 'sweetalert';
import api from './index';

const getListUser = async function () {
  const { data: ListUser } = await api.get('/list-user');
  return ListUser;
};

const getUser = async function (user_id) {
  const { data: user } = await api.get(`/user/${user_id}`);
  return user;
};

const postUser = async function (formData) {
  try {
    const { data: user } = await api.post('post-user', formData);
    return user;
  } catch (error) {
    console.log(error.message);
    swal({
      title: 'Error Saving User',
      text: error.message,
      icon: 'error',
      button: 'OK',
    });
  }
};

const getListRole = async function () {
  const { data: ListRole } = await api.get('/list-role');
  return ListRole;
};

const getListStrukturJabatan = async function () {
  const { data: ListStrukturJabatan } = await api.get('/list-strukturjabatan');
  return ListStrukturJabatan;
};

export { getListUser, getUser, postUser, getListRole, getListStrukturJabatan };
