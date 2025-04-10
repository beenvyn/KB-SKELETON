import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore(
  'user',
  () => {
    const id = ref('');
    const username = ref('');
    const name = ref('');
    const birth = ref('');
    const gender = ref('');
    const isLoggedIn = ref(false);

    function setUserInfo(userData) {
      id.value = userData.id;
      name.value = userData.name;
      username.value = userData.username;
      birth.value = userData.birth;
      gender.value = userData.gender;
      isLoggedIn.value = true;
    }

    function logout() {
      id.value = '';
      name.value = '';
      username.value = '';
      birth.value = '';
      gender.vlaue = '';
      isLoggedIn.value = false;
    }

    return {
      id,
      name,
      username,
      birth,
      gender,
      isLoggedIn,
      setUserInfo,
      logout,
    };

    // return { count, doubleCount, increment, decrement };
  },
  {
    persist: true,
  }
);

// // store/userStore.js
// import { defineStore } from 'pinia';

// export const useUserStore = defineStore('user', {
//   state: () => ({
//     id: '',
//     name: '',
//     username: '',
//     birth: '',
//     gender: '',
//     isLoggedIn: false,
//   }),
//   actions: {
//     setUser(userData) {
//       this.id = userData.id;
//       this.name = userData.name;
//       this.username = userData.username;
//       this.birth = userData.birth;
//       this.gender = userData.gender;
//       this.isLoggedIn = true;
//     },
//     logout() {
//       this.id = '';
//       this.name = '';
//       this.username = '';
//       this.birth = '';
//       this.gender = '';
//       this.isLoggedIn = false;
//     },
//   },
// });
