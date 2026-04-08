interface InfoChipProps {
  icon: string;
  label: string;
  value: string;
}

function InfoChip({ icon, label, value }: InfoChipProps) {
  return (
    <div className="info-chip">
      <span className="info-icon">{icon}</span>
      <div>
        <div className="info-label">{label}</div>
        <div className="info-value">{value}</div>
      </div>
    </div>
  );
}

export default InfoChip;
