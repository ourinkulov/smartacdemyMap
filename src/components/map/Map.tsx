import Map, {
  FullscreenControl,
  GeolocateControl,
  MapRef,
  NavigationControl,
} from "react-map-gl";

import "../../styles/map.scss";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IDataDashboard } from "../../redux/dataStored/userReducer";
// import Pin from "./Pin";
// import { IPoint, points } from "./Points";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import {
  faBuildingCircleCheck,
  faBuildingColumns,
  faBuildingShield,
  faBuildingUser,
  faClose,
  faMapLocationDot,
  faSolarPanel,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { miaterritory } from "../../assets/miaterritory";
import { points } from "../../assets/points";
import { buildings } from "../../assets/buildings";
import { indoor } from "../../assets/indoor";
import { indoor2 } from "../../assets/indoor2";
import { indoor3 } from "../../assets/indoor3";
import { indoor4 } from "../../assets/indoor4";
import { indoor5 } from "../../assets/indoor5";

import {
  A,
  B,
  Arm,
  Bedroom,
  Dining,
  Mvm,
  Hr,
  Kpp,
  Master,
  Med,
  Night,
  Phys,
  Crim,
  Location,
  bedroom2,
  orchestra,
} from "../../assets/buildings/buildingsImg";
import mapboxgl from "mapbox-gl";

export default function MapComponent() {
  const { t } = useTranslation();
  const token = process.env.VITE_APP_MAPBOX_TOKEN!;
  const mapContainerRef = useRef<MapRef>(null);
  const isCollapsed = useSelector(
    (state: IDataDashboard) => state.dashboard.isCollapsed
  );

  // const [popupInfo, setPopupInfo] = useState<IPoint | null>(null);
  const [showInfoDrawer, setShowInfoDrawer] = useState<boolean>(false);
  const [hoverInfo] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState("3Dlayer");

  const handleRadioClick = (value: any) => {
    setSelectedOption(value);
  };

  const [viewState, setViewState] = useState({
    longitude: 69.3632,
    latitude: 41.3275,
    zoom: 17.5,
    pitch: 55,
    bearing: 140,
  });

  useEffect(() => {
    if (isCollapsed) {
      mapContainerRef.current?.once("render", function () {
        mapContainerRef.current?.resize();
      });
    }
  }, [isCollapsed]);

  useEffect(() => {
    const map = mapContainerRef.current?.getMap();
    const layers = [
      { main: "3Dlayer" },
      { main: "indoorLayer", additional: "indoorLayerText" },
      { main: "indoorLayer2", additional: "indoorLayerText2" },
      { main: "indoorLayer3", additional: "indoorLayerText3" },
      { main: "indoorLayer4", additional: "indoorLayerText4" },
      // { main: "indoorLayer5", additional: "indoorLayerText5" },
    ];

    const visibility = map?.getLayoutProperty(selectedOption, "visibility");

    layers.forEach((layer: any) => {
      if (layer.main === selectedOption && visibility !== "visible") {
        map?.setLayoutProperty(layer.main, "visibility", "visible");
        if (layer.additional) {
          map?.setLayoutProperty(layer.additional, "visibility", "visible");
        }

        if (selectedOption === "indoorLayer") {
          mapContainerRef.current?.flyTo({
            center: [69.366442, 41.325206],
            pitch: 60,
            zoom: 18.5,
            duration: 3000,
          });
        }
      } else {
        map?.setLayoutProperty(layer.main, "visibility", "none");
        if (layer.additional) {
          map?.setLayoutProperty(layer.additional, "visibility", "none");
        }
      }
    });
  }, [selectedOption]);

  const infoDrawer = () => {
    setShowInfoDrawer(true);
  };

  const handleMapLoad = () => {
    const map = mapContainerRef.current?.getMap();

    map!.addSource("my-data", {
      type: "geojson",
      data: miaterritory,
    });

    map!.addLayer({
      id: "lineLayer",
      type: "line",
      source: "my-data",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "rgba(255, 0, 0, 0.7)",
        "line-width": 3,
      },
    });

    // map!.addSource("point", {
    //   type: "geojson",
    //   data: points,
    // });

    // map!.loadImage(Location, (error, image: any) => {
    //   if (error) throw error;
    //   map!.addImage("custom-marker", image);

    //   map!.addLayer({
    //     id: "layerID",
    //     type: "symbol",
    //     source: "point",
    //     layout: {
    //       "icon-image": "custom-marker",
    //       "icon-allow-overlap": true,
    //       "text-field": `{name}`,
    //       "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    //       "text-size": 12,
    //       "text-offset": [0, -4],
    //       "text-anchor": "top",
    //     },
    //     paint: {
    //       "text-color": "#202",
    //       "text-halo-color": "#1409fc",
    //       "text-halo-width": 0.1,
    //     },
    //   });
    // });

    // indoor
    map!.addSource("indoor", {
      type: "geojson",
      data: indoor,
    });

    map!.addLayer({
      id: "indoorLayer",
      type: "fill-extrusion",
      source: "indoor",
      paint: {
        "fill-extrusion-color": ["get", "color"],
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-base": ["get", "baseheight"],
        "fill-extrusion-opacity": 0.7,
        "fill-extrusion-vertical-gradient": false,
      },
      layout: {
        visibility: "none",
      },
    });

    map!.addLayer({
      id: "indoorLayerText",
      type: "symbol",
      source: "indoor",
      paint: {
        "text-color": "#000000",
      },
      layout: {
        "text-field": ["step", ["zoom"], "", 19, ["get", "name"]],
        "text-size": ["step", ["zoom"], 0, 19, 10],
        "text-justify": "auto",
        "text-anchor": "top",
        "text-offset": [0, 0],
        visibility: "none",
      },
    });

    map!.addLayer({
      id: "indoorLayerText2",
      type: "symbol",
      source: "indoor",
      paint: {
        "text-color": "#000000",
      },
      layout: {
        // "text-field": [
        //   "case",
        //   [">", ["pitch"], 60],
        //   ["get", "name"],
        //   ["get", "name"],
        // ],
        // "text-size": ["step", ["zoom"], 0, 20, 10],
        "text-justify": "auto",
        "text-anchor": "bottom",
        "text-offset": [0, 0],
        visibility: "none",
      },
    });

    // map!.on("click", "indoorLayer", function (e: any) {
    //   // const coordinates = e.features[0].geometry.coordinates[0];
    //   const title = e.features[0]!.properties.name;

    //   new mapboxgl.Popup()
    //     .setLngLat(e.lngLat)
    //     .setHTML(`<h3>${title}</h3>`)
    //     .addTo(map!);
    // });

    // indoor2
    map!.addSource("indoor2", {
      type: "geojson",
      data: indoor2,
    });

    map!.addLayer({
      id: "indoorLayer2",
      type: "fill-extrusion",
      source: "indoor2",
      paint: {
        "fill-extrusion-color": ["get", "color"],
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-base": ["get", "baseheight"],
        "fill-extrusion-opacity": 0.7,
        "fill-extrusion-vertical-gradient": false,
      },
      layout: {
        visibility: "none",
      },
    });
    // indoor3
    map!.addSource("indoor3", {
      type: "geojson",
      data: indoor3,
    });

    map!.addLayer({
      id: "indoorLayer3",
      type: "fill-extrusion",
      source: "indoor3",
      paint: {
        "fill-extrusion-color": ["get", "color"],
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-base": ["get", "baseheight"],
        "fill-extrusion-opacity": 0.7,
        "fill-extrusion-vertical-gradient": false,
      },
      layout: {
        visibility: "none",
      },
    });

    // map!.addLayer({
    //   id: "indoorLayerText3",
    //   type: "symbol",
    //   source: "indoor3",
    //   paint: {
    //     "text-color": "#000000",
    //   },
    //   layout: {
    //     "text-field": [
    //       "case",
    //       ["==", ["get", "baseheight"], ["get", "height"]],
    //       ["get", "name"],
    //       "",
    //     ],
    //     "text-anchor": "center",
    //     "text-offset": [8, 8],
    //     "text-size": ["step", ["zoom"], 0, 19, 10],
    //     "text-justify": "auto",
    //     visibility: "none",
    //   },
    // });

    // indoor4
    map!.addSource("indoor4", {
      type: "geojson",
      data: indoor4,
    });

    map!.addLayer({
      id: "indoorLayer4",
      type: "fill-extrusion",
      source: "indoor4",
      paint: {
        "fill-extrusion-color": ["get", "color"],
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-base": ["get", "baseheight"],
        "fill-extrusion-opacity": 0.7,
        "fill-extrusion-vertical-gradient": false,
      },
      layout: {
        visibility: "none",
      },
    });

    // // indoor5
    // map!.addSource("indoor5", {
    //   type: "geojson",
    //   data: indoor5,
    // });

    // map!.addLayer({
    //   id: "indoorLayer5",
    //   type: "fill-extrusion",
    //   source: "indoor5",
    //   paint: {
    //     "fill-extrusion-color": ["get", "color"],
    //     "fill-extrusion-height": ["get", "height"],
    //     "fill-extrusion-base": ["get", "baseheight"],
    //     "fill-extrusion-opacity": 0.7,
    //     "fill-extrusion-vertical-gradient": false,
    //   },
    //   layout: {
    //     visibility: "none",
    //   },
    // });

    map!.addSource("3D", {
      type: "geojson",
      data: buildings,
    });

    map!.addLayer({
      id: "3Dlayer",
      type: "fill-extrusion",
      source: "3D",
      paint: {
        "fill-extrusion-color": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          "#57cc25",
          "#ddd",
        ],
        "fill-extrusion-height": ["number", ["get", "height"], 5],
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": 0.8,
      },
    });

    map!.on("click", "3Dlayer", function (e: any) {
      let name = e.features[0]!.properties.name;
      let img = e.features[0]!.properties.image;
      let popupContent = document.createElement("div");

      function imageFind(image: string) {
        switch (image) {
          case "mvm":
            return Mvm;
          case "a":
            return A;
          case "b":
            return B;
          case "bedroom":
            return Bedroom;
          case "dining":
            return Dining;
          case "arm":
            return Arm;
          case "hr":
            return Hr;
          case "kpp":
            return Kpp;
          case "master":
            return Master;
          case "physprep":
            return Phys;
          case "night":
            return Night;
          case "med":
            return Med;
          case "criminalistics":
            return Crim;
          case "orchestra":
            return orchestra;
          case "bedroom2":
            return bedroom2;
          default:
            return A;
        }
      }

      const finalImg = imageFind(img);

      popupContent.innerHTML = `
        <h3 class="text-center">${name}</h3>
        <img src="${finalImg}" alt="Popup Image" style="max-width: 100%; height: auto;">
      `;

      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setDOMContent(popupContent)
        .addTo(map!);
    });

    let fHover: any;

    map!.on("mousemove", function (e: any) {
      var features = map!.queryRenderedFeatures(e.point, {
        layers: ["3Dlayer"],
      });
      if (features[0]) {
        mouseover(features[0], e.lngLat);
      } else {
        mouseout();
      }
    });

    map!.on("mouseout", function (e) {
      mouseout();
    });

    function mouseout() {
      if (!fHover) return;
      map!.getCanvasContainer().style.cursor = "default";
      map!.setFeatureState(
        {
          source: fHover.source,
          sourceLayer: fHover.sourceLayer,
          id: fHover.id,
        },
        {
          hover: false,
        }
      );
      document.getElementById("feature-info")!.style.display = "none";
    }

    let lastId: number = -1;
    function mouseover(feature: any, position: any) {
      fHover = feature;
      map!.getCanvasContainer().style.cursor = "pointer";

      if (lastId === -1 || lastId !== feature.id) {
        mapContainerRef.current?.flyTo({
          center: position,
          zoom: 18,
          duration: 3000,
        });
        lastId = feature.id;
      }
      document.getElementById("feature-info")!.style.display = "block";
      document.getElementById(
        "feature-info"
      )!.innerHTML = `<div><div class="text-center"><b>${
        fHover.properties.name
      }</b></div><div>${
        fHover.properties.desc ? "<b>Тавсиф: </b>" + fHover.properties.desc : ""
      }</div><div>${
        fHover.properties.cam_count
          ? "<b>Камералар сони: </b>" + fHover.properties.cam_count
          : ""
      }</div><div>${
        fHover.properties.cam_online
          ? "<b>Онлайн: </b>" + fHover.properties.cam_online
          : ""
      }</div><div>${
        fHover.properties.cam_offline !== undefined
          ? "<b>Оффлайн: </b>" + fHover.properties.cam_offline
          : ""
      }</div><div>${
        fHover.properties.internet_users
          ? "<b>Фойдаланувчилар: </b>" + fHover.properties.internet_users
          : ""
      }</div></div>`;

      map!.setFeatureState(
        {
          source: fHover.source,
          sourceLayer: fHover.sourceLayer,
          id: fHover.id,
        },
        {
          hover: true,
        }
      );
    }
  };

  return (
    <>
      <div className="map">
        <Map
          ref={mapContainerRef}
          mapboxAccessToken={token}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          interactiveLayerIds={["building"]}
          // onClick={handleBuildClick}
          // onMouseMove={handleHover}
          onLoad={handleMapLoad}
        >
          <FullscreenControl />
          <NavigationControl />
          <GeolocateControl />
          <div
            className="absolute top-48 right-2 w-8 h-8 rounded-md border-2 text-black border-[#b3b3b473] bg-white shadow-lg flex items-center justify-center cursor-pointer"
            onClick={infoDrawer}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </div>
          <div className="layer-toggle absolute top-60 right-2 z-10 bg-white rounded-md flex flex-col border-2 text-black border-[#b3b3b473] shadow-lg text-center">
            <label className="hover:cursor-pointer hover:bg-gray-200 px-2 py-1">
              <input
                type="radio"
                name="layer-switcher"
                value="3Dlayer"
                checked={selectedOption === "3Dlayer"}
                onChange={() => handleRadioClick("3Dlayer")}
                className="hidden"
              />
              <div className="font-bold">3D</div>
            </label>
            <label className="hover:cursor-pointer hover:bg-gray-200 p-1 border-t border-gray-200">
              <input
                type="radio"
                name="layer-switcher"
                value="indoorLayer"
                checked={selectedOption === "indoorLayer"}
                onChange={() => handleRadioClick("indoorLayer")}
                className="hidden"
              />
              <div>1</div>
            </label>
            <label className="hover:cursor-pointer hover:bg-gray-200 p-1 border-t border-gray-200">
              <input
                type="radio"
                name="layer-switcher"
                value="indoorLayer2"
                checked={selectedOption === "indoorLayer2"}
                onChange={() => handleRadioClick("indoorLayer2")}
                className="hidden"
              />
              <div>2</div>
            </label>
            <label className="hover:cursor-pointer hover:bg-gray-200 p-1 border-t border-gray-200">
              <input
                type="radio"
                name="layer-switcher"
                value="indoorLayer3"
                checked={selectedOption === "indoorLayer3"}
                onChange={() => handleRadioClick("indoorLayer3")}
                className="hidden"
              />
              <div>3</div>
            </label>
            <label className="hover:cursor-pointer hover:bg-gray-200 p-1 border-t border-gray-200">
              <input
                type="radio"
                name="layer-switcher"
                value="indoorLayer4"
                checked={selectedOption === "indoorLayer4"}
                onChange={() => handleRadioClick("indoorLayer4")}
                className="hidden"
              />
              <div>4</div>
            </label>
            {/* <label className="hover:cursor-pointer hover:bg-gray-200 p-1 border-t border-gray-200">
              <input
                type="radio"
                name="layer-switcher"
                value="indoorLayer5"
                checked={selectedOption === "indoorLayer5"}
                onChange={() => handleRadioClick("indoorLayer5")}
                className="hidden"
              />
              <div>5</div>
            </label> */}
          </div>
          <div
            className="absolute top-4 left-4 w-48 h-auto bg-[#f7f7f7ea] dark:bg-slate-900  hidden rounded-lg p-2"
            id="feature-info"
          ></div>

          {hoverInfo && (
            <div
              className="tooltip"
              style={{ left: hoverInfo.x, top: hoverInfo.y }}
            >
              <div>State: {hoverInfo.feature.properties.id}</div>
              <div>{hoverInfo.feature.properties.name}</div>
            </div>
          )}
        </Map>

        {showInfoDrawer && (
          <div
            id="drawer-example"
            className="fixed top-12 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-headerFooterBackground border-l border-gray-200 dark:border-gray-500"
            tabIndex={-1}
            aria-labelledby="drawer-label"
          >
            <h5
              id="drawer-label"
              className="inline-flex items-center mb-2 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
            >
              {t("mappage.general")}
            </h5>

            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-400"></hr>
            <button
              type="button"
              data-drawer-hide="drawer-example"
              aria-controls="drawer-example"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                setShowInfoDrawer(false);
              }}
            >
              <FontAwesomeIcon icon={faClose} size={"lg"} />
              <span className="sr-only">Close menu</span>
            </button>
            <div className="max-w-screen-xl px-4 py-4 mx-auto text-center lg:py-8 lg:px-6">
              <dl className="grid max-w-screen-md gap-4 mx-auto text-gray-900 sm:grid-cols-1 dark:text-white px-4">
                <div className="mb-4">
                  <FontAwesomeIcon icon={faMapLocationDot} size={"4x"} />
                  <dd className="text-lg font-bold mt-2">
                    {t("mappage.area")}
                  </dd>
                  <div className="flex items-end justify-center">
                    <dt className="text-3xl md:text-4xl font-extrabold">
                      4400&nbsp;
                    </dt>
                    <div className="text-lg">{t("mappage.sqm")}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <FontAwesomeIcon icon={faBuildingColumns} size={"2x"} />
                    <dd>{t("mappage.totalbuildings")}</dd>
                  </div>

                  <dt className="text-3xl md:text-4xl font-extrabold">30</dt>
                </div>

                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-400"></hr>
                <div className="flex justify-between items-center">
                  <div>
                    <FontAwesomeIcon icon={faBuildingUser} size={"2x"} />
                    <dt>{t("mappage.edbuildings")}</dt>
                  </div>

                  <dt className="text-3xl md:text-4xl font-extrabold">8</dt>
                </div>

                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-400"></hr>
                <div className="flex justify-between items-center">
                  <div>
                    <FontAwesomeIcon icon={faBuildingCircleCheck} size={"2x"} />
                    <dt>{t("mappage.adminbuildings")}</dt>
                  </div>
                  <dt className="text-3xl md:text-4xl font-extrabold">4</dt>
                </div>

                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-400"></hr>
                <div className="flex justify-between items-center">
                  <div>
                    <FontAwesomeIcon icon={faBuildingShield} size={"2x"} />
                    <dt>{t("mappage.servicebuildings")}</dt>
                  </div>

                  <dt className="text-3xl md:text-4xl font-extrabold">17</dt>
                </div>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-400"></hr>
                <div>
                  <FontAwesomeIcon icon={faTree} size={"2x"} />
                  <dt>{t("mappage.greenland")}</dt>
                </div>
                <div>
                  <FontAwesomeIcon icon={faSolarPanel} size={"2x"} />
                  <dt>{t("mappage.solarpanels")}</dt>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
