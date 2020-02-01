import * as Font from 'expo-font';
import { DB } from './db';

export async function getResources() {
  try {
    await Font.loadAsync({
      'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
    });

    await DB.init();
    console.log('Database started...');
  } catch (e) {
    console.log('Error: ', e);
  }
}
