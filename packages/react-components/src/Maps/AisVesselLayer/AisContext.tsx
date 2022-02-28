import React, { createContext, useContext, useState, useEffect, FC, useRef } from 'react';
import { getTileFromCache } from './AisTileCache';
import { AisContextProps, AisFeatureCollection, AisProviderProps } from './types';

/**
 * This context manages the AIS live data feed for use with the AisLayer map component.
 * It manages refreshing of the AIS data feed on a set interval, as well as storing the
 * vessel parameters that have been selected by the user.
 */
const AisContext = createContext<AisContextProps>(undefined);

const AisProvider: FC<AisProviderProps> = ({
  fetchVesselData,
  refreshIntervalSeconds,
  bbox,
  onDataUpdated,
  children,
}) => {
  const [selectedVesselTypes, setSelectedVessselTypes] = useState<number[]>([]);
  const [selectedNavStatus, setSelectedNavStatus] = useState<number[]>([]);
  const [draftRange, setDraftRange] = useState<[number, number] | null>(null);
  const [lengthRange, setLengthRange] = useState<[number, number] | null>(null);
  const [triggerAisDataUpdate, setTriggerAisDataUpdate] = useState<number>(0);
  const aisFeatureCollection = useRef<AisFeatureCollection>();
  const refreshIntervalId = useRef<NodeJS.Timer>();

  useEffect(() => {
    const boundingBox = bbox ?? [-180.0, -85.0, 180.0, 85.0];
    fetchVesselData(boundingBox).then((geojson) => {
      aisFeatureCollection.current = geojson;
      setTriggerAisDataUpdate((prev) => prev + 1);
    });

    if (refreshIntervalSeconds) {
      refreshIntervalId.current = setInterval(() => {
        fetchVesselData(boundingBox).then((geojson) => {
          aisFeatureCollection.current = geojson;
          setTriggerAisDataUpdate((prev) => prev + 1);
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
    };
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
  };

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
};

const useAis = () => {
  return (
    useContext(AisContext) ??
    (() => {
      throw new Error('AisContext is missing.');
    })()
  );
};

export { AisContext, AisProvider, useAis };
