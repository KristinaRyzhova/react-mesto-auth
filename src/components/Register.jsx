import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';


function Register ({onRegister}) {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  };
  
  return(
    <div className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
      <form name='registerForm' className='auth__form' onSubmit={handleSubmit}>
        <div className='auth__input-fields'>
          <input
            className='auth__input' 
            type='email' 
            name='email' 
            id='email' 
            value={email} 
            placeholder='Email' 
            required 
            onChange={({ target }) => setEmail(target.value)} 
          />
          <input
            className='auth__input' 
            type='password' 
            name='password' 
            id='password' 
            value={password} 
            placeholder='Пароль' 
            required 
            onChange={({ target }) => setPassword(target.value)} 
          />
        </div>
        <button className='auth__button'>Зарегистрироваться</button>
      </form>
      <p className='auth__subtitle'>Уже зарегистрированы?&nbsp;
      <Link to='/sign-in' className='auth__subtitle-link'>Войти</Link></p>
    </div>
  );
};

export default Register;