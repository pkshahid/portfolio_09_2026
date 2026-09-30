type SectionHeadingProps = {
  title: string;
  description?: string;
  meta?: string;
};

export function SectionHeading({ title, description, meta }: SectionHeadingProps) {
  return (
    <div className="section-head">
      <div>
        <h2 className="section-title">{title}</h2>
        {description ? <p className="section-desc">{description}</p> : null}
      </div>
      {meta ? <span className="section-meta">{meta}</span> : null}
    </div>
  );
}
