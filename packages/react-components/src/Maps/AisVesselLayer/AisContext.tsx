import { createContext, useContext, useState, useEffect, FC, useRef } from 'react';
import { getTileFromCache } from './AisTileCache';
import { AisContextProps, AisProviderProps } from './types';

const AisContext = createContext<AisContextProps>(undefined);

const AisProvider: FC<AisProviderProps> = ({ fetchVesselData, children }) => {
  const [selectedVesselTypes, setSelectedVessselTypes] = useState<number[]>([]);
  const [selectedNavStatus, setSelectedNavStatus] = useState<number[]>([]);
  const [draftRange, setDraftRange] = useState<[number, number] | null>(null);
  const [lengthRange, setLengthRange] = useState<[number, number] | null>(null);
  const aisFeatureCollection = useRef<any>();

  useEffect(() => {
    fetchVesselData([-180.0, -85.0, 180.0, 85.0])
      .then((geojson) => {
        aisFeatureCollection.current = geojson;
      });
  }, []);

  const onVesselTypeChange = (shipTypeIDs: number[]) => {
    setSelectedVessselTypes(shipTypeIDs);
  };

  const onNavStatusChange = (navStatusIDs: number[]) => {
    setSelectedNavStatus(navStatusIDs);
  };

  const onDraftChange = (draftRange: [number, number]) => {
    setDraftRange(draftRange);
  };

  const onLengthChange = (lengthRange: [number, number]) => {
    setLengthRange(lengthRange);
  };

  const fetchAisTileData = async (x: number, y: number, z: number): Promise<any> => {

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
