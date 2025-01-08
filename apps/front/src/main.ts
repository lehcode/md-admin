import { createApp } from 'vue';
import router from './router';

// Import Quasar
import { Quasar, Dialog, Loading, Notify } from 'quasar';

// Import styles
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import 'quasar/dist/quasar.css';
import './scss/app.scss';

import App from './app/App.vue';

const app = createApp(App);

app.use(Quasar, {
  plugins: {
    Dialog,
    Loading,
    Notify
  }
});

app.use(router);
app.mount('#root');
