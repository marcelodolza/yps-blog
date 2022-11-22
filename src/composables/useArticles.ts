import { Article } from "~/types";
import useBaseApi from "~/composables/useBaseApi";

const { data, loading, baseFetch } = useBaseApi();

const articles = ref<Article[] | []>([]);

const useArticles = () => {
  const latestArticle = computed(() => [...articles.value].pop());

  const getAll = async () => {
    await baseFetch("/Articles");

    articles.value = data.value;
  };

  const getArticles = async (page = 1, limit = 16) => {
    await baseFetch(`/Articles?page=${page}&limit=${limit}`);

    articles.value = data.value;
  };

  const getArticle = (id: string) => {
    const { data, loading, baseFetch } = useBaseApi();

    return {
      article: data,
      loading,
      baseFetch: baseFetch(`/Articles/${id}`),
    };
  };

  return {
    loading,
    articles,
    latestArticle,
    getAll,
    getArticle,
    getArticles,
  };
};

export default useArticles;
