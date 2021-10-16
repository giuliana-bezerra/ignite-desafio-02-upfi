import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [imgUrl, setImgUrl] = useState('');

  function handleViewImage(url: string): void {
    onOpen();
    setImgUrl(url);
  }

  return (
    <>
      <SimpleGrid columns={3} gap="40px">
        {cards.map(card => (
          <>
            <Card data={card} viewImage={handleViewImage} />
          </>
        ))}
      </SimpleGrid>
      <ModalViewImage isOpen={isOpen} imgUrl={imgUrl} onClose={onClose} />
    </>
  );
}
