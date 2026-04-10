import { Composition } from "remotion";
import { BldIntro } from "./compositions/BldIntro";
import { BldWorkoutHighlight } from "./compositions/BldWorkoutHighlight";

// Register all video compositions here
export const Root: React.FC = () => {
  return (
    <>
      {/* 15-second intro/branding video — 1080×1920 (9:16 vertical) */}
      <Composition
        id="BldIntro"
        component={BldIntro}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* 30-second workout highlight reel */}
      <Composition
        id="BldWorkoutHighlight"
        component={BldWorkoutHighlight}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "TODAY'S WORKOUT",
          subtitle: "Push Day · 45 min",
        }}
      />
    </>
  );
};
