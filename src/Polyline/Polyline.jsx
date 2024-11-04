import { decode, encode } from "@googlemaps/polyline-codec";
import { useState } from "react";

export default function Polyline() {
  const words = "<latitude>, <longitude>";

  const [encodedText, setEncodedText] = useState("10, 12\n12, 10\n15, 15");
  const [decodedText, setDecodedText] = useState("");

  const [error, setError] = useState(null);

  const encodeData = (formData) => {
    try {
      // split by newline, trim whitespace, split each pair by ',', then trim again
      const cleanedCoords = formData
        .get("coords")
        .split("\n")
        .map((elem) => {
          return elem
            .trim()
            .split(",")
            .map((elem) => {
              return elem.trim();
            });
        });
      const encodedPolyline = encode(cleanedCoords);
      console.log(cleanedCoords, encodedPolyline);
      setDecodedText(encodedPolyline);
    } catch (e) {
      setError(e.message);
    }
  };

  const decodeData = (formData) => {
    try {
      const encodedPolyline = formData.get("encodedPolyline");
      const coords = decode(encodedPolyline);
      const polishedCoords = coords.join("\n");
      setEncodedText(polishedCoords);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div>
      <h1>Encoded Polyline Algorithm Format</h1>
      <p>
        This is a quick demonstration of the polyline encoding method used on
        the website. Converting a series or coordinates into this encoded
        polyline is a lossless transformation and allows data to be sent easier
        and understood better by tools like MapBox.
      </p>
      <p>
        The encoding side takes a list of coordinate pairs in {words} form
        (where each pair is separated by a new line) and turns it into a string
        of characters (the encoded polyline). This same string of characters can
        later be decoded back into the coordinate pairs to be used.
      </p>
      <div>
        <div>
          <form action={encodeData}>
            <textarea
              name="coords"
              value={encodedText}
              onChange={(e) => {
                setEncodedText(e.target.value);
              }}
            ></textarea>
            <button type="submit">Encode</button>
          </form>
        </div>
        <div>
          <form action={decodeData}>
            <textarea
              name="encodedPolyline"
              value={decodedText}
              onChange={(e) => {
                setDecodedText(e.target.value);
              }}
            ></textarea>
            <button type="submit">Decode</button>
          </form>
        </div>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}
