export default function pageVisibility(pageVisibile, cssUtils) {
  const togglePageVisiblity = () => {
    const hidden =
      document.hidden || document.webkitHidden || document.msHidden;
    const visibility =
      document.visibilityState ||
      document.webkitVisibilityState ||
      document.msVisibilityState;
    const documentHidden = !!hidden || /^hidden/i.test(visibility);
    const toggleVisibility = (value) => {
      pageVisibile = value;
    };

    if (documentHidden) {
      toggleVisibility(false);
    } else {
      toggleVisibility(true);
      cssUtils();
    }
  };

  togglePageVisiblity();

  if (!pageVisibility.eventAdded) {
    pageVisibility.eventAdded = true;

    document.addEventListener("visibilitychange", togglePageVisiblity);
  }
}
