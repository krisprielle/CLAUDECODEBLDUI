import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

const BLUE = "#1a6cff";
const BLUE_LIGHT = "#4d8fff";
const BG = "#080808";
const SURFACE = "#111114";

interface Props {
  title: string;
  subtitle: string;
}

// A single stat card that animates in
const StatCard: React.FC<{
  label: string;
  value: string;
  unit: string;
  delay: number;
}> = ({ label, value, unit, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [delay, delay + 20], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        background: "rgba(26,108,255,0.14)",
        border: "1px solid rgba(26,108,255,0.28)",
        borderRadius: 20,
        padding: "28px 40px",
        textAlign: "center",
        flex: 1,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          marginBottom: 8,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 64,
          background: `linear-gradient(135deg, ${BLUE_LIGHT}, ${BLUE})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
        }}
      >
        {value}
        <span style={{ fontSize: 28, marginLeft: 4 }}>{unit}</span>
      </div>
    </div>
  );
};

export const BldWorkoutHighlight: React.FC<Props> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header slide down
  const headerY = interpolate(frame, [0, 30], [-80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title scale spring
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
    durationInFrames: 40,
  });

  // Progress bar fill (animates from 0 → 100% over 120 frames after frame 60)
  const progressWidth = interpolate(frame, [60, 180], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top header bar */}
      <div
        style={{
          transform: `translateY(${headerY}px)`,
          background: "rgba(8,8,8,0.9)",
          borderBottom: "1px solid rgba(255,255,255,0.09)",
          padding: "60px 48px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 48,
            background: `linear-gradient(135deg, ${BLUE_LIGHT}, ${BLUE})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          BLD
        </span>
        <span style={{ fontSize: 20, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
          Workout Recap
        </span>
      </div>

      {/* Main content */}
      <div style={{ padding: "48px 48px 0", flex: 1 }}>
        {/* Title */}
        <div style={{ transform: `scale(${titleScale})`, transformOrigin: "left center", marginBottom: 8 }}>
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 96,
              letterSpacing: "0.06em",
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {title}
          </h1>
        </div>

        <p style={{ fontSize: 28, color: "rgba(255,255,255,0.55)", marginBottom: 48, fontWeight: 500 }}>
          {subtitle}
        </p>

        {/* Progress bar */}
        <Sequence from={40}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
                Completion
              </span>
              <span style={{ fontSize: 16, fontWeight: 700, color: BLUE_LIGHT }}>
                {Math.round(progressWidth)}%
              </span>
            </div>
            <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4 }}>
              <div
                style={{
                  height: "100%",
                  width: `${progressWidth}%`,
                  background: `linear-gradient(90deg, ${BLUE}, ${BLUE_LIGHT})`,
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
        </Sequence>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 20 }}>
          <StatCard label="Sets" value="18" unit="" delay={80} />
          <StatCard label="Reps" value="216" unit="" delay={100} />
          <StatCard label="Volume" value="8.4" unit="t" delay={120} />
        </div>
      </div>

      {/* Bottom CTA */}
      <Sequence from={200}>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 48,
            right: 48,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${BLUE}, ${BLUE_LIGHT})`,
              borderRadius: 20,
              padding: "32px 48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 40,
                letterSpacing: "0.08em",
                color: "#fff",
              }}
            >
              Join the Community
            </span>
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
