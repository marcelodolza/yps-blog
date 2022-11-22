const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(date);
};

export { formatDate };
