import { createContext, useContext, useState, FC } from 'react';
import { AisContextProps, AisProviderProps } from './types';

const AisContext = createContext<AisContextProps>(undefined);

const AisProvider: FC<AisProviderProps> = ({ fetchVesselData, children }) => {
  const [selectedVesselTypes, setSelectedVessselTypes] = useState<number[]>([]);
  const [selectedNavStatus, setSelectedNavStatus] = useState<number[]>([]);
  const [draftRange, setDraftRange] = useState<[number, number] | null>(null);
  const [lengthRange, setLengthRange] = useState<[number, number] | null>(null);
  
  // TODO: AIS data cache.
  // const [aisData, setAisData] = useState<AisDataCache>();

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

  const fetchAisTileData = async (x: number, y: number, z: number, bbox: { west: number, south: number, east: number, north: number }) => {
    console.log(`Fetching ais tile: ${x}, ${y}, ${z}`);

    const { west, south, east, north } = bbox;

    const vesselGeoJSON = await fetchVesselData([west, south, east, north]);

    // TODO: Cache AIS data so we don't pull down unnecessary data + performance improvements.

    return vesselGeoJSON;
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
