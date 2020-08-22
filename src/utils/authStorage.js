import { AsyncStorage } from 'react-native';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  key = `${this.namespace}:token`

  async getAccessToken() {
    return await AsyncStorage.getItem(this.key);
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(this.key, accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(this.key);
  }
}

export default AuthStorage;