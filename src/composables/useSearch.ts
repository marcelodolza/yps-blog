import useBaseApi from "~/composables/useBaseApi";
import { scrollTo } from "~/utils";
import { Article } from "~/types";

const term = ref("");
const termDebounced = ref("");
const debounce = ref<ReturnType<typeof setTimeout> | null>(null);
const isFocused = ref(false);
const isTyping = ref(false);
const isAllowed = computed(() => term.value.length > 2);
const articles = ref<Article[]>();
const activeArticleIndex = computed(() =>
  articles.value ? articles.value.findIndex((article) => article?.active) : -1
);

const useSearch = () => {
  const route = useRoute();
  const router = useRouter();
  const { data, loading, baseFetch } = useBaseApi();

  const updateTerm = () => {
    if (debounce.value) clearTimeout(debounce.value);
    isTyping.value = true;
    debounce.value = setTimeout(() => {
      isTyping.value = false;
      termDebounced.value = term.value;
    }, 500);
  };

  const focusIn = () => (isFocused.value = true);

  const focusOut = () => {
    isFocused.value = false;
    term.value = "";
    termDebounced.value = "";
  };

  const focusOutInput = () => {
    if (!articles.value?.length) return;

    const index =
      activeArticleIndex.value !== -1 ? activeArticleIndex.value : 0;

    articles.value[index].active = false;
  };

  const moveUp = () => {
    if (!articles.value?.length) return;

    const index = activeArticleIndex.value;

    if (index < 1) return;

    articles.value[index].active = false;
    articles.value[index - 1].active = true;

    moveScroll();
  };

  const moveDown = async () => {
    await nextTick();

    if (!articles.value?.length) return;

    const index = activeArticleIndex.value;

    if (index + 1 >= articles.value.length) return;

    if (index >= 0) articles.value[index].active = false;
    articles.value[index + 1].active = true;

    moveScroll();
  };

  const openActiveArticle = async () => {
    if (!articles.value || activeArticleIndex.value < 0) return;

    const activeArticle = articles.value[activeArticleIndex.value];

    if (!activeArticle) return;

    await router.push({ path: `/article/${activeArticle.id}` });
    isFocused.value = true;
  };

  const moveScroll = async () => {
    await nextTick();
    const el = document.querySelector(".CardArticle--active") as HTMLElement;
    const container = document.querySelector(".SearchResult") as HTMLElement;
    if (typeof el !== "undefined") scrollTo(el, container);
  };

  const getResult = async (page = 1, limit = 10) => {
    await baseFetch(
      `/Articles?search=${termDebounced.value}&page=${page}&limit=${limit}`
    );

    articles.value = data.value.map((article: Article) => ({
      ...article,
      active: false,
    }));
  };

  watch(termDebounced, () => (termDebounced.value.length ? getResult() : null));
  watch(isFocused, () => (!isFocused.value ? (articles.value = []) : null));
  watch(
    () => route.params.id,
    (newId) => (newId && isFocused.value ? focusOut() : null)
  );

  return {
    term,
    termDebounced,
    debounce,
    isFocused,
    isTyping,
    isAllowed,
    articles,
    loading,
    updateTerm,
    focusIn,
    focusOut,
    focusOutInput,
    moveUp,
    moveDown,
    openActiveArticle,
    getResult,
  };
};

export default useSearch;
