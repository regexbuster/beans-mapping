import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AspectRatios = {
  OneByOne: "1:1",
  FourByThree: "4:3",
  SixteenByNine: "16:9",
};

function aspectToDimension(aspect) {
  switch (aspect) {
    case AspectRatios.OneByOne:
      return { width: 1280, height: 1280 };
    case AspectRatios.FourByThree:
      return { width: 1280, height: 960 };
    case AspectRatios.SixteenByNine:
      return { width: 1280, height: 720 };
    default:
      return { width: 100, height: 100 };
  }
}

async function getImageURL(polyline, dimensions) {
  let data = await fetch(
    `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/path-5+f44-0.5(${polyline})/auto/${dimensions.width}x${dimensions.height}?access_token=pk.eyJ1IjoicmVnZXhidXN0ZXIiLCJhIjoiY20xNnZrZjJoMGVrcjJtb3Fvemw1dm42MiJ9.Ls2pmwetOTnNF7Ssw6dCJg`
  );

  let blob = await data.blob();

  let imageURL = URL.createObjectURL(blob);

  return imageURL;
}

export default function StaticMap() {
  const params = useParams();

  const aspectRatio = "aspectRatio" in params ? params.aspectRatio : null;

  const encodedPolyline =
    "encodedPolyline" in params ? params.encodedPolyline : null;

  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (aspectRatio !== null && encodedPolyline !== null) {
      getImageURL(encodedPolyline, aspectToDimension(aspectRatio)).then(
        (url) => {
          setImageURL(url);
        }
      );
    }
  }, [encodedPolyline, aspectRatio]);

  return (
    <>
      {imageURL !== null && (
        <img src={imageURL} alt={"map of user's request"}></img>
      )}
    </>
  );
}
