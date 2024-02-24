import { createApp } from "vue";

import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import { router } from "./routing";

// Import your components for routing

// Create the Vue app and use the router
const app = createApp(App);

app.use(router);
app.use(Quasar, quasarUserOptions);

app.mount("#app");
