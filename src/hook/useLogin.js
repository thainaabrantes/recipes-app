import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SIX_DIGITS = 6;

const useLogin = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();

  const handlerChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const setEmailOnLocalStorage = () => {
    localStorage.setItem('user', JSON.stringify({ email: form.email }));
  };

  const handlerClick = () => {
    setEmailOnLocalStorage();
    history.push('/meals');
  };

  const isFormValid = () => {
    const regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i;
    if (form.password.length <= SIX_DIGITS || !regex.test(form.email)) return true;
  };

  return { form, handlerChange, isFormValid, handlerClick };
};

export default useLogin;
