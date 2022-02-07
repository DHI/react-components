export const fetchVessels = async (
  connectionString: string,
  type: "Live" | "History",
  lastHours: number | null,
  startTime: Date | null,
  endTime: Date | null,
  tablePrefix: string,
  boundingBox: [number, number, number, number], // [west, south, east, north]
  token: string
) => {
  const parameters = {
    Type: type,
    LastHours: lastHours,
    TablePrefix: tablePrefix,
    BoundingBox: boundingBox,
    StartTime: startTime,
    EndTime: endTime,
  };

  const featureCollectionId = Object.entries(parameters).reduce(
    (acc, [key, value]) => {
      if (value) {
        return `${acc}${acc != "" ? ";" : ""}${key}=${value}`;
      } else {
        return acc;
      }
    },
    ""
  );

  const response = await fetch(
    `https://ais-dev.seaportopx.com/api/featurecollections/${connectionString}/${featureCollectionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const geoJSON = await response.json();

  return geoJSON;
};