import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Image } from '@mantine/core';

type Props = {
  img: string;
};

const ShowImageBtn = ({ img }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Flight Image">
        <Image radius="md" src={img} />
      </Modal>

      <Button disabled={!img} onClick={open}>
        Open modal
      </Button>
    </>
  );
};

export default ShowImageBtn;
