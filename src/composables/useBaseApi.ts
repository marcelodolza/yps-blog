import { ref } from "vue";

const api = $fetch.create({
  baseURL: String(import.meta.env.VITE_API_URL),
});

const useBaseApi = () => {
  const loading = ref(true);
  const data = ref();

  const baseFetch = async (url: string, options = {}) => {
    loading.value = true;

    return await api(url, options).then((body) => {
      loading.value = false;
      data.value = body;
      return body;
    });
  };

  return {
    data,
    loading,
    baseFetch,
  };
};

export default useBaseApi;
