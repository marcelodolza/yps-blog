export default defineNuxtConfig({
  srcDir: "src",
  modules: [],
  typescript: {
    strict: true,
  },
  css: ["bootstrap/dist/css/bootstrap.min.css", "~/assets/styles/main.scss"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
