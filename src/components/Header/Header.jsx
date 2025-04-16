import React from 'react';
import { Logo } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';

import CclTopMainMenu from '@eeacms/volto-clms-theme/components/CclTopMainMenu/CclTopMainMenu';

export default function Header() {
  return (
    <div>
      <header className="ccl-header">
        {/* Body class depending on sections */}
        <BodyClass className="ccl-style ccl-color_land" />

        <div className="ccl-header-tools">
          <div className="ccl-container">
            <div className="ccl-header-tools-container">
              <div style={{ width: '10px', height: '10px' }}></div>
            </div>
          </div>
        </div>
        <div className="ccl-header-nav ">
          <div className="ccl-container">
            <Logo />
            <nav className="ccl-main-menu">
              <ul className="ccl-header-menu-tools ccl-collapsible-toolmenu">
                <CclTopMainMenu />
              </ul>
            </nav>
          </div>
        </div>
        <hr />
      </header>
    </div>
  );
}
