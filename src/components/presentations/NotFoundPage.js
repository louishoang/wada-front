import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="error404-area ptb-100 ptb-sm-60">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="error-wrapper text-center">
            <div className="error-text">
              <h1>404</h1>
              <h2>Opps! PAGE NOT FOUND</h2>
              <p>Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarity unavailable.</p>
            </div>
            <div className="error-button">
              <Link to="/">Back to home page</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
    
export default NotFoundPage