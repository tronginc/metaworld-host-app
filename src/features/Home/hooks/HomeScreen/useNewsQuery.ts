import { useQuery } from '@tanstack/react-query';
import { waitAsync } from '@utils/fn';

const useNewsQuery = () => {
  const LIMIT = 8;
  return useQuery(['news'], async () => {
    await waitAsync(1000);
    return [
      {
        id: 1,
        title: 'Earning while running',
        description: 'Next generation walk earning wile running',
        thumbnail: 'https://i.ibb.co/qDxsH6j/news-1.png',
      },
      {
        id: 2,
        title: 'Earning while running',
        description: 'Next generation walk earning wile running',
        thumbnail: 'https://i.ibb.co/grDvnNk/news-2.png',
      },
      {
        id: 3,
        title: 'Earning while running',
        description: 'Next generation walk earning wile running',
        thumbnail: 'https://i.ibb.co/RcqFp01/news-3.png',
      },
      {
        id: 4,
        title: 'Earning while running',
        description: 'Next generation walk earning wile running',
        thumbnail: 'https://i.ibb.co/L9QhFFB/news-4.png',
      },
    ];
  });
};

export default useNewsQuery;
