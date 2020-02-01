import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { AppNavigation } from './src/navigation/AppNavigation';
import { AppLoading } from 'expo';

import { store } from './src/store'
import { getResources } from './src/resources'

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if(!isReady) {
    return (
      <AppLoading
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
        startAsync={getResources}
      />
    )
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
