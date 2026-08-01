import type { ProductMarkName } from "@/lib/brand/product-marks";

/**
 * Illustrated cover scene for each platform.
 *
 * Each product gets a stylised view of its own interface — a course player,
 * a roster, a finance dashboard, a cadastral map — rather than a generic
 * gradient. Drawn as vector rather than raster on purpose:
 *
 *   · ~1 kB each instead of ~100 kB per photo, which matters after the
 *     performance pass (nine hero images would undo most of it);
 *   · crisp at any density with no srcset or image CDN;
 *   · recolours with the brand instead of needing re-rendering.
 *
 * If you supply real screenshots or generated artwork, set `image` on the
 * project in `content/projects.ts` and it takes over — see `ProjectCover`.
 *
 * Coordinate space is 400×300. Everything sits inside a window frame so
 * the set reads as one product family seen through the same lens.
 */

const FRAME = { x: 54, y: 44, w: 292, h: 212, r: 14 } as const;
const INNER = { x: FRAME.x, y: FRAME.y + 26 } as const;

const WHITE = "#ffffff";
const ACCENT = "#f97316";

/** Shared app-window chrome: panel, title bar and traffic lights. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <g>
      <rect
        x={FRAME.x}
        y={FRAME.y}
        width={FRAME.w}
        height={FRAME.h}
        rx={FRAME.r}
        fill={WHITE}
        fillOpacity="0.13"
        stroke={WHITE}
        strokeOpacity="0.34"
        strokeWidth="1.5"
      />
      <path
        d={`M${FRAME.x} ${FRAME.y + 26} H${FRAME.x + FRAME.w}`}
        stroke={WHITE}
        strokeOpacity="0.26"
        strokeWidth="1.5"
      />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={FRAME.x + 16 + i * 12}
          cy={FRAME.y + 13}
          r="3.2"
          fill={WHITE}
          fillOpacity={i === 0 ? 0.75 : 0.34}
        />
      ))}
      {children}
    </g>
  );
}

/** Soft panel used as a card or region inside the window. */
const Panel = (p: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  o?: number;
}) => (
  <rect
    x={p.x}
    y={p.y}
    width={p.w}
    height={p.h}
    rx={p.r ?? 6}
    fill={WHITE}
    fillOpacity={p.o ?? 0.16}
  />
);

/** Text placeholder line. */
const Line = (p: { x: number; y: number; w: number; o?: number }) => (
  <rect
    x={p.x}
    y={p.y}
    width={p.w}
    height="5"
    rx="2.5"
    fill={WHITE}
    fillOpacity={p.o ?? 0.5}
  />
);

/** Accent bar — the one orange element that says what this product does. */
const Accent = (p: { x: number; y: number; w: number; h: number; r?: number }) => (
  <rect
    x={p.x}
    y={p.y}
    width={p.w}
    height={p.h}
    rx={p.r ?? 3}
    fill={ACCENT}
  />
);

const scenes: Record<ProductMarkName, React.ReactNode> = {
  // Course player: video pane, module list, completion bar.
  lms: (
    <>
      <Panel x={INNER.x + 16} y={INNER.y + 16} w={124} h={78} r={8} o={0.2} />
      <path
        d={`M${INNER.x + 66} ${INNER.y + 42} L${INNER.x + 92} ${INNER.y + 55} L${INNER.x + 66} ${INNER.y + 68} Z`}
        fill={ACCENT}
      />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Panel x={INNER.x + 152} y={INNER.y + 16 + i * 27} w={124} h={20} r={6} o={0.14} />
          <circle cx={INNER.x + 164} cy={INNER.y + 26 + i * 27} r="5" fill={WHITE} fillOpacity={i === 0 ? 0.85 : 0.4} />
          <Line x={INNER.x + 176} y={INNER.y + 23 + i * 27} w={i === 0 ? 76 : 58} o={0.45} />
        </g>
      ))}
      <Panel x={INNER.x + 16} y={INNER.y + 106} w={260} h={8} r={4} o={0.2} />
      <Accent x={INNER.x + 16} y={INNER.y + 106} w={158} h={8} r={4} />
    </>
  ),

  // Roster: enrolled records with an attendance read-out.
  sms: (
    <>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Panel x={INNER.x + 16} y={INNER.y + 14 + i * 25} w={176} h={19} r={6} o={i === 0 ? 0.24 : 0.13} />
          <circle
            cx={INNER.x + 28}
            cy={INNER.y + 23.5 + i * 25}
            r="6"
            fill={i === 0 ? ACCENT : WHITE}
            fillOpacity={i === 0 ? 1 : 0.42}
          />
          <Line x={INNER.x + 42} y={INNER.y + 21 + i * 25} w={72} o={0.5} />
          <Line x={INNER.x + 148} y={INNER.y + 21 + i * 25} w={30} o={0.3} />
        </g>
      ))}
      <Panel x={INNER.x + 204} y={INNER.y + 14} w={72} h={100} r={8} o={0.14} />
      {[34, 52, 26, 62].map((h, i) => (
        <rect
          key={i}
          x={INNER.x + 214 + i * 14}
          y={INNER.y + 96 - h}
          width="8"
          height={h}
          rx="3"
          fill={i === 3 ? ACCENT : WHITE}
          fillOpacity={i === 3 ? 1 : 0.45}
        />
      ))}
    </>
  ),

  // E-governance dashboard: KPI tiles over an expenditure trend.
  etrack: (
    <>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Panel x={INNER.x + 16 + i * 68} w={60} y={INNER.y + 14} h={34} r={7} o={i === 1 ? 0.26 : 0.14} />
          <Line x={INNER.x + 24 + i * 68} y={INNER.y + 22} w={26} o={0.35} />
          {i === 1 ? (
            <Accent x={INNER.x + 24 + i * 68} y={INNER.y + 33} w={34} h={7} r={3} />
          ) : (
            <Line x={INNER.x + 24 + i * 68} y={INNER.y + 34} w={40} o={0.6} />
          )}
        </g>
      ))}
      <Panel x={INNER.x + 16} y={INNER.y + 58} w={260} h={58} r={8} o={0.12} />
      <path
        d={`M${INNER.x + 30} ${INNER.y + 100} L${INNER.x + 76} ${INNER.y + 84} L${INNER.x + 118} ${INNER.y + 92} L${INNER.x + 166} ${INNER.y + 70} L${INNER.x + 214} ${INNER.y + 78} L${INNER.x + 262} ${INNER.y + 66}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={INNER.x + 262} cy={INNER.y + 66} r="4.5" fill={ACCENT} />
    </>
  ),

  // Cadastral map: parcels with one registered, plus a record panel.
  land: (
    <>
      <Panel x={INNER.x + 16} y={INNER.y + 14} w={176} h={102} r={8} o={0.14} />
      <g stroke={WHITE} strokeOpacity="0.4" strokeWidth="1.5" fill="none">
        <path d={`M${INNER.x + 16} ${INNER.y + 48} L${INNER.x + 74} ${INNER.y + 36} L${INNER.x + 132} ${INNER.y + 58} L${INNER.x + 192} ${INNER.y + 44}`} />
        <path d={`M${INNER.x + 74} ${INNER.y + 36} L${INNER.x + 84} ${INNER.y + 14}`} />
        <path d={`M${INNER.x + 132} ${INNER.y + 58} L${INNER.x + 142} ${INNER.y + 116}`} />
        <path d={`M${INNER.x + 16} ${INNER.y + 86} L${INNER.x + 78} ${INNER.y + 78}`} />
      </g>
      <path
        d={`M${INNER.x + 78} ${INNER.y + 40} L${INNER.x + 130} ${INNER.y + 58} L${INNER.x + 136} ${INNER.y + 96} L${INNER.x + 84} ${INNER.y + 84} Z`}
        fill={ACCENT}
        fillOpacity="0.92"
      />
      <path
        d={`M${INNER.x + 106} ${INNER.y + 56} a7 7 0 0 0 -7 7 c0 5 7 12 7 12 s7 -7 7 -12 a7 7 0 0 0 -7 -7 Z`}
        fill={WHITE}
      />
      <Panel x={INNER.x + 204} y={INNER.y + 14} w={72} h={102} r={8} o={0.14} />
      {[0, 1, 2, 3].map((i) => (
        <Line key={i} x={INNER.x + 214} y={INNER.y + 28 + i * 20} w={i === 0 ? 34 : 50} o={i === 0 ? 0.7 : 0.34} />
      ))}
    </>
  ),

  // Delivery schedule: staggered tracks, the one in flight lit.
  erp: (
    <>
      {[
        { y: 0, x: 0, w: 96 },
        { y: 26, x: 40, w: 130, accent: true },
        { y: 52, x: 22, w: 84 },
        { y: 78, x: 74, w: 108 },
      ].map((bar, i) => (
        <g key={i}>
          <Line x={INNER.x + 16} y={INNER.y + 22 + bar.y} w={30} o={0.32} />
          {bar.accent ? (
            <Accent x={INNER.x + 58 + bar.x} y={INNER.y + 17 + bar.y} w={bar.w} h={15} r={7.5} />
          ) : (
            <Panel x={INNER.x + 58 + bar.x} y={INNER.y + 17 + bar.y} w={bar.w} h={15} r={7.5} o={0.28} />
          )}
        </g>
      ))}
      <path
        d={`M${INNER.x + 150} ${INNER.y + 8} V${INNER.y + 112}`}
        stroke={WHITE}
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />
    </>
  ),

  // Video call: participant grid and a control bar.
  meet: (
    <>
      {[0, 1, 2, 3].map((i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        return (
          <g key={i}>
            <Panel x={INNER.x + 26 + col * 132} y={INNER.y + 12 + row * 48} w={122} h={42} r={8} o={i === 0 ? 0.26 : 0.14} />
            <circle
              cx={INNER.x + 87 + col * 132}
              cy={INNER.y + 33 + row * 48}
              r="11"
              fill={WHITE}
              fillOpacity={i === 0 ? 0.8 : 0.4}
            />
          </g>
        );
      })}
      <Panel x={INNER.x + 88} y={INNER.y + 112} w={116} h={22} r={11} o={0.2} />
      <circle cx={INNER.x + 112} cy={INNER.y + 123} r="6.5" fill={WHITE} fillOpacity="0.7" />
      <circle cx={INNER.x + 134} cy={INNER.y + 123} r="6.5" fill={WHITE} fillOpacity="0.7" />
      <rect x={INNER.x + 152} y={INNER.y + 115} width="34" height="16" rx="8" fill={ACCENT} />
    </>
  ),

  // Reach: a globe with learner nodes wired back to it.
  distance: (
    <>
      <circle cx={INNER.x + 96} cy={INNER.y + 62} r="46" fill={WHITE} fillOpacity="0.15" />
      <circle cx={INNER.x + 96} cy={INNER.y + 62} r="46" fill="none" stroke={WHITE} strokeOpacity="0.45" strokeWidth="1.5" />
      <path d={`M${INNER.x + 50} ${INNER.y + 62} H${INNER.x + 142}`} stroke={WHITE} strokeOpacity="0.4" strokeWidth="1.5" />
      <path
        d={`M${INNER.x + 96} ${INNER.y + 16} C${INNER.x + 72} ${INNER.y + 40} ${INNER.x + 72} ${INNER.y + 84} ${INNER.x + 96} ${INNER.y + 108} C${INNER.x + 120} ${INNER.y + 84} ${INNER.x + 120} ${INNER.y + 40} ${INNER.x + 96} ${INNER.y + 16} Z`}
        fill="none"
        stroke={WHITE}
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      <ellipse
        cx={INNER.x + 96}
        cy={INNER.y + 62}
        rx="62"
        ry="22"
        fill="none"
        stroke={ACCENT}
        strokeWidth="3"
        transform={`rotate(-20 ${INNER.x + 96} ${INNER.y + 62})`}
      />
      {[
        { x: 210, y: 26 },
        { x: 240, y: 66 },
        { x: 206, y: 102 },
      ].map((node, i) => (
        <g key={i}>
          <path
            d={`M${INNER.x + 142} ${INNER.y + 62} L${INNER.x + node.x} ${INNER.y + node.y}`}
            stroke={WHITE}
            strokeOpacity="0.32"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle cx={INNER.x + node.x} cy={INNER.y + node.y} r="7" fill={i === 1 ? ACCENT : WHITE} fillOpacity={i === 1 ? 1 : 0.55} />
        </g>
      ))}
    </>
  ),

  // Threat monitor: signal trace with an alert picked out.
  security: (
    <>
      <Panel x={INNER.x + 16} y={INNER.y + 14} w={176} h={100} r={8} o={0.13} />
      <path
        d={`M${INNER.x + 28} ${INNER.y + 74} L${INNER.x + 52} ${INNER.y + 74} L${INNER.x + 62} ${INNER.y + 50} L${INNER.x + 74} ${INNER.y + 92} L${INNER.x + 86} ${INNER.y + 40} L${INNER.x + 98} ${INNER.y + 74} L${INNER.x + 180} ${INNER.y + 74}`}
        fill="none"
        stroke={WHITE}
        strokeOpacity="0.6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={INNER.x + 86} cy={INNER.y + 40} r="6" fill={ACCENT} />
      <Panel x={INNER.x + 204} y={INNER.y + 14} w={72} h={100} r={8} o={0.14} />
      <path
        d={`M${INNER.x + 240} ${INNER.y + 32} L${INNER.x + 258} ${INNER.y + 40} V${INNER.y + 58} C${INNER.x + 258} ${INNER.y + 72} ${INNER.x + 248} ${INNER.y + 80} ${INNER.x + 240} ${INNER.y + 84} C${INNER.x + 232} ${INNER.y + 80} ${INNER.x + 222} ${INNER.y + 72} ${INNER.x + 222} ${INNER.y + 58} V${INNER.y + 40} Z`}
        fill="none"
        stroke={WHITE}
        strokeOpacity="0.7"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d={`M${INNER.x + 233} ${INNER.y + 57} l6 6 l11 -12`} fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),

  // Presence: reach climbing, with an engagement read-out.
  brand: (
    <>
      <Panel x={INNER.x + 16} y={INNER.y + 14} w={166} h={100} r={8} o={0.13} />
      {[26, 40, 34, 58, 72].map((h, i) => (
        <rect
          key={i}
          x={INNER.x + 32 + i * 28}
          y={INNER.y + 98 - h}
          width="16"
          height={h}
          rx="5"
          fill={i === 4 ? ACCENT : WHITE}
          fillOpacity={i === 4 ? 1 : 0.42}
        />
      ))}
      <Panel x={INNER.x + 194} y={INNER.y + 14} w={82} h={100} r={8} o={0.14} />
      <circle cx={INNER.x + 235} cy={INNER.y + 52} r="24" fill="none" stroke={WHITE} strokeOpacity="0.3" strokeWidth="7" />
      <path
        d={`M${INNER.x + 235} ${INNER.y + 28} a24 24 0 0 1 20 37`}
        fill="none"
        stroke={ACCENT}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <Line x={INNER.x + 208} y={INNER.y + 90} w={54} o={0.45} />
      <Line x={INNER.x + 216} y={INNER.y + 102} w={38} o={0.28} />
    </>
  ),

  // Certificate: an issued award with a seal.
  academy: (
    <>
      <Panel x={INNER.x + 78} y={INNER.y + 10} w={136} h={108} r={8} o={0.2} />
      <path
        d={`M${INNER.x + 118} ${INNER.y + 32} L${INNER.x + 174} ${INNER.y + 32}`}
        stroke={WHITE}
        strokeOpacity="0.75"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {[0, 1, 2].map((i) => (
        <Line key={i} x={INNER.x + 100 + (i === 2 ? 20 : 0)} y={INNER.y + 50 + i * 14} w={i === 2 ? 52 : 92} o={0.38} />
      ))}
      <circle cx={INNER.x + 146} cy={INNER.y + 96} r="15" fill={ACCENT} />
      <path
        d={`M${INNER.x + 139} ${INNER.y + 96} l5 5 l9 -10`}
        fill="none"
        stroke={WHITE}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

export function ProductScene({ mark }: { mark: ProductMarkName }) {
  return <Frame>{scenes[mark]}</Frame>;
}
