import { useState, useEffect, useRef } from "react";
import ReactModal from "react-modal";
import { fetchWeatherApi, formatDateTime, MAIN_LAYER } from "../constant";
import Switch from "@mui/material/Switch";
import ReplayIcon from "@mui/icons-material/Replay";
import mapboxgl, { Point } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Feature, GeoJSON } from "geojson";

import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/Contrast";
import _ from "lodash";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
} from "@mui/material";

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

const MODAL_STYLES = {
  content: {
    width: "960px",
    maxWidth: "100%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type AlertGroup = {
  features: Feature[];
  updated: string;
  type: "FeatureCollection";
};

export const Weather: React.FC<ModalProps> = ({ modalIsOpen, closeModal }) => {
  const [alerts, setAlerts] = useState<AlertGroup>();
  const [reloading, setReload] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const label = { inputProps: { "aria-label": "Dark Mode" } };
  const [alertGroup, setAlertGroup] = useState<Feature[]>();
  useEffect(() => {
    if (!alerts || !!reloading) {
      fetch(fetchWeatherApi())
        .then((response) => response?.json())
        .then((json) => {
          setAlerts(json);
        })
        .catch((error) => console.error(error));
    }
    setReload(false);
  }, [alerts, reloading]);
  if (!alerts) {
    return;
  }
  const alertGroups = _.chain(alerts.features)
    .groupBy("properties.event")
    .map((value, key) => ({ label: key, value }))
    .filter(
      (value) => value.label !== "Test Message" && !!value.value[0].geometry,
    )
    .value();
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={MODAL_STYLES}
      contentLabel="Weather Modal"
      ariaHideApp={false}
    >
      <div className="weather">
        <Accordion>
          <AccordionSummary aria-controls="panel1-content" id="panel1-header">
            <Box
              fontSize={20}
              fontWeight={900}
              margin="auto 10px"
              color="#A2574F"
            >
              Current Alerts: {alerts.features.length}
            </Box>
            {alertGroups.slice(0, 3).map((g) => (
              <Box key={g.label} fontSize={16} fontWeight={900} margin="auto">
                {g.label}: {g.value.length}
              </Box>
            ))}
          </AccordionSummary>
          <AccordionDetails>
            <Autocomplete
              disablePortal
              options={alertGroups}
              sx={{ width: "100%", margin: "auto" }}
              renderInput={(params) => (
                <TextField {...params} label="Active Events" />
              )}
              getOptionLabel={(option) =>
                `${option.label}: ${option.value.length}`
              }
              onChange={(e, option, i, d) => {
                setAlertGroup(option?.value);
              }}
            />
          </AccordionDetails>
        </Accordion>
        <Mapbox data={alerts} darkMode={darkMode} alertGroup={alertGroup} />
        <Box textAlign="center">
          <IconButton
            aria-label="Refresh"
            disabled={reloading}
            onClick={() => setReload(true)}
          >
            <ReplayIcon />
          </IconButton>
          <small>Last updated: {formatDateTime(alerts.updated)} </small>
          <small>
            <a target="_blank" href="https://api.weather.gov/openapi.json">
              &copy; weather.gov
            </a>
          </small>
          <Switch
            {...label}
            checkedIcon={<DarkModeIcon />}
            onChange={() => {
              setDarkMode(!darkMode);
            }}
          />
        </Box>
      </div>
    </ReactModal>
  );
};

type MapProps = {
  data: GeoJSON;
  darkMode: boolean;
  alertGroup?: Feature[];
};

const Mapbox: React.FC<MapProps> = ({ data, darkMode, alertGroup }) => {
  const mapContainerRef = useRef<any>();
  const mapRef = useRef<any>();
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>();
  const [point, setPoint] = useState<Point>();

  // Refs to track the latest state values
  const selectedFeatureRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const map = (mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-99.04, 38.907],
      zoom: 3.8,
      style: `mapbox://styles/mapbox/${darkMode ? "dark" : "light"}-v11`,
      config: {
        basemap: {
          colorPlaceLabelHighlight: "red",
          colorPlaceLabelSelect: "blue",
        },
      },
    }));
    map.on("load", () => {
      map.addSource("alerts", {
        type: "geojson",
        data,
      });

      alertGroup &&
        map.addSource("alert-group", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: alertGroup,
          },
        });

      map.addLayer(MAIN_LAYER("alerts"), "waterway-label");
      map.on("click", "alerts-heat", (e: any) => {
        setSelectedFeature(e.features[0]);
        setPoint(e.point);
        map.setCenter(e.lngLat);
        map.setZoom(6);
      });

      alertGroup &&
        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "alert-group",
          paint: {
            "circle-color": "#0F52BA",
            "circle-radius": 6,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });
    });
    return () => map.remove();
  }, [data, darkMode, alertGroup]);

  return (
    <>
      <div id="map" ref={mapContainerRef} className="map-container" />
      {selectedFeature?.properties && (
        <div className="map-overlay">
          <div className="close-btn">
            <Button
              onClick={() => {
                setSelectedFeature(null);
                mapRef.current.setCenter([-99.04, 38.907]);
                mapRef.current.setZoom(3.8);
              }}
              endIcon={<CloseIcon />}
            />
          </div>
          <div
            className={`map-overlay-inner ${selectedFeature.properties.severity}`}
          >
            <h3>{selectedFeature.properties.event}</h3>
            <div>
              <b>Affected area:</b>{" "}
              {selectedFeature.properties.areaDesc
                .split("; ")
                .map((area: string) => (
                  <div key={area}>{area}</div>
                ))}
            </div>
            <p>{selectedFeature.properties.headline}.</p>
          </div>
        </div>
      )}
    </>
  );
};
