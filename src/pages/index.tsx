import { Box, Button } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { CardList } from '../components/CardList';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../services/api';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = 0 }) => {
      const response = await api.get('/api/images', {
        params: { after: pageParam },
      });
      return response.data;
    },
    {
      getNextPageParam: res => res.after,
    }
  );

  console.log('Data sem formatacao:', data);

  const formattedData = useMemo(
    () => data?.pages.flatMap(page => page.data.flat()),
    [data]
  );

  function handleLoadMore(): void {
    fetchNextPage();
  }

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button onClick={handleLoadMore}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
