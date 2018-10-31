import React, { SFC } from 'react';

import '../styles/Layout.css';

const Layout: SFC<{}> = ({ children }) => {
  return <div className="wrapper">{children}</div>
}

export default Layout;
