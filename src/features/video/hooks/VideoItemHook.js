import { useEffect, useState } from "react";
import VideoApi from "../../../api/admin/video/VideoApi";

export default function useVideoItem(videoID) {
  const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const videoApi = new VideoApi();

        const result = await videoApi.getByID(videoID);

        setVideo(result.data.data);
      } catch (error) {
        console.log("Error in hook name is useVideoItem: ", error);
      }

      setLoading(false);
    })();
  }, [videoID]);

  return { loading, video };
}
