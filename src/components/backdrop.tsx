// Decorative background, pure CSS and SVG. "hero" adds the node network; "soft" is one quiet
// glow for lower sections.

// Row-major, because the edge loop finds neighbours by index. Jittered off the exact grid so
// the mesh does not read as graph paper.
const COLUMNS = 6;
const ROWS = 4;

const nodes = [
  [7, 16], [24, 10], [41, 20], [58, 12], [75, 18], [93, 11],
  [10, 40], [26, 34], [43, 43], [60, 36], [77, 42], [91, 35],
  [6, 62], [23, 57], [40, 66], [57, 59], [74, 65], [94, 58],
  [12, 86], [28, 80], [45, 89], [62, 82], [79, 88], [90, 81],
] as const;

const edges: Array<[number, number]> = [];
for (let row = 0; row < ROWS; row++) {
  for (let column = 0; column < COLUMNS; column++) {
    const index = row * COLUMNS + column;
    if (column < COLUMNS - 1) edges.push([index, index + 1]);
    if (row < ROWS - 1) edges.push([index, index + COLUMNS]);
  }
}

// None of these are grid neighbours, so no edge is drawn twice.
for (const [from, to] of [[0, 7], [2, 9], [3, 10], [5, 10], [8, 15], [11, 16], [13, 18], [16, 23]]) {
  edges.push([from, to]);
}

function Network() {
  return (
    <svg className="backdrop-net" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {/* A faint solid copy keeps the mesh visible between the travelling dashes. */}
      <g className="net-base">
        {edges.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1={nodes[from][0]}
            y1={nodes[from][1]}
            x2={nodes[to][0]}
            y2={nodes[to][1]}
          />
        ))}
      </g>
      <g className="net-flow">
        {edges.map(([from, to], i) => (
          <line
            key={`${from}-${to}`}
            x1={nodes[from][0]}
            y1={nodes[from][1]}
            x2={nodes[to][0]}
            y2={nodes[to][1]}
            // Negative delays start mid-cycle, so the pulses never march in step.
            style={{ animationDelay: `${((i % 9) * -1.1).toFixed(1)}s` }}
          />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <circle
          key={`${x}-${y}`}
          className="net-node"
          cx={x}
          cy={y}
          style={{ animationDelay: `${((i % 7) * -0.9).toFixed(1)}s` }}
        />
      ))}
    </svg>
  );
}

export function Backdrop({ variant = "hero" }: { variant?: "hero" | "soft" }) {
  return (
    <div aria-hidden="true" className={variant === "soft" ? "backdrop backdrop-soft" : "backdrop"}>
      <span className="backdrop-glow backdrop-glow-a" />
      <span className="backdrop-glow backdrop-glow-b" />
      <span className="backdrop-glow backdrop-glow-c" />
      {variant === "hero" ? <Network /> : null}
      <span className="backdrop-grain" />
    </div>
  );
}
