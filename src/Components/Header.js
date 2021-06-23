import React, { useState, useEffect } from 'react';
import blockchain_logo from './../assets/icon_blockchain.png';
import { Link } from 'react-router-dom';
import './Header.css';
import Ticker from './Ticker';

const Header = ({ values }) => {
  const [searchInput, setSearchInput] = useState('');
  const [cryptos, setCryptos] = useState();
  const [authors, setAuthors] = useState();
  const onSearchInputChange = ({ target }) => {
    setSearchInput(target.value);
  };

  useEffect(() => {
    fetch('http://localhost:4000/wiki/')
      .then(
        (result) => {
          if (result.ok) {
            return result.json();
          }
          throw Error('Error');
        },
        (error) => {
          throw Error('Network Error');
        }
      )
      .then((jsonData) => {
        console.log(jsonData);
        setCryptos(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/author/')
      .then(
        (result) => {
          if (result.ok) {
            return result.json();
          }
          throw Error('Error');
        },
        (error) => {
          throw Error('Network Error');
        }
      )
      .then((jsonData) => {
        console.log(jsonData);
        setAuthors(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <header>
      <div className="prenav_background">
        <div className="prenav">
          <div className="logo">
            <Link className="logoImage" to="/">
              <img
                src={blockchain_logo}
                alt="blockchain logo"
                id="blchainlogo"
              />
            </Link>

            <Link className="logoText" to="/">
              <div className="container">
                <div className="row">
                  <h1>The Daily Crypto</h1>
                </div>
                <div className="row fs-6">
                  <h3 className="fs-6 text-end">
                    Powered by React & Contentful
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          <div className="nav_ticker">
            <div className="table-responsive-l">
              <Ticker values={values} />
            </div>
          </div>

          {/* <div className="nav_links"></div> */}
        </div>
      </div>

      <nav className="navbar navbar-expand-lg">
        <div className="navbar-content">
          <div className="menus">
            <div
              className="navbar-collapse navbar-expand-sm"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <div
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Cryptos
                  </div>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {cryptos &&
                      cryptos.items.map((item) => {
                        return (
                          <li key={item.fields.id}>
                            <Link to={'/crypto/' + item.fields.id}>
                              <p>{item.fields.title}</p>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <div
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Authors
                  </div>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {authors &&
                      authors.items.map((item) => {
                        return (
                          <li key={item.fields.name}>
                            <Link to={'/authors/' + item.fields.name}>
                              <p>{item.fields.name}</p>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </li>

                {/* <li className="nav-item dropdown">
                                <div
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                >
                                    Third
                                </div>

                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <div className="dropdown-item" name="third">
                                            Third-First
                                        </div>
                                    </li>

                                    <li>
                                        <div className="dropdown-item" name="third">
                                            Third-Second
                                        </div>
                                    </li>
                                </ul>
                            </li> */}
              </ul>
            </div>
          </div>

          <div className="search-bar">
            {/* Search bar */}
            <form
              className="d-flex"
              onSubmit={(event) => {
                event && event.preventDefault();
                //TODO: Do the search
              }}
            >
              <input
                onChange={(event) => onSearchInputChange(event)}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
