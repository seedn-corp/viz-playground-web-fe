export const CustomTooltip = ({
  active,
  payload,
  label,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: 'none', // 테두리 제거
        borderRadius: 8,
        padding: '10px 14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        fontSize: 13,
        color: '#333',
        minWidth: 120,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4, color: '#555' }}>
        {label}
      </div>
      {(payload as { name: string; value: number }[]).map((entry, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 500,
            color: '#111',
            marginBottom: 2,
          }}
        >
          <span>{entry.name}</span>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};
