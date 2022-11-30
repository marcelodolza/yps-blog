const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(date);
};

const scrollTo = (el: HTMLElement, container: HTMLElement) => {
  if (el.offsetTop < container.scrollTop) container.scrollTop = el.offsetTop;
  else {
    const offsetBottom = el.offsetTop + el.offsetHeight;
    const scrollBottom = container.scrollTop + container.offsetHeight;
    if (offsetBottom > scrollBottom)
      container.scrollTop = offsetBottom - container.offsetHeight;
  }
};

export { formatDate, scrollTo };
