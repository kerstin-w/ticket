const KPI = ({ title, value, bgColor, textColor }) => (
  <div className={`border rounded p-4 ${bgColor}`}>
    <h2 className={`font-bold text-lg ${textColor}`}>{title}</h2>
    <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
  </div>
);

export default KPI;
