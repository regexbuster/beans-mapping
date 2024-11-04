"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { decode } from "@googlemaps/polyline-codec";

const PolylineStatus = {
  NoPolyline: "nopolyline",
  DecodeFailed: "decodefail",
  Success: "success",
  Unknown: "unknown",
};

function geoMidpoint(posArr) {
  let lat = { min: posArr[0][0], max: posArr[0][0] };
  let long = { min: posArr[1][1], max: posArr[1][1] };

  posArr.forEach((position) => {
    if (position[0] < lat.min) {
      lat.min = position[0];
    } else if (position[0] > lat.max) {
      lat.max = position[0];
    }
    if (position[1] < long.min) {
      long.min = position[1];
    } else if (position[1] > long.max) {
      long.max = position[1];
    }
  });

  return [(lat.min + lat.max) / 2, (long.min + long.max) / 2];
}

function getPolylineArray(polyline) {
  try {
    if (!polyline) {
      return { status: PolylineStatus.NoPolyline };
    }

    // decodeURIComponent because some characters get messed with in the URL and need to come back
    const decodedPolyline = decode(decodeURIComponent(polyline));

    return {
      status: PolylineStatus.Success,
      line: decodedPolyline,
      mid: geoMidpoint(decodedPolyline),
    };
  } catch (err) {
    console.error(err);
    return { status: PolylineStatus.DecodeFailed };
  }
}

export default function VectorMap({ poly }) {
  const mapNode = useRef(null);
  const mapContainer = useRef(null);

  const status = useRef(PolylineStatus.Unknown);

  useEffect(() => {
    const node = mapContainer.current;

    // no windown = rendered on server or no dom initialized
    // !poly to wait unless data is passed into VectorMap
    if (typeof window === "undefined" || node === null || !poly) {
      console.log("womp", typeof window === "undefined", node === null, poly);
      return;
    }

    const polylineRes = getPolylineArray(poly);

    status.current = polylineRes.status;

    if (polylineRes.status !== PolylineStatus.Success) {
      console.log("womp womp");
      return;
    }

    mapNode.current = new mapboxgl.Map({
      container: mapContainer.current,
      accessToken:
        "pk.eyJ1IjoicmVnZXhidXN0ZXIiLCJhIjoiY20xNnZrZjJoMGVrcjJtb3Fvemw1dm42MiJ9.Ls2pmwetOTnNF7Ssw6dCJg",
      style: "mapbox://styles/mapbox/streets-v11",
      // needs flipped becasue this section decided to do coordinate pairs differently
      center: [polylineRes.mid[1], polylineRes.mid[0]],
      zoom: 5,
    });

    mapNode.current.on("load", () => {
      mapNode.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            // coordinates need flipped here because why not
            coordinates: polylineRes.line.map((val) => [val[1], val[0]]),
          },
        },
      });

      mapNode.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#FF0000",
          "line-width": 8,
        },
      });
    });

    return () => {
      mapNode.current.remove();
      mapNode.current = null;
    };
  });

  // return <div ref={mapNode} style={{ width: '100vw', height: '100vh' }} />;
  /*
        {status.current == PolylineStatus.NoPolyline && (
                <p>No Polyline Detected in URL</p>
            )}
            {status.current == PolylineStatus.DecodeFailed && (
                <p>Invalid Polyline in URL</p>
            )}
            {status.current == PolylineStatus.Success && <p>Success</p>}
            {status.current == PolylineStatus.Unknown && <p>Invalid</p>}
    */
  return (
    <>
      <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />
    </>
  );
}
