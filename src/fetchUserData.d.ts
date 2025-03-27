export declare const setInitialEntryPoint: () => void;

export declare const fetchUserData: () => Promise<{
  ip: string | null;
  location: string | null;
  browserFingerprint: string;
  timestamp: string;
  entryPoint: string | null;
  gpsCoordinates: {
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null;
}>;