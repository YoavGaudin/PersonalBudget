<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>

<script>
  import firebase from 'firebase';
  import * as firebaseui from 'firebaseui'

  export default {
    name: 'Login',
    mounted() {
      const uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
      };
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    },
  }
</script>
