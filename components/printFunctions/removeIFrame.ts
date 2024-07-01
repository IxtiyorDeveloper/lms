export const removeIFrame = (iframe: HTMLIFrameElement) => {
  setTimeout(() => {
    iframe.remove();
  }, 1000);
};
