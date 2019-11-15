export const isSupport = key => {
  return key in window;
};

/**预加载图片 */
export const cacheImageFactory = () => {
  const savaImage = [];
  return function(imgs, options = {}) {
    const { key = '', addPath = '' } = options;
    if (Array.isArray(imgs)) {
      imgs.forEach(img => {
        const image = new Image();
        savaImage.push(image);
        image.src = key ? `${img[key]}${addPath}` : `${img}${addPath}`;
      });
    } else {
      const image = new Image();
      savaImage.push(image);
      image.src = key ? `${imgs[key]}${addPath}` : `${imgs}${addPath}`;
    }
  };
};
