import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
}

export function navigateWithParams(name, params){
    if(navigationRef.isReady()){
      navigationRef.navigate(name, params);
    }
}