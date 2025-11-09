const ImpactChart = () => {
  // DESIGN FIX: Changed bg-gray-900 to a clean border style
  return (
    <div className="bg-black border border-gray-800 p-6 rounded-lg">
      <h3 className="text-lg font-semibold">My Impact</h3>
      <p className="text-sm text-gray-400 mb-6">Yield Contributed to Education Over Time</p>
      <div className="w-full h-64 bg-gray-900 rounded-md flex items-center justify-center">
        <p className="text-gray-500">[Chart Data Visualized Here]</p>
      </div>
    </div>
  );
};
export default ImpactChart;
