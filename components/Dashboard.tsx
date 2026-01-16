
import React, { useState } from 'react';
import { getGeminiResponse } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const stats = [
    { label: 'Active Sessions', value: '2,420', trend: '+12%', icon: 'fa-users', color: 'bg-blue-500' },
    { label: 'AI Requests', value: '154k', trend: '+5.4%', icon: 'fa-microchip', color: 'bg-purple-500' },
    { label: 'System Health', value: '99.9%', trend: 'Stable', icon: 'fa-heartbeat', color: 'bg-emerald-500' },
  ];

  const handleAskAI = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const result = await getGeminiResponse(prompt);
    setResponse(result || "No response");
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg`}>
              <i className={`fas ${stat.icon} text-xl`}></i>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <span className={`text-xs font-semibold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-gray-400'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Assistant Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
            <i className="fas fa-wand-magic-sparkles text-indigo-500 mr-2"></i>
            مساعد الذكاء الاصطناعي (AI Assistant)
          </h3>
          <div className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="How can I help you today?"
              className="w-full h-32 p-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
            />
            <button
              onClick={handleAskAI}
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <i className="fas fa-circle-notch fa-spin mr-2"></i>
              ) : (
                <i className="fas fa-paper-plane mr-2"></i>
              )}
              {loading ? 'Processing...' : 'Ask AI'}
            </button>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl overflow-y-auto max-h-[350px]">
          <h3 className="text-lg font-bold mb-4 opacity-70">AI Output</h3>
          <div className="prose prose-invert max-w-none">
            {response ? (
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{response}</p>
            ) : (
              <p className="text-slate-500 italic">Results will appear here...</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity Mockup */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent System Logs</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <p className="text-sm font-medium text-gray-700">API Gateway request authenticated successfully</p>
              </div>
              <span className="text-xs text-gray-400">2 mins ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
