import { useQuery } from '@tanstack/react-query';
import { waitAsync } from '@utils/fn';

const useProductsQuery = () => {
  const LIMIT = 8;
  return useQuery(['products'], async () => {
    await waitAsync(1000);
    return [
      {
        id: 1,
        name: 'Pindias',
        icon: require('@assets/images/products/pindias.png'),
      },
      {
        id: 2,
        name: 'Divega',
        icon: require('@assets/images/products/divega.png'),
      },
      {
        id: 3,
        name: 'Hyperas',
        icon: require('@assets/images/products/hyperas.png'),
      },
      {
        id: 4,
        name: 'Vitala',
        icon: require('@assets/images/products/vitala.png'),
      },
      {
        id: 5,
        name: 'EduTech',
        icon: require('@assets/images/products/edutech.png'),
      },
      {
        id: 6,
        name: 'Mining',
        icon: require('@assets/images/products/mining.png'),
      },
      {
        id: 7,
        name: 'Meta 3D',
        icon: require('@assets/images/products/meta3d.png'),
      },
      {
        id: 8,
        name: 'Rapital Bank',
        icon: require('@assets/images/products/rapital_bank.png'),
      },
    ];
  });
};

export default useProductsQuery;
