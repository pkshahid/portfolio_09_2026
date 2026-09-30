import type { Work } from '@/lib/portfolio';
import { Plus } from './icons';

export function WorkCard({ work }: { work: Work }) {
  return (
    <article id={work.id} className="work-card">
      <div className="work-topline">
        <span className="work-category">{work.category}</span>
        <span className="work-employer">Epixel Solutions</span>
      </div>
      <div className="work-grid">
        <div className="work-content">
          <h3>{work.title}</h3>
          <p className="work-summary">{work.summary}</p>
          <p className="contribution-label">My contribution</p>
          <p className="work-contribution">{work.contribution}</p>
        </div>
        <div className="work-proof">
          <strong>{work.metric}</strong>
          <span>{work.metricLabel}</span>
        </div>
      </div>
      <div className="work-bottom">
        <ul className="chips">
          {work.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <details className="notes">
        <summary>
          Context &amp; outcome
          <span className="ic"><Plus size={14} /></span>
        </summary>
        <div className="notes-body">
          <div>
            <h4>Context</h4>
            <p>{work.context}</p>
          </div>
          <div>
            <h4>Outcome</h4>
            <p>{work.outcome}</p>
          </div>
        </div>
      </details>
    </article>
  );
}
