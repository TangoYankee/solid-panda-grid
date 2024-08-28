import { JSX, JSXElement, onMount } from "solid-js";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl, { Map } from "maplibre-gl";

export function Atlas(props: JSX.HTMLAttributes<HTMLDivElement>): JSXElement {
  let map: Map;
  let mapContainer: HTMLDivElement;

  onMount(() => {
    map = new maplibregl.Map({
      container: mapContainer,
      center: [-74.0, 40.68],
      style: "https://tiles.planninglabs.nyc/styles/positron/style.json",
      zoom: 9,
    });
  });
  return <div ref={mapContainer!} {...props} />;
}
