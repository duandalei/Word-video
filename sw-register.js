/* 注册 Service Worker（离线缓存）。sw.js 放在站点根目录，作用域覆盖整个站点。 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).catch(function () {});
  });
}
