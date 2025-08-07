import React from 'react';

function Footer() {
  return (
    <div className="footer footer-center bg-base-300 text-base-content p-4 flex flex-col items-center gap-2">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          Neoryte
        </p>
      </aside>
      <a className="btn btn-primary" href="https://api.whatsapp.com/send?phone=2347016787613&text=Hello%20Lumi%2C%20I%27m_________%20I%20want%20to%20book%20an%20appointment%20with%20you&fbclid=PAQ0xDSwMBje5leHRuA2FlbQIxMAABp-BPo3ZjGv-pd_728X_adpcN47VxB7yFTZmn4aBfKJ3fqZ4-sWAnhrUGpyBM_aem_XTJqtFEiCKYiVcQChxkL_g">Book me</a>
      
    </div>
  );
}

export default Footer;
