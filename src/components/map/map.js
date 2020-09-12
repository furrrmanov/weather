import React from "react";
import mapboxgl from "mapbox-gl";

import "./map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZnVycnJtYW5vdiIsImEiOiJjazl1MmczdGEwMnRyM2ZwYTdodTQ1M3Q3In0.c0-4CIdIW8CxLw5FMGm5xA";

export default class Map extends React.Component {
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { lat, lon } = this.props.coord;

    if (this.props !== prevProps) {
      const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lon, lat],
        zoom: 11,
      });

      new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);
    }
  }

  render() {
    return <div id="map" ref={(el) => (this.mapContainer = el)} />;
  }
}
