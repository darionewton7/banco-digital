/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator'; // Import the AppNavigator
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import gesture handler setup (required for react-navigation)
import 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider> 
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;

