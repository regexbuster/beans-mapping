import { useParams } from "react-router-dom";

import VectorMap from "./VectorMap";

export default function DynamicMap() {
  const params = useParams();
  const encodedPolyline =
    "encodedPolyline" in params ? params.encodedPolyline : null;

  console.log(encodedPolyline);

  return (
    <>{encodedPolyline !== null && <VectorMap poly={encodedPolyline} />}</>
  );
}
