
export const loadimages = async() => {
  const urlImage = 'https://pixabay.com/api/?key=13764134-3a50a958250bae096f4e79b1b&q=yellow+flowers&image_type=photo  ';
  const responseImages = await fetch(urlImage);
  const images = await responseImages.json();

  return images;
};
