import ReactMapGL, {
  MapRef,
  Source,
  Layer,
  FullscreenControl,
  NavigationControl,
} from "react-map-gl";
import "../../styles/map.scss";
import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../theme/ThemeContext";
import {
  Geometry,
  Feature,
  GeoJsonProperties,
  FeatureCollection,
} from "geojson";

type PopupInfo = {
  regionName: string;
  longitude: number;
  latitude: number;
};

export default function MapComponent(props: {
  studentsByRegion:
    | string
    | Geometry
    | Feature<Geometry, GeoJsonProperties>
    | FeatureCollection<Geometry, GeoJsonProperties>
    | undefined;
}) {
  const token: string = process.env.VITE_APP_MAPBOX_TOKEN!;
  const mapContainerRef = useRef<MapRef>(null);
  const { theme, setTheme } = useContext(ThemeContext);

  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);

  const handleMapClick = (event: any) => {
    event.originalEvent.stopPropagation();
    const features = mapContainerRef.current?.queryRenderedFeatures(
      event.point
    );

    if (features && features.length > 0) {
      const clickedFeature = features[0];
      const regionName = clickedFeature.properties?.shapeNameUz;

      setPopupInfo({
        regionName: regionName,
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
      });
    } else {
      setPopupInfo(null);
    }
  };

  const [viewState, setViewState] = useState({
    longitude: 62.863463,
    latitude: 41.827902,
    zoom: 5,
  });

  const style: any = {
    version: 8,
    name: "Empty",
    metadata: {
      "mapbox:autocomposite": true,
    },
    glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    sources: {},
    layers: [
      {
        id: "background",
        type: "background",
        paint: {
          "background-color": "rgba(0,0,0,0)",
        },
      },
    ],
  };

  return (
    <div className="mapuzb w-full h-[600px] rounded-lg">
      <ReactMapGL
        mapStyle={style}
        ref={mapContainerRef}
        mapboxAccessToken={token}
        {...viewState}
        onClick={handleMapClick}
        onMove={(evt) => setViewState(evt.viewState)}
      >
        <Source id="my-data" type="geojson" data={props.studentsByRegion}>
          <Layer
            id="polygon"
            type="fill"
            paint={{
              "fill-color": [
                "match",
                ["get", "shapeName"],
                "Andijan Region",
                "#0017e6",
                "Bukhara Region",
                "#f5f102",
                "Samarqand Region",
                "#00bd00",
                "Namangan Region",
                "#a809ad",
                "Tashkent Region",
                "#ff0000",
                "Fergana Region",
                "#00bd00",
                "Republic of Karakalpakstan",
                "#fcba03",
                "Sirdaryo Region",
                "#06d1b9",
                "Qashqadaryo Region",
                "#ff0000",
                "Jizzakh Region",
                "#784907",
                "Surxondaryo Region",
                "#0017e6",
                "Xorazm Region",
                "#f50237",
                "Navoiy Region",
                "#aba7a7",
                "Tashkent",
                "#fff",
                "#000000", // Default color if shapeName doesn't match any case
              ],
              "fill-opacity": 0.5,
            }}
          />
          <Layer
            id="line"
            type="line"
            paint={{
              "line-color": theme !== "dark" ? "#000" : "#fff",
              "line-width": 2,
            }}
          />
          <Layer
            id="labels"
            type="symbol"
            layout={{
              "text-field": [
                "format",
                ["upcase", ["get", "shapeNameUz"]],
                { "font-scale": 0.6 },
                "\n",
                {},
                ["downcase", ["get", "students_cnt"]],
                { "font-scale": 1 },
              ],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            }}
            paint={{
              "text-color": theme !== "dark" ? "#000" : "#fff",
            }}
          />
        </Source>

        {/* {popupInfo && (
          <Popup
            latitude={popupInfo.latitude}
            longitude={popupInfo.longitude}
            closeOnClick={false}
          >
            <div>
              <h2>{popupInfo.regionName}</h2>
            </div>
          </Popup>
        )} */}

        <FullscreenControl />
        <NavigationControl />
      </ReactMapGL>
    </div>
  );
}
