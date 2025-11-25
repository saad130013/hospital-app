
import React, { useState, useMemo, useContext } from 'react';
import { AppConfig, InspectionRecord } from '../types';
import { Select } from './Select';
import { Button } from './Button';
import { ChecklistRow } from './ChecklistRow';
import { ReportTemplate } from './ReportTemplate';
import { LanguageContext, translations } from '../i18n';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend 
} from 'recharts';

interface Props {
  data: AppConfig;
  history: InspectionRecord[];
  onHistoryUpdate: (newHistory: InspectionRecord[]) => void;
  onExit: () => void;
}

type Screen = 'HOME' | 'CHECKLIST' | 'SUMMARY' | 'DASHBOARD' | 'INSPECTOR_REPORTS' | 'REPORT_DETAIL' | 'MY_DASHBOARD';
type TimeFilter = 'week' | 'month' | 'quarter' | 'year';

export const InspectionApp: React.FC<Props> = ({ data, history, onHistoryUpdate, onExit }) => {
  const { lang, setLang, dir } = useContext(LanguageContext);
  const t = translations[lang];

  const [screen, setScreen] = useState<Screen>('HOME');
  
  // Selection State
  const [selectedInspector, setSelectedInspector] = useState('');
  const [selectedZoneType, setSelectedZoneType] = useState('');
  const [selectedZoneName, setSelectedZoneName] = useState('');

  // Dashboard Filter State
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');

  // Inspection Data State
  const [scores, setScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [selectedObservations, setSelectedObservations] = useState<Record<string, string[]>>({});
  
  // Drill-down State
  const [lastRecord, setLastRecord] = useState<InspectionRecord | null>(null);
  const [viewedInspector, setViewedInspector] = useState<string | null>(null);
  const [viewedReport, setViewedReport] = useState<InspectionRecord | null>(null);

  // Filter Zones based on Type
  const filteredZones = useMemo(() => {
    if (!selectedZoneType) return [];
    return data.zones.filter(z => z.type_code === selectedZoneType);
  }, [selectedZoneType, data.zones]);

  // Filter Checklist based on Zone Type
  const currentChecklist = useMemo(() => {
    if (!selectedZoneType) return [];
    return data.checklists
      .filter(c => c.area_type === selectedZoneType && c.isActive !== false)
      .sort((a, b) => a.number - b.number);
  }, [selectedZoneType, data.checklists]);

  // Calculations
  const totalScore = (Object.values(scores) as number[]).reduce((a, b) => a + b, 0);
  const maxPossibleScore = currentChecklist.reduce((acc, item) => acc + item.max_score, 0);
  const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
  
  const answeredCount = Object.keys(scores).length;
  const totalQuestions = currentChecklist.length;
  const isComplete = answeredCount === totalQuestions && totalQuestions > 0;

  const handleStartInspection = () => {
    if (selectedInspector && selectedZoneType && selectedZoneName) {
      setScores({});
      setNotes({});
      setSelectedObservations({});
      setScreen('CHECKLIST');
      window.scrollTo(0, 0);
    }
  };

  const handleObservationToggle = (itemId: string, observation: string) => {
    setSelectedObservations(prev => {
      const current = prev[itemId] || [];
      if (current.includes(observation)) {
        return { ...prev, [itemId]: current.filter(o => o !== observation) };
      } else {
        return { ...prev, [itemId]: [...current, observation] };
      }
    });
  };

  const handleOpenMyDashboard = () => {
    if (!selectedInspector) {
      alert(t.inspection.selectInspectorFirst);
      return;
    }
    setScreen('MY_DASHBOARD');
  };

  const handleSubmit = () => {
    if (!isComplete) {
      const remaining = totalQuestions - answeredCount;
      alert(`${t.inspection.alertComplete}\n${t.inspection.remaining}: ${remaining}`);
      return;
    }

    try {
      // Generate a structured Reference ID: EVS-YYYYMMDD-RANDOM
      const dateObj = new Date();
      const dateStr = `${dateObj.getFullYear()}${(dateObj.getMonth() + 1).toString().padStart(2, '0')}${dateObj.getDate().toString().padStart(2, '0')}`;
      const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4 digit random
      const referenceId = `EVS-${dateStr}-${randomSuffix}`;

      const newRecord: InspectionRecord = {
        id: referenceId,
        inspectorName: selectedInspector,
        zoneName: selectedZoneName,
        zoneType: selectedZoneType,
        timestamp: Date.now(),
        scores: { ...scores },
        notes: { ...notes },
        selectedObservations: { ...selectedObservations },
        totalScore,
        maxPossibleScore,
        percentage
      };

      if (typeof onHistoryUpdate === 'function') {
        onHistoryUpdate([newRecord, ...history]);
      } else {
        console.error("onHistoryUpdate is not a function");
        return;
      }

      setLastRecord(newRecord);
      setScreen('SUMMARY');
      window.scrollTo(0, 0);
    } catch (e) {
      console.error("Error submitting:", e);
      alert(t.inspection.alertError);
    }
  };

  const resetForm = () => {
    setSelectedZoneName('');
    setScores({});
    setNotes({});
    setSelectedObservations({});
    setScreen('HOME');
  };

  const formatDateTime = (ts: number) => new Date(ts).toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US');
  
  const getPercentageColor = (pct: number) => {
    if (pct >= 90) return 'text-emerald-600';
    if (pct >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  // --- MY DASHBOARD LOGIC ---
  const getFilteredMyHistory = () => {
    if (!selectedInspector) return [];
    
    const now = new Date();
    let startDate = new Date();

    switch (timeFilter) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    return history.filter(r => 
      r.inspectorName === selectedInspector && 
      r.timestamp >= startDate.getTime()
    ).sort((a, b) => b.timestamp - a.timestamp);
  };

  const renderHome = () => (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 animate-fade-in print:hidden">
      <div className="flex justify-between items-center mb-4">
         <div></div> {/* Spacer */}
         <button 
           onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
           className="text-xs font-bold px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors border border-gray-200"
         >
           {lang === 'ar' ? '🇬🇧 English' : '🇸🇦 العربية'}
         </button>
      </div>

      <div className="text-center mb-8">
        <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{t.appTitle}</h2>
        <p className="text-gray-500 mt-2">{t.inspection.selectDetails}</p>
      </div>

      <Select
        label={t.inspection.inspector}
        placeholder={t.labels.search}
        options={data.inspectors.filter(i => i.isActive).map(i => ({ value: i.displayName, label: i.displayName }))}
        value={selectedInspector}
        onChange={(e) => setSelectedInspector(e.target.value)}
      />

      <Select
        label={t.labels.zoneType}
        placeholder={t.labels.search}
        options={[
          { value: 'HIGH_RISK', label: t.values.HIGH_RISK },
          { value: 'MED_RISK', label: t.values.MED_RISK },
          { value: 'GENERAL', label: t.values.GENERAL }
        ]}
        value={selectedZoneType}
        onChange={(e) => { 
          setSelectedZoneType(e.target.value); 
          setSelectedZoneName(''); 
        }}
      />

      <Select
        label={t.inspection.zone}
        placeholder={selectedZoneType ? t.labels.search : t.inspection.startNew}
        options={filteredZones.map(z => ({ value: z.name, label: z.name }))}
        value={selectedZoneName}
        onChange={(e) => setSelectedZoneName(e.target.value)}
        disabled={!selectedZoneType}
      />

      <div className="mt-8 space-y-3">
        <Button 
          fullWidth 
          onClick={handleStartInspection}
          disabled={!selectedInspector || !selectedZoneType || !selectedZoneName}
          className={(!selectedInspector || !selectedZoneType || !selectedZoneName) ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {t.inspection.startBtn}
        </Button>
        
        <div className="flex gap-2">
          <Button fullWidth variant="secondary" onClick={handleOpenMyDashboard} disabled={!selectedInspector} className={!selectedInspector ? 'opacity-50' : ''}>
             📊 {t.inspection.myStats}
          </Button>
          <Button fullWidth variant="secondary" onClick={() => setScreen('DASHBOARD')}>
             📈 {t.inspection.adminDash}
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
           <Button fullWidth variant="ghost" onClick={onExit} className="text-gray-500">⚙️ {t.nav.settings}</Button>
        </div>
      </div>
    </div>
  );

  const renderChecklist = () => (
    <div className="max-w-3xl mx-auto pb-24 print:hidden">
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 border-r-4 border-emerald-500 flex flex-wrap gap-4 justify-between items-center sticky top-20 z-10">
        <div>
          <div className="text-gray-500 text-xs">{t.inspection.zone}</div>
          <div className="font-bold text-gray-800 text-lg">{selectedZoneName}</div>
        </div>
        <div>
           <div className="text-gray-500 text-xs">{t.inspection.inspector}</div>
           <div className="font-bold text-gray-800">{selectedInspector}</div>
        </div>
         <div>
           <div className="text-gray-500 text-xs">{t.labels.zoneType}</div>
           <div className="font-bold text-gray-800 text-sm">
             {t.values[selectedZoneType as keyof typeof t.values]}
           </div>
        </div>
      </div>

      <div className="mb-6 bg-gray-200 rounded-full h-2.5 w-full">
        <div 
          className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
        ></div>
        <div className={`text-xs text-gray-500 mt-1 ${lang === 'ar' ? 'text-left pl-1' : 'text-right pr-1'}`}>
          {t.inspection.completed} {answeredCount} {t.inspection.of} {totalQuestions}
        </div>
      </div>

      <div className="space-y-4">
        {currentChecklist.map((item) => (
          <ChecklistRow
            key={item.id}
            item={item}
            currentScore={scores[item.id]}
            note={notes[item.id] || ''}
            selectedObservations={selectedObservations[item.id]}
            onScoreChange={(id, s) => setScores(p => ({...p, [id]: s}))}
            onNoteChange={(id, n) => setNotes(p => ({...p, [id]: n}))}
            onObservationToggle={handleObservationToggle}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-20">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
             <span className="text-sm text-gray-500">{t.inspection.currentScore}</span>
             <span className={`text-xl font-extrabold ${getPercentageColor(percentage)}`} dir="ltr">
               {percentage.toFixed(1)}%
             </span>
          </div>
          <div className="flex gap-3">
             <Button variant="ghost" onClick={() => setScreen('HOME')}>{t.actions.cancel}</Button>
             <Button 
               onClick={handleSubmit} 
               className={!isComplete ? 'bg-gray-400 hover:bg-gray-500' : ''}
             >
               {isComplete 
                 ? t.inspection.submit 
                 : `${t.inspection.remaining} (${totalQuestions - answeredCount})`}
             </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSummary = () => {
    if (!lastRecord) return null;
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in print:hidden">
        <div className={`p-6 text-center ${lastRecord.percentage >= 75 ? 'bg-emerald-600' : 'bg-red-500'} text-white`}>
          <svg className="w-16 h-16 mx-auto mb-2 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-3xl font-bold mb-1">{t.inspection.successTitle}</h2>
          <p className="text-white/80">{t.inspection.successSubtitle}</p>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-8">
            <div className="text-gray-500 mb-1">{t.inspection.finalScore}</div>
            <div className={`text-5xl font-black ${getPercentageColor(lastRecord.percentage)}`} dir="ltr">
              {lastRecord.percentage.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-400 mt-2">
              {lastRecord.totalScore} / {lastRecord.maxPossibleScore}
            </div>
          </div>

          <div className="space-y-4 mb-8 border-t border-b border-gray-100 py-4">
            <div className="flex justify-between">
              <span className="text-gray-500">{t.inspection.reference}:</span>
              <span className="font-bold text-gray-800 font-mono">{lastRecord.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t.inspection.inspector}:</span>
              <span className="font-bold text-gray-800">{lastRecord.inspectorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t.inspection.zone}:</span>
              <span className="font-bold text-gray-800">{lastRecord.zoneName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t.inspection.time}:</span>
              <span className="font-bold text-gray-800 text-sm" dir="ltr">{formatDateTime(lastRecord.timestamp)}</span>
            </div>
          </div>

          <div className="space-y-3">
             <Button fullWidth onClick={resetForm}>{t.inspection.backHome}</Button>
             <Button fullWidth variant="secondary" onClick={() => setScreen('MY_DASHBOARD')}>{t.inspection.viewStats}</Button>
          </div>
        </div>
      </div>
    );
  };

  const renderMyDashboard = () => {
    const myHistory = getFilteredMyHistory();
    const uniqueZones = new Set(myHistory.map(r => r.zoneName)).size;
    const avgScore = myHistory.length > 0 
      ? myHistory.reduce((acc, curr) => acc + curr.percentage, 0) / myHistory.length 
      : 0;

    // Prepare chart data
    const chartDataMap: Record<string, { date: string, score: number, count: number }> = {};
    myHistory.forEach(r => {
      const dateKey = new Date(r.timestamp).toLocaleDateString('en-GB');
      if (!chartDataMap[dateKey]) {
        chartDataMap[dateKey] = { date: dateKey, score: 0, count: 0 };
      }
      chartDataMap[dateKey].score += r.percentage;
      chartDataMap[dateKey].count += 1;
    });
    
    const chartData = Object.values(chartDataMap)
      .map(d => ({ date: d.date, avg: parseFloat((d.score / d.count).toFixed(1)) }))
      .reverse();

    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-fade-in print:hidden pb-12">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
           <div>
             <h2 className="text-2xl font-bold text-gray-800">{t.inspection.welcome} {selectedInspector} 👋</h2>
             <p className="text-gray-500">{t.inspection.personalDash}</p>
           </div>
           
           <div className="flex gap-2 items-center">
             <span className="text-sm font-bold text-gray-600">{t.inspection.period}:</span>
             <select 
               value={timeFilter} 
               onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
               className="bg-gray-100 border-none rounded-lg px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-emerald-500"
             >
               <option value="week">{t.inspection.lastWeek}</option>
               <option value="month">{t.inspection.lastMonth}</option>
               <option value="quarter">{t.inspection.quarterly}</option>
               <option value="year">{t.inspection.yearly}</option>
             </select>
             <Button variant="ghost" onClick={() => setScreen('HOME')}>{t.actions.cancel}</Button>
           </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border-r-4 border-emerald-500">
              <div className="text-gray-500 text-sm mb-1">{t.inspection.totalReports}</div>
              <div className="text-3xl font-bold text-gray-800">{myHistory.length}</div>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border-r-4 border-blue-500">
              <div className="text-gray-500 text-sm mb-1">{t.inspection.visitedZones}</div>
              <div className="text-3xl font-bold text-gray-800">{uniqueZones}</div>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border-r-4 border-purple-500">
              <div className="text-gray-500 text-sm mb-1">{t.inspection.avgScore}</div>
              <div className={`text-3xl font-bold ${getPercentageColor(avgScore)}`} dir="ltr">{avgScore.toFixed(1)}%</div>
           </div>
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">{t.inspection.perfTrend}</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{fontSize: 12}} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="avg" name={t.inspection.avgScore} stroke="#10b981" strokeWidth={3} dot={{r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
           <div className="p-4 border-b bg-gray-50 font-bold text-gray-700">{t.inspection.reportHistory} ({myHistory.length})</div>
           {myHistory.length === 0 ? (
             <div className="p-8 text-center text-gray-500">{t.inspection.noReports}</div>
           ) : (
             <div className="overflow-x-auto">
                <table className="w-full text-start">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold">
                    <tr>
                      <th className="px-6 py-3 text-start">{t.inspection.date}</th>
                      <th className="px-6 py-3 text-start">{t.inspection.zone}</th>
                      <th className="px-6 py-3 text-start">{t.labels.zoneType}</th>
                      <th className="px-6 py-3 text-start">{t.inspection.score}</th>
                      <th className="px-6 py-3 text-start"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {myHistory.map(rec => (
                      <tr key={rec.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm" dir="ltr">{formatDateTime(rec.timestamp)}</td>
                        <td className="px-6 py-4 font-bold">{rec.zoneName}</td>
                        <td className="px-6 py-4 text-xs">
                           <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
                             {t.values[rec.zoneType as keyof typeof t.values]}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`font-bold ${getPercentageColor(rec.percentage)}`} dir="ltr">
                             {rec.percentage.toFixed(1)}%
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <Button 
                             variant="secondary" 
                             onClick={() => {
                               setViewedReport(rec);
                               setScreen('REPORT_DETAIL');
                             }}
                             className="text-xs px-3 py-1 h-auto"
                           >
                             {t.inspection.view}
                           </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
           )}
        </div>
      </div>
    );
  };

  const renderDashboard = () => {
    return (
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12 print:hidden">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{t.inspection.generalDash}</h2>
              <p className="text-gray-500 text-sm mt-1">{t.inspection.generalSummary}</p>
            </div>
            <Button variant="ghost" onClick={() => setScreen('HOME')}>{t.actions.cancel}</Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border-r-4 border-emerald-500">
                <div className="text-gray-500 text-sm mb-2 font-medium">{t.inspection.totalReports}</div>
                <div className="flex items-baseline">
                   <div className="text-4xl font-bold text-gray-800">{history.length}</div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-r-4 border-blue-500">
                <div className="text-gray-500 text-sm mb-2 font-medium">{t.inspection.visitedZones}</div>
                <div className="flex items-baseline">
                  <div className="text-4xl font-bold text-gray-800">
                    {new Set(history.map(r => r.zoneName)).size}
                  </div>
                </div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border-r-4 border-purple-500">
                <div className="text-gray-500 text-sm mb-2 font-medium">{t.inspection.avgScore}</div>
                <div className="flex items-baseline" dir="ltr">
                  <div className="text-4xl font-bold text-gray-800">
                    {history.length > 0 
                        ? (history.reduce((acc, r) => acc + r.percentage, 0) / history.length).toFixed(1) 
                        : '0'}
                  </div>
                  <div className="text-gray-400 ml-1 text-sm">%</div>
                </div>
            </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-500">
           {t.inspection.moreDetailsAdmin}
        </div>
      </div>
    );
  };

  // Placeholder for list view if needed in future
  const renderInspectorReports = () => null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans" dir={dir}>
       <header className="bg-white shadow-sm sticky top-0 z-30 print:hidden">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
           <h1 className="text-xl font-bold text-gray-800">{t.appTitle}</h1>
           {screen !== 'HOME' && <Button variant="ghost" onClick={() => setScreen('HOME')}>{t.nav.backToApp}</Button>}
        </div>
       </header>
       <main className="max-w-7xl mx-auto px-4 py-8 print:p-0 print:m-0 print:w-full">
         {screen === 'HOME' && renderHome()}
         {screen === 'CHECKLIST' && renderChecklist()}
         {screen === 'SUMMARY' && renderSummary()}
         {screen === 'DASHBOARD' && renderDashboard()}
         {screen === 'MY_DASHBOARD' && renderMyDashboard()}
         {screen === 'REPORT_DETAIL' && viewedReport && (
            <ReportTemplate 
              record={viewedReport} 
              checklists={data.checklists} 
              onBack={() => setScreen(screen === 'MY_DASHBOARD' || viewedInspector ? 'MY_DASHBOARD' : 'DASHBOARD')} 
            />
         )}
       </main>
    </div>
  );
};
