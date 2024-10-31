import { yupResolver } from '@hookform/resolvers/yup';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { useSignupMutation } from '../services/apiSlice';
import Cookies from 'js-cookie';
import { Link, Navigate } from 'react-router-dom';

const validationSchema = object().shape({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
});

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [signUp] = useSignupMutation();
  const token = Cookies.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: Inputs) => {
    signUp(data);
  };

  if (token) return <Navigate to={'/'} />;

  return (
    <div className="mx-auto my-10 border rounded-xl max-w-72 p-8">
      <h1 className="text-lg text-center my-2">Register</h1>
      <form
        className="flex flex-col gap-4 mt-5"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          error={errors.name?.message}
          {...register('name')}
          placeholder="Name"
        />
        <TextInput
          error={errors.email?.message}
          {...register('email')}
          placeholder="E-mail"
        />
        <PasswordInput
          error={errors.password?.message}
          {...register('password')}
          placeholder="password"
        />
        <Button type="submit">Register</Button>
        <p className="text-xs text-gray-500 text-center">
          Already have account?{' - '}
          <Link className="text-blue-500" to={'/login'}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
