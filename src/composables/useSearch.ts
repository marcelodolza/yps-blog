import useBaseApi from "~/composables/useBaseApi";

const term = ref("");
const termDebounced = ref("");
const debounce = ref<ReturnType<typeof setTimeout> | null>(null);
const isFocused = ref(false);
const isTyping = ref(false);
const isAllowed = computed(() => term.value.length > 2);

const useSearch = () => {
  const { data, loading, baseFetch } = useBaseApi();

  const focusOut = () => {
    isFocused.value = !isFocused.value;
    term.value = "";
    termDebounced.value = "";
  };

  const changeTerm = () => {
    if (debounce.value) clearTimeout(debounce.value);
    isTyping.value = true;
    debounce.value = setTimeout(() => {
      isTyping.value = false;
      termDebounced.value = term.value;
    }, 500);
  };

  return {
    term,
    termDebounced,
    debounce,
    isFocused,
    isTyping,
    isAllowed,
    changeTerm,
    focusOut,
    data,
    loading,
    baseFetch: (term: string) =>
      baseFetch(`/Articles?search=${term}&page=1&limit=10`),
  };
};

export default useSearch;
