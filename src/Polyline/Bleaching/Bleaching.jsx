import { useState } from "react";

export default function Bleaching() {
  const [bleachingData, setBleachingData] = useState("");
  const [error, setError] = useState(null);

  const parse = (formData) => {
    try {
      const coordStr = formData.get("bleachingData");
      const coordJSON = JSON.parse(coordStr);

      const path = coordJSON.bleeching.path;
      const geo = coordJSON.geo;

      let sortedPath = [];

      Object.keys(path)
        .sort()
        .forEach((key) => {
          sortedPath.push({ ...path[key], geo: geo[path[key].address] });
        });

      let coordPath = [];

      sortedPath.forEach((point, index) => {
        if (point.geo == "NA") {
          return;
        }

        const pointGeoArr = point.geo.split(",").map((value) => value.trim());

        // remove duplicates unless first or previous point is not the same
        if (
          index == 0 ||
          coordPath[coordPath.length - 1].join(", ") != point.geo
        ) {
          coordPath.push(pointGeoArr);
        }
      });

      setBleachingData(coordPath);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1>Decoding Bleaching Data</h1>
      <p>
        Get you bleaching data from{" "}
        <a href="https://ready4l4s.cerfca.st/diagnose">here</a> if you want to
        use this tool.
      </p>

      <form action={parse}>
        <textarea name="bleachingData" value={bleachingData}></textarea>
        <button type="submit">Parse</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}
