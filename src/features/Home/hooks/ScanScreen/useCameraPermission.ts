import { useCallback, useEffect, useState } from 'react';
import { Camera } from 'react-native-vision-camera';

const useCameraPermission = (autoRequest?: boolean) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestPermission = useCallback(async () => {
    Camera.requestCameraPermission().then(() => setHasPermission(true));
  }, []);

  useEffect(() => {
    if (autoRequest) {
      requestPermission();
    }
  }, [autoRequest, requestPermission]);

  return { hasPermission, requestPermission };
};

export default useCameraPermission;
