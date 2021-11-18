import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile({ history }) {
  const [email, setEmail] = useState('');

  function getEmail() {
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    setEmail(userEmail);
  }

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <div>
      <Header title="Perfil" showSearchBtn={ false } />
      <div>
        <h2 data-testid="profile-email">{email}</h2>
      </div>
      <div className="container-buttons-explore">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
