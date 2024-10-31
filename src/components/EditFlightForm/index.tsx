import {
  Button,
  FileInput,
  Image,
  Modal,
  NumberInput,
  // Switch,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  useUpdateFlightMutation,
  useUpdateFlightWithPhotoMutation,
} from '../../services/apiSlice';
import { useEffect, useState } from 'react';
import { date, mixed, number, object, string } from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { notifications } from '@mantine/notifications';
import classes from '../../assets/notifications.module.css';
import { DateInput } from '@mantine/dates';
import { Flight } from '../../types';
import { blobToFile } from '../../AppUtils';

type Props = {
  flightData: Flight;
};

export type Inputs = {
  code: string;
  capacity: number;
  departureDate: Date;
  photo?: File | null | undefined;
};

const EditFlightForm = ({ flightData }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [oldImage, setOldImage] = useState<boolean | string>(false);
  const withPhoto = !!flightData?.img;
  const [preview, setPreview] = useState<string | null>(null);
  const [updateFlight] = useUpdateFlightMutation();
  const [updateFlightWithPhoto] = useUpdateFlightWithPhotoMutation();

  const validationSchema = object().shape({
    code: string().min(6).max(6).required(),
    capacity: number().min(1).max(200).required(),
    departureDate: date().required(),
    photo: mixed<File>()
      .nullable()
      .when('$withPhoto', {
        is: true,
        then: (schema) => schema.required('Photo is required'),
        otherwise: (schema) => schema.notRequired(),
      }),
  });

  const {
    // reset,
    watch,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      code: flightData?.code,
      capacity: flightData?.capacity,
      departureDate: new Date(flightData?.departureDate),
    },
    resolver: yupResolver(validationSchema),
    context: { withPhoto },
  });

  //? Preview Image Code
  const selectedFile = watch('photo');
  useEffect(() => {
    if (selectedFile instanceof File) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // Cleanup
    } else {
      setPreview(null); // Clear preview if no file is selected
    }
  }, [selectedFile]);

  useEffect(() => {
    // Fetch the photo only when the modal is opened
    if (opened && flightData?.img) {
      fetch(`http://localhost:3000/flights/${flightData?.id}/photo`)
        .then((res) => res.blob())
        .then((data) => {
          const url = URL.createObjectURL(data);
          const file = blobToFile(data, 'filename');
          setValue('photo', file);
          setOldImage(url);
        })
        .catch((error) => console.error('Error fetching image:', error));
    }
  }, [opened, flightData, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const trnsfareDate = data.departureDate.toISOString().split('T')[0];

    const addFunc = withPhoto ? updateFlightWithPhoto : updateFlight;

    const formData = new FormData();
    formData.append('code', data.code);
    formData.append('capacity', data.capacity.toString());
    formData.append('departureDate', trnsfareDate);
    if (data.photo) {
      formData.append('photo', data.photo);
    }

    addFunc({
      //@ts-expect-error departureDate expexct to be date
      data: withPhoto ? formData : { ...data, departureDate: trnsfareDate },
      flightId: flightData?.id,
    }).then((res) => {
      if (res.error) {
        notifications.show({
          //@ts-expect-error RTK doesn't know the error schema
          message: res.error.data.message,
          classNames: classes,
          color: 'white',
          bg: 'red',
        });
      } else {
        notifications.show({
          message: 'Flight Added Successfully',
          classNames: classes,
          bg: 'green',
        });
      }
    });
  };

  return (
    <>
      <Modal
        size={'xl'}
        opened={opened}
        onClose={close}
        title="Edit Flight Data"
      >
        {/* <Switch
          checked={withPhoto}
          onChange={() => setWithPhoto(!withPhoto)}
          defaultChecked
          label="With Photo"
        /> */}
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-2 flex-col mb-10"
        >
          <TextInput
            error={errors.code?.message}
            placeholder="enter 6 Characters"
            label="Code"
            required
            {...register('code')}
          />
          <Controller
            name="capacity"
            control={control}
            render={({ field }) => (
              <NumberInput
                {...field}
                label="Capacity"
                placeholder="1 - 200"
                error={errors.capacity?.message} // Display error message from Yup
                min={1}
                max={200}
                required
              />
            )}
          />
          <Controller
            name="departureDate"
            control={control}
            render={({ field }) => (
              <DateInput
                required
                valueFormat="DD MMM YYYY "
                {...field}
                error={errors.departureDate?.message}
                label="Departure Date"
                placeholder="Choose a day"
              />
            )}
          />
          {withPhoto && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="photo"
                control={control}
                render={({ field }) => (
                  <FileInput
                    {...field}
                    required={withPhoto}
                    error={errors.photo?.message}
                    label="Photo"
                    placeholder="Upload photo"
                    accept="image/png,image/jpeg"
                    onChange={(file) => {
                      setValue('photo', file);
                      field.onChange(file);
                    }}
                  />
                )}
              />

              <Image
                h={300}
                w={500}
                fit="contain"
                radius="lg"
                src={preview || oldImage}
                fallbackSrc="https://placehold.co/500x300?text=Photo Preview"
              />
            </div>
          )}

          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Modal>

      <Button onClick={open}>Edit</Button>
    </>
  );
};

export default EditFlightForm;
