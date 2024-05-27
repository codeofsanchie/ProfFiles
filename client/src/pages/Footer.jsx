import React from 'react';

function Footer() {
  return (
    <div className="bg-gray-900 text-white shadow-inner">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        <div id="links" className="flex space-x-4">
          <strong>
            <a href="https://www.spit.ac.in/ariia/" className="text-white hover:text-red-500">
              ARIIA
            </a>
          </strong>
          <span>|</span>
          <strong>
            <a href="https://iic.spit.ac.in" target="_blank" className="text-white hover:text-red-500">
              IIC
            </a>
          </strong>
          <span>|</span>
          <strong>
            <a href="https://www.spit.ac.in/nirf" className="text-white hover:text-red-500" style={{ textDecoration: 'none', borderBottom: '2px solid #f22d00' }}>
              NIRF
            </a>
          </strong>
          <span>|</span>
          <strong>
            <a href="https://www.spit.ac.in/naac/" className="text-white hover:text-red-500">
              NAAC
            </a>
          </strong>
          <span>|</span>
          <strong>
            <a href="https://www.spit.ac.in/nba/" className="text-white hover:text-red-500">
              NBA
            </a>
          </strong>
        </div>
        <a href="http://www.spit.ac.in/terms-conditions/" className="text-white hover:text-red-500">
          Terms & Conditions
        </a>
      </div>
    </div>
  );
}

export default Footer;
