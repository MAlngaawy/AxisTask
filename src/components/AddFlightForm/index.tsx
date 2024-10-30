import {
  Button,
  FileInput,
  Image,
  NumberInput,
  Switch,
  TextInput,
} from '@mantine/core';
import PageTitle from '../shared/PageTitle';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { date, mixed, number, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateInput } from '@mantine/dates';
import {
  useAddFlightMutation,
  useAddFlightWithPhotoMutation,
} from '../../services/apiSlice';
import { notifications } from '@mantine/notifications';
import classes from './form.module.css';
import { useEffect, useState } from 'react';

type Inputs = {
  code: string;
  capacity: number;
  departureDate: Date;
  photo?: File | null | undefined;
};

const AddFlightForm = () => {
  const [withPhoto, setWithPhoto] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [addFlight] = useAddFlightMutation();
  const [addFlightWithPhoto] = useAddFlightWithPhotoMutation();

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const addFunc = withPhoto ? addFlightWithPhoto : addFlight;
    const formData = new FormData();
    formData.append('code', data.code);
    formData.append('capacity', data.capacity.toString()); // Convert number to string
    formData.append(
      'departureDate',
      data.departureDate.toISOString().split('T')[0]
    ); // Convert Date to ISO string
    if (data.photo) {
      formData.append('photo', data.photo); // Append the photo file
    }

    addFunc(formData).then((res) => {
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
    <div>
      <div className="flex gap-4 items-center justify-between">
        <PageTitle text="Add Flight Form" />
        <Switch
          checked={withPhoto}
          onChange={() => setWithPhoto(!withPhoto)}
          defaultChecked
          label="With Photo"
        />
      </div>
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
              src={preview}
              fallbackSrc="https://placehold.co/500x300?text=Photo Preview"
            />
          </div>
        )}

        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AddFlightForm;
