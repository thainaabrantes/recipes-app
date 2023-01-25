import { useState } from 'react';

const useLogin = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handlerChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  return { form, handlerChange };
};

export default useLogin;
