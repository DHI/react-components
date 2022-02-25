import { createContext, useContext, useState, useEffect, FC, useRef } from 'react';
import { getTileFromCache } from './AisTileCache';
import { AisContextProps, AisFeatureCollection, AisProviderProps } from './types';

const AisContext = createContext<AisContextProps>(undefined);

const AisProvider: FC<AisProviderProps> = ({ fetchVesselData, refreshIntervalSeconds, onDataUpdated, children }) => {
  const [selectedVesselTypes, setSelectedVessselTypes] = useState<number[]>([]);
  const [selectedNavStatus, setSelectedNavStatus] = useState<number[]>([]);
  const [draftRange, setDraftRange] = useState<[number, number] | null>(null);
  const [lengthRange, setLengthRange] = useState<[number, number] | null>(null);
  const [triggerAisDataUpdate, setTriggerAisDataUpdate] = useState<number>(0);
  const aisFeatureCollection = useRef<any>();
  const refreshIntervalId = useRef<any>();

  useEffect(() => {
    fetchVesselData([-180.0, -85.0, 180.0, 85.0])
      .then((geojson) => {
        aisFeatureCollection.current = geojson;
        setTriggerAisDataUpdate(prev => prev + 1);
      });

    if (refreshIntervalSeconds) {
      refreshIntervalId.current = setInterval(() => {
        fetchVesselData([-180.0, -85.0, 180.0, 85.0])
          .then((geojson) => {
            aisFeatureCollection.current = geojson;
            setTriggerAisDataUpdate(prev => prev + 1);
            if (onDataUpdated) {
              onDataUpdated(aisFeatureCollection.current);
            }
          });
      }, refreshIntervalSeconds * 1000);
    }
    return () => {
      if (refreshIntervalId.current) {
        clearInterval(refreshIntervalId.current);
      }
    }
  }, []);

  const onVesselTypeChange = (shipTypeIDs: number[][]) => {
    setSelectedVessselTypes(shipTypeIDs.flat());
  };

  const onNavStatusChange = (navStatusIDs: number[][]) => {
    setSelectedNavStatus(navStatusIDs.flat());
  };

  const onDraftChange = (draftRange: [number, number]) => {
    setDraftRange(draftRange);
  };

  const onLengthChange = (lengthRange: [number, number]) => {
    setLengthRange(lengthRange);
  };

  const fetchAisTileData = (x: number, y: number, z: number): AisFeatureCollection => {
    return getTileFromCache(aisFeatureCollection.current, x, y, z);
  }

  return (
    <AisContext.Provider
      value={{
        selectedVesselTypes,
        selectedNavStatus,
        draftRange,
        lengthRange,
        onVesselTypeChange,
        onNavStatusChange,
        onDraftChange,
        onLengthChange,
        fetchAisTileData,
        triggerAisDataUpdate,
      }}
    >
      {children}
    </AisContext.Provider>
  );
}

const useAis = () => {
  return (
    useContext(AisContext) ??
    (() => {
      throw new Error('AisContext is missing.');
    })()
  );
}

export { AisContext, AisProvider, useAis };
