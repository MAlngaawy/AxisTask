import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Image } from '@mantine/core';
import { useEffect, useState } from 'react';

type Props = {
  img: string;
};

const ShowImageBtn = ({ img }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    // Fetch the photo only when the modal is opened and no photo has been loaded yet
    if (opened && !photo && img) {
      fetch(`http://localhost:3000/flights/${img}/photo`)
        .then((res) => res.blob())
        .then((data) => {
          const url = URL.createObjectURL(data);
          setPhoto(url);
        })
        .catch((error) => console.error('Error fetching image:', error));
    }
  }, [opened, img, photo]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Flight Image">
        <Image radius="md" src={photo} />
      </Modal>

      <Button disabled={!img} onClick={open}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
          <path d="M12 13l2 2 4-4" />
          <circle cx="8" cy="8" r="2" />
        </svg>
      </Button>
    </>
  );
};

export default ShowImageBtn;
