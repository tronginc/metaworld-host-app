import { useQuery } from '@tanstack/react-query';

const useHomeCarouselDataQuery = () => {
  return useQuery(['home-carousel-data'], async () => {
    return [
      {
        id: 1,
        image: 'https://imageupload.io/ib/Gd6IKdlO2jhZmJR_1692176664.png',
      },
      {
        id: 2,
        image: 'https://imageupload.io/ib/Gd6IKdlO2jhZmJR_1692176664.png',
      },
      {
        id: 3,
        image: 'https://imageupload.io/ib/Gd6IKdlO2jhZmJR_1692176664.png',
      },
    ];
  });
};

export default useHomeCarouselDataQuery;
