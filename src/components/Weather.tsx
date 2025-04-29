import { useState, useEffect, useRef } from "react";
import ReactModal from "react-modal";
import {
  CIRCLE_LAYER,
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  fetchWeatherApi,
  formatDateTime,
  MAIN_LAYER,
  MAP_CIRCLE_COLOR,
  WeatherEmoji,
} from "../constant";
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
    width: "940px",
    maxWidth: "95%",
    height: "auto",
    maxHeight: "95%",
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
            <Box fontSize={20} fontWeight={900} margin="auto 0" color="#A2574F">
              Total alerts: {alerts.features.length}
            </Box>
            {alertGroups.slice(0, 3).map((g) => (
              <Box
                key={g.label}
                fontSize={18}
                fontWeight={600}
                margin="0 auto"
                className="hightlight"
                width="max-content"
                lineHeight={1.2}
              >
                {WeatherEmoji(g.label)}&#160;
                <small>
                  {g.label}:&#160;{g.value.length}&#160;
                </small>
              </Box>
            ))}
          </AccordionSummary>
          <AccordionDetails>
            <Autocomplete
              disablePortal
              options={alertGroups}
              sx={{ width: "100%", margin: "auto" }}
              renderInput={(params) => (
                <TextField {...params} label="Find alert" />
              )}
              getOptionLabel={(option) =>
                `${WeatherEmoji(option.label) ?? ""} ${option.label} - ${option.value.length}`
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
          <small>
            <a target="_blank" href="https://api.weather.gov/openapi.json">
              Last updated: {formatDateTime(alerts.updated)}
            </a>
          </small>
          <Switch
            {...label}
            checkedIcon={<DarkModeIcon />}
            onChange={() => {
              setDarkMode(!darkMode);
            }}
          />
          <br />
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
      center: DEFAULT_MAP_CENTER,
      zoom: DEFAULT_MAP_ZOOM,
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
      map.addLayer(MAIN_LAYER("alerts"), "waterway-label");
      alertGroup &&
        map.addSource("alert-group", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: alertGroup,
          },
        });
      alertGroup && map.addLayer(CIRCLE_LAYER(MAP_CIRCLE_COLOR));

      map.on("click", "alerts-heat", (e: any) => {
        setSelectedFeature(e.features[0]);
        setPoint(e.point);
        map.setCenter(e.lngLat);
        map.setZoom(6);
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
                mapRef.current.setCenter(DEFAULT_MAP_CENTER);
                mapRef.current.setZoom(DEFAULT_MAP_ZOOM);
              }}
              endIcon={<CloseIcon />}
            />
          </div>
          <div
            className={`map-overlay-inner ${selectedFeature.properties.severity}`}
          >
            <h3>
              {WeatherEmoji(selectedFeature.properties.event)}{" "}
              {selectedFeature.properties.event}
            </h3>
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
