import { yupResolver } from '@hookform/resolvers/yup';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { useLoginMutation } from '../services/apiSlice';
import Cookies from 'js-cookie';
import { Link, Navigate } from 'react-router-dom';

const validationSchema = object().shape({
  email: string().email().required(),
  password: string().required(),
});

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [login] = useLoginMutation();
  const token = Cookies.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: Inputs) => {
    login(data);
  };

  if (token) return <Navigate to={'/'} />;

  return (
    <div className="mx-auto my-10 border rounded-xl max-w-72 p-8">
      <h1 className="text-lg text-center my-2">Login</h1>
      <form
        className="flex flex-col gap-4 mt-5"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <Button type="submit">Login</Button>
        <p className="text-xs text-gray-500 text-center">
          Don't have account?{' - '}
          <Link className="text-blue-500" to={'/register'}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
