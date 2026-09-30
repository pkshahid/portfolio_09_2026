import { Layers } from './icons';

export function SystemDiagram() {
  return (
    <div className="diagram">
      <svg className="wires" viewBox="0 0 450 330" preserveAspectRatio="none" aria-hidden="true">
        <path d="M115 62 L225 128" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M335 62 L225 128" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M225 200 L115 268" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M225 200 L335 268" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="diagram-label">A backend engineer’s toolkit</span>
      <div className="diagram-rows">
        <div className="diagram-row">
          <div className="node">
            APIs
            <span className="sub">REST · gRPC</span>
          </div>
          <div className="node">
            Workers
            <span className="sub">Async processing</span>
          </div>
        </div>
        <div className="node-center">
          <Layers size={22} aria-hidden="true" />
          <div>
            <span className="t">Python + Go</span>
            <span className="sub" style={{ display: 'block' }}>Backend services</span>
          </div>
        </div>
        <div className="diagram-row">
          <div className="node">
            Data
            <span className="sub">PostgreSQL · Redis</span>
          </div>
          <div className="node">
            Infrastructure
            <span className="sub">Docker · AWS EC2</span>
          </div>
        </div>
      </div>
      <span className="diagram-foot">Illustrative system view</span>
    </div>
  );
}
