import { Box } from "@chakra-ui/react";

interface VideoProps {
  src: string | undefined;
  minW?: string;
  maxW?: string;
  width?: string;
  minH?: string;
  height?: string;
}

const Video: React.FC<VideoProps> = ({
  src,
  minW,
  maxW,
  width,
  minH,
  height,
}) => {
  return (
    <Box>
      {/* <video
        controls
        width={width}
        style={{
          minWidth: minW,
          maxWidth: maxW,
          borderRadius: "10px",
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <iframe
        style={{
          width,
          minWidth: minW,
          maxWidth: maxW,
          height,
          minHeight: minH,
          borderRadius: "10px",
        }}
        src={src || "https://www.youtube.com/embed/rw7bxTqkYYs"}
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    </Box>
  );
};

export default Video;
