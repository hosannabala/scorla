export default function StatCard({ title, value, icon, subtitle, trend, highlight }) {
  return (
    <div className={`
      relative overflow-hidden rounded-xl p-6 
      ${highlight 
        ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-500/50' 
        : 'bg-gray-900/50 border border-gray-700'
      }
      backdrop-blur-sm hover:scale-105 transition-transform duration-200 shadow-xl
    `}>
      {highlight && (
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
      )}
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400 text-sm font-medium">{title}</span>
          <span className="text-3xl">{icon}</span>
        </div>
        
        <div className="mb-2">
          <span className={`text-4xl font-bold ${highlight ? 'text-white' : 'text-white'}`}>
            {value}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">{subtitle}</span>
          {trend && (
            <span className="text-green-400 text-sm font-semibold">
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
