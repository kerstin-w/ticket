const PriorityDisplay = ({ priority }) => {
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1:
        return { label: 'Must Have', color: 'bg-red-400' };
      case 2:
        return { label: 'Should Have', color: 'bg-orange-400' };
      case 3:
        return { label: 'Could Have', color: 'bg-yellow-400' };
      case 4:
        return { label: 'Will Not Have', color: 'bg-gray-400' };
      default:
        return { label: 'Unknown', color: 'bg-slate-400' };
    }
  };

  const { label, color } = getPriorityLabel(priority);

  return (
    <div
      className={`flex justify-start align-baseline ${color} py-1 px-2 rounded-2xl`}
    >
      <span className="text-white">{label}</span>
    </div>
  );
};

export default PriorityDisplay;
