import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

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

export function navigateAndReset(name, params = {}) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name, params }],
      })
    );
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}