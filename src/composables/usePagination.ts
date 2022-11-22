import useBaseApi from "~/composables/useBaseApi";

const useSearch = () => {
  const { data, loading, baseFetch } = useBaseApi();

  return {
    data,
    loading,
    baseFetch: (term: string) => baseFetch(`/Articles?search=${term}&limit=10`),
  };
};

export default useSearch;
