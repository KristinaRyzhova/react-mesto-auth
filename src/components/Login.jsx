import React from 'react';
import {useState} from 'react';

function Login ({onLogin}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className='auth'>
      <h2 className='auth__title'>Вход</h2>
      <form name='loginForm' className='auth__form' onSubmit={handleSubmit}>
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
        <button type="submit" className="auth__button">Войти</button>
      </form>
    </div>
  );
};

export default Login;