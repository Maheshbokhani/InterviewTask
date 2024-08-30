import React, {useEffect} from 'react';

import {Provider} from 'react-redux';

// Redux
import {store} from 'redux/store';
import dbServices from 'services/database';

// Navigation
import RootNavigation from 'src/navigation/rootNavigation';

const App = () => {
  useEffect(() => {
    dbServices.createDB();
    dbServices.fetchDB();
  }, []);

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
