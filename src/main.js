import { createApp } from "vue";
import "@/style/style.scss";
import App from "@/App.vue";
// 引入 pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
import vue3PhotoPreview from "vue3-photo-preview";
import "vue3-photo-preview/dist/index.css";

app.use(pinia);
app.use(vue3PhotoPreview);
app.mount("#app");

// PWA
navigator.serviceWorker.addEventListener("controllerchange", () => {
  // 弹出更新提醒
  ElMessage("站点已更新，刷新后生效");
});
