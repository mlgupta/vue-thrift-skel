import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// Log uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Unhandled exception:', err);
    // Optionally, exit the process if the error is critical
    process.exit(1);
});
  
// Log unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at:', promise, 'reason:', reason);
    // Optionally, exit the process if the rejection is critical
    process.exit(1);
});

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app') 