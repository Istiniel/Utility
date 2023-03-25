import React from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import  FormSt  from './Form.module.scss';

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
};

const Form = () => {
  let {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ mode: 'onBlur' });

  // triggers if inputs are correct
  const onSubmit: SubmitHandler<FormValues> = (data, e) => {
    console.log(data);
    console.log(e);
    reset();
  };

  // triggers if inputs are incorrect
  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    console.log('onInputErrors');
  };

  return (
    <FormSt onSubmit={handleSubmit(onSubmit, onError)}>
      <input
        placeholder="Enter name"
        {...register('firstName', {
          required: 'Enter firstname',
          minLength: {
            value: 5,
            message: 'Less then 5 symbols',
          },
          pattern: { value: /[a-zA-Z]{5}/, message: 'incorrect name' },
        })}
      />
      <p>{errors?.firstName?.message}</p>
      <input
        placeholder="Enter lastname"
        {...register('lastName', {
          required: 'Enter lastname',
          minLength: {
            value: 5,
            message: 'Less then 5 symbols',
          },
          pattern: { value: /[a-zA-Z]{5}/, message: 'incorrect lastname' },
        })}
      />
      <p>{errors?.lastName?.message}</p>
      <input
        placeholder="Enter email"
        {...register('email', {
          required: 'Enter email',
          minLength: {
            value: 5,
            message: 'Less then 5 symbols',
          },
          pattern: {
            value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
            message: 'incorrect email',
          },
        })}
      />
      <p>{errors?.email?.message}</p>
      <input
        placeholder="Enter age"
        type="number"
        {...register('age', {
          required: 'Enter age',
          max: { value: 90, message: '1-90' },
        })}
      />
      <p>{errors?.age?.message}</p>
      <button type="submit">Submit</button>
    </FormSt>
  );
};

export default Form;
