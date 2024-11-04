import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useEffect } from "react";

export default function Index({ opts }) {
  const search = opts.slice(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      console.log(search);

      navigate(`/${search}`);
    }
  }, [search, navigate]);

  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <h1>Bleaching Explanation and Networking Status (BEANS)</h1>
        <h2>What is BEANS?</h2>
        <p>
          BEANS is an important website section to explore how bleaching
          restricts rollout of L4S into the network infrastructure. This is
          because some services bleach headers from packets as they're
          travelling through the Internet. These headers contain information
          that is necessary for L4S to function. We can use the tools deployed
          via BEANS to see where issues are in the network infrastructure and
          where to fix bleaching issues, to help the rollout of L4S web-wide.
        </p>

        <h2>Polylines</h2>
        <p>
          On the BEANS website you can learn more about polylines and the
          encoding patterns that we can use to shrink the size of tons of
          coordinate pairs into a short string of characters. We have a
          transcoder that you can use to try out encoding and decoding of
          polylines.
        </p>

        <h2>Bleaching</h2>
        <p>
          We use a tool to check if your Internet connection has a device that
          bleaches your packet headers. You can use that data and step through
          the process of converting it into a set of polyline coordinates and
          then into a encoded polyline string. You can use that string to
          generate static and dynamic maps to showcase the hops your packets
          take across the Internet.
        </p>

        <h2>Maps</h2>
        <p>
          We utilize MapBox to display dynamic and static maps to show the paths
          that you packets take and if they are bleached in the process of
          transfer. These maps can then be embedded elsewhere to showcase the
          path travelled or static images can be downloaded and posted elsewhere
          to show others where bleaching is occuring.
        </p>

        <h2>API</h2>
        <p>
          We also host a couple API-like endpoints for automated encoding,
          decoding, and static image generation.
        </p>
      </div>
    </div>
  );
}
