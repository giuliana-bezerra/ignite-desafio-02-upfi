import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Image src={imgUrl} />
        <Link
          title="Abrir original"
          href={imgUrl}
          mt={2.5}
          fontSize="md"
          bgColor="pGray.800"
        >
          Abrir original
        </Link>
      </ModalContent>
    </Modal>
  );
}
