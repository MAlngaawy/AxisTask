import { Button, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDeleteFlightMutation } from '../../services/apiSlice';
import { notifications } from '@mantine/notifications';
import classes from '../../assets/notifications.module.css';

type Props = {
  flightId: string;
};

const DeleteFlightBtn = ({ flightId }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteFlight] = useDeleteFlightMutation();
  const deleteFlightFunc = async () => {
    deleteFlight({ id: flightId }).then((res) => {
      if (res.error) {
        notifications.show({
          message: 'Sorry, somthing went wrong',
          bg: 'red',
          classNames: classes,
        });
      } else {
        notifications.show({
          message: 'Flight Deleted Successfully',
          bg: 'green',
          classNames: classes,
        });
      }
      close();
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Confirmation">
        <div className="flex p-5 items-center justify-center flex-col gap-4">
          <Text>Are you sure you want to delete this flight</Text>
          <div className="flex gap-5">
            <Button color="red" onClick={() => deleteFlightFunc()}>
              Yes, delete
            </Button>
            <Button onClick={() => close()} variant="default">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <Button color="red" onClick={open}>
        Delete
      </Button>
    </>
  );
};

export default DeleteFlightBtn;
