import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount('#app');

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/serviceworker.js').then(
		registration => {
			console.log('success!');
			if (registration.installing) {
				registration.installing.postMessage('Howdy from your installing page.');
			}
		},
		err => {
			console.error('Installing the worker failed!', err);
		}
	);
}

import 'bootstrap/dist/js/bootstrap.min.js';
