import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// BLD brand colours — mirror what's in bld-app.html
const BLUE = "#1a6cff";
const BLUE_LIGHT = "#4d8fff";
const BG = "#080808";

export const BldIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale-up spring on entry
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
    durationInFrames: 40,
  });

  // Tagline fade + slide in after frame 30
  const taglineOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [30, 60], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Blue glow pulse
  const glowOpacity = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.3, 0.7, 0.3],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: BG, justifyContent: "center", alignItems: "center" }}>
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BLUE}55 0%, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      {/* BLD logo text */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 160,
          letterSpacing: "0.1em",
          background: `linear-gradient(135deg, ${BLUE_LIGHT}, ${BLUE})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
        }}
      >
        BLD
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          marginTop: 24,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 32,
          fontWeight: 600,
          color: "rgba(255,255,255,0.7)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
        }}
      >
        Build Together
      </div>
    </AbsoluteFill>
  );
};
