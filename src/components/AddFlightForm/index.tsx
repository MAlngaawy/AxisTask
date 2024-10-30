import { Button, NumberInput, TextInput } from '@mantine/core';
import PageTitle from '../shared/PageTitle';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { date, number, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateInput } from '@mantine/dates';
import { useAddFlightMutation } from '../../services/apiSlice';

type Inputs = {
  code: string;
  capacity: number;
  departureDate: Date;
};
const validationSchema = object().shape({
  code: string().min(6).max(6).required(),
  capacity: number().min(1).max(200).required(),
  departureDate: date().required(),
});

const AddFlightForm = () => {
  const [addFlight] = useAddFlightMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addFlight({
      ...data,
      departureDate: data.departureDate.toISOString().split('T')[0],
    });
  };

  return (
    <div>
      <PageTitle text="Add Flight Form" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 flex-col">
        <TextInput
          error={errors.code?.message}
          placeholder="enter 6 Characters"
          label="Code"
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
            />
          )}
        />
        <Controller
          name="departureDate"
          control={control}
          render={({ field }) => (
            <DateInput
              valueFormat="DD MMM YYYY "
              {...field}
              error={errors.departureDate?.message}
              label="Departure Date"
              placeholder="Choose a day"
            />
          )}
        />

        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AddFlightForm;
