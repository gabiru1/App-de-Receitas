import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ history }) {
  const [email, setEmail] = useState('');

  function getEmail() {
    if (localStorage.getItem('user')) {
      const userEmail = JSON.parse(localStorage.getItem('user')).email;
      setEmail(userEmail);
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <section>
      <Header title="Perfil" showSearchBtn={ false } />
      <div>
        <div className="container-profile-email">
          { email && (
            <h2 data-testid="profile-email">{email}</h2>
          )}
        </div>
        <div className="container-buttons-profile">
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
            onClick={ handleLogout }
          >
            Sair
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
