import { NetInfo } from 'react-native';

export const isNotConnected = async () => {
  const connectionInfo = await NetInfo.getConnectionInfo();
  return connectionInfo.type === 'none';
};
