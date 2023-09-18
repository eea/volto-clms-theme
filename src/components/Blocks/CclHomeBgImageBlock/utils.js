export const HomeBgImg = ({ url, alt }) => {
  return (
    <img
      src={
        `${url}/@@images/image/huge` ||
        'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg'
      }
      srcSet={`${url}/@@images/image/huge4000 4000w,
                ${url}/@@images/image/huge3000 3000w,
                ${url}/@@images/image/huge2400 2400w,
                ${url}/@@images/image/huge 1600w,
                ${url}/@@images/image/great 1200w,
                ${url}/@@images/image/larger 1000w,
                ${url}/@@images/image/large 800w,
                ${url}/@@images/image/teaser 600w,
                `}
      alt={alt}
    />
  );
};
