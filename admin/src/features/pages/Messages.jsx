import React from 'react';
import AllMessages from '../../components/messages/AllMessages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Messages = () => {
  return (
    <>
      <hr className="my-4" />
      <main className="main" id="top">
        <div className="container" data-layout="container">
          <div className="content">
            <div className="card mb-3">
              <div className="bg-holder d-none d-lg-block bg-card" style={{ backgroundImage: 'url(../../../assets/img/icons/spot-illustrations/corner-4.png)' }} />
              <div className="card-body position-relative">
                <div className="row">
                  <div className="col-lg-12">
                    <h3>
                      <code>
                        <i className="fa-solid fa-message"></i> Listado De Mensajes.
                      </code>
                    </h3>
                    <a className="btn btn-link ps-0 btn-sm" href="/messages" rel="noopener noreferrer">
                      <code className='badge rounded-pill badge-soft-dark' style={{ fontSize: "20px" }}>
                        <FontAwesomeIcon icon="fa-solid fa-repeat" /> Cargar La Página. <span className="fas fa-chevron-right ms-1 fs--2" style={{ fontSize: "20px" }} />
                      </code>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <>
              <AllMessages />
            </>
          </div>
        </div>
      </main>
    </>
  );
}

export default Messages;