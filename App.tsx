import React, { useState } from 'react';
import DerivativeVis from './components/DerivativeVis';
import IntegralVis from './components/IntegralVis';
import AiTutor from './components/AiTutor';
import { ViewState } from './types';

const App = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  
  // Helper to check mobile view width for responsive props
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const chartWidth = isMobile ? 320 : 500;
  const chartHeight = isMobile ? 250 : 350;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
              className="flex items-center cursor-pointer gap-2"
              onClick={() => setView(ViewState.HOME)}
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                ∫
              </div>
              <span className="text-xl font-bold text-slate-900">VisualCalculus</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => setView(ViewState.HOME)}
                className={`${view === ViewState.HOME ? 'text-indigo-600' : 'text-slate-500'} hover:text-indigo-600 px-3 py-2 font-medium transition-colors`}
              >
                Start
              </button>
              <button 
                onClick={() => setView(ViewState.DERIVATIVE)}
                className={`${view === ViewState.DERIVATIVE ? 'text-indigo-600' : 'text-slate-500'} hover:text-indigo-600 px-3 py-2 font-medium transition-colors`}
              >
                Derivatives
              </button>
              <button 
                onClick={() => setView(ViewState.INTEGRAL)}
                className={`${view === ViewState.INTEGRAL ? 'text-indigo-600' : 'text-slate-500'} hover:text-indigo-600 px-3 py-2 font-medium transition-colors`}
              >
                Integrals
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu Bar */}
        <div className="md:hidden flex justify-around border-t border-slate-100 py-2 bg-white text-xs text-slate-600 font-medium">
             <button onClick={() => setView(ViewState.HOME)} className="flex flex-col items-center">
                <span className={view === ViewState.HOME ? "text-indigo-600" : ""}>Home</span>
             </button>
             <button onClick={() => setView(ViewState.DERIVATIVE)} className="flex flex-col items-center">
                <span className={view === ViewState.DERIVATIVE ? "text-indigo-600" : ""}>Derivative</span>
             </button>
             <button onClick={() => setView(ViewState.INTEGRAL)} className="flex flex-col items-center">
                <span className={view === ViewState.INTEGRAL ? "text-indigo-600" : ""}>Integral</span>
             </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {view === ViewState.HOME && (
          <div className="max-w-3xl mx-auto text-center space-y-12 animate-fade-in">
            <div className="space-y-6 py-12">
              <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">
                Calculus, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Visualized</span>.
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Explore the mathematics of change and accumulation through interactive graphs. 
                Powered by AI to answer your questions in real-time.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <button 
                  onClick={() => setView(ViewState.DERIVATIVE)}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-lg hover:bg-indigo-700 transform hover:-translate-y-1 transition-all"
                >
                  Explore Slope
                </button>
                <button 
                  onClick={() => setView(ViewState.INTEGRAL)}
                  className="px-8 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-full font-semibold shadow-sm hover:border-indigo-300 transition-all"
                >
                  Explore Area
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4 text-rose-600">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                   </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Derivative</h3>
                <p className="text-slate-600 text-sm">
                  Understand instantaneous rates of change. See how the slope of a tangent line relates to the function's curve at a specific point.
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                   </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Integral</h3>
                <p className="text-slate-600 text-sm">
                  Visualize accumulation. See how adding up infinitely many tiny rectangles gives us the exact area under a curve.
                </p>
              </div>
            </div>
          </div>
        )}

        {view === ViewState.DERIVATIVE && (
          <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">The Derivative</h2>
                <p className="text-slate-600 mb-6">
                  The derivative represents the slope of the tangent line at any single point. 
                  Move the point along the curve to see how the slope changes.
                  <br/>
                  <span className="text-xs text-slate-400 mt-2 block">Function: f(x) = x³/3 - x</span>
                </p>
                <div className="flex justify-center">
                  <DerivativeVis width={chartWidth} height={chartHeight} />
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
               <AiTutor context="Derivatives in Calculus" />
            </div>
          </div>
        )}

        {view === ViewState.INTEGRAL && (
          <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
             <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">The Integral</h2>
                <p className="text-slate-600 mb-6">
                  Integration finds the area under a curve. We approximate this by adding up rectangles (Riemann Sums).
                  As the number of rectangles increases, the approximation becomes exact.
                  <br/>
                  <span className="text-xs text-slate-400 mt-2 block">Function: f(x) = 0.1x² + 1</span>
                </p>
                <div className="flex justify-center">
                  <IntegralVis width={chartWidth} height={chartHeight} />
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
               <AiTutor context="Integrals and Riemann Sums" />
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;