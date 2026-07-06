export function buildGalleryImages(context) {
  return context.keys().map((key) => {
    const filename = key.slice(2);
    const title = key.slice(2, -4);
    return {
      filename,
      title,
      alt: title,
      src: context(key),
    };
  });
}
