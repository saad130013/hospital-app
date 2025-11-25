
import React, { useState, useContext } from 'react';
import { InspectionRecord, ChecklistItem } from '../types';
import { LanguageContext, translations } from '../i18n';

interface ReportProps {
  record: InspectionRecord;
  checklists: ChecklistItem[];
  onBack: () => void;
}

export const ReportTemplate: React.FC<ReportProps> = ({ record, checklists, onBack }) => {
  const { t, lang, dir } = useContext(LanguageContext);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  // Filter checklist items relevant to this zone type
  const items = checklists
    .filter(c => c.area_type === record.zoneType)
    .sort((a, b) => a.number - b.number);

  const formatDateTime = (ts: number) => new Date(ts).toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US');
  
  const getPercentageColor = (pct: number) => {
    if (pct >= 90) return 'text-emerald-600';
    if (pct >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    const element = document.getElementById('printable-report');
    
    // @ts-ignore
    if (!element || typeof window.html2pdf === 'undefined') {
      setIsGeneratingPdf(false);
      alert(lang === 'ar' ? 'مكتبة PDF غير محملة' : 'PDF library not loaded');
      return;
    }

    const opt = {
      margin: [5, 5, 5, 5], // Reduced margin to 5mm to prevent overflow
      filename: `Report_${record.inspectorName}_${record.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true,
        scrollY: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] } // Safer page break mode
    };

    try {
      // @ts-ignore
      await window.html2pdf().set(opt).from(element).save();
    } catch (e) {
      console.error('PDF Generation Error:', e);
      alert(lang === 'ar' ? 'حدث خطأ أثناء إنشاء ملف PDF' : 'Error generating PDF');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12 print:pb-0 print:w-full print:max-w-none animate-fade-in" dir={dir}>
       {/* Screen Header - Hidden on Print */}
       <div className="flex justify-between items-center mb-6 print:hidden">
          <div>
             <h2 className="text-2xl font-bold text-gray-800">{t(translations[lang].inspection.reportDetails)}</h2>
             <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <span>{t(translations[lang].inspection.reference)}:</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded font-mono font-bold text-gray-700 select-all">{record.id}</span>
             </p>
          </div>
          <div className="flex gap-2">
             <button 
               onClick={handleDownloadPDF} 
               disabled={isGeneratingPdf}
               className={`px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 ${isGeneratingPdf ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
             >
               {isGeneratingPdf ? (
                 <>
                   <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   ...
                 </>
               ) : (
                 <>
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                   </svg>
                   {t(translations[lang].inspection.downloadPdf)}
                 </>
               )}
             </button>
             <button 
               onClick={() => window.print()} 
               className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-bold hover:bg-emerald-200 transition-colors flex items-center gap-2"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
               </svg>
               {t(translations[lang].actions.print || "Print")}
             </button>
             <button 
               onClick={onBack} 
               className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
             >
               {t(translations[lang].inspection.back)}
             </button>
          </div>
       </div>

       {/* Report Content - Visible on Screen & Print */}
       <div id="printable-report" className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 print:shadow-none print:border-0 print:w-full print:max-w-none" dir={dir}>
          
          {/* Print Header Table (Repeats on every page) */}
          <table className="w-full">
            <thead className="hidden print:table-header-group">
               <tr>
                 <td>
                   <div className="p-6 border-b-2 border-gray-800 mb-4 flex justify-between items-center">
                      <h1 className="text-2xl font-bold text-gray-800">{t(translations[lang].inspection.reportHeader)}</h1>
                      <div className={`text-sm text-gray-500 ${lang === 'ar' ? 'text-left' : 'text-right'}`}>
                        <div>{t(translations[lang].inspection.date)}: {formatDateTime(record.timestamp)}</div>
                        <div className="font-mono font-bold text-gray-700 mt-1">{t(translations[lang].inspection.reference)}: {record.id}</div>
                      </div>
                   </div>
                 </td>
               </tr>
            </thead>
            
            <tbody>
              <tr>
                <td>
                  {/* Summary Card */}
                  <div className="p-6 bg-gray-50 border-b border-gray-200 print:bg-white print:p-0 print:border-none">
                      <div className="flex flex-wrap gap-6 justify-between items-start">
                          <div className="min-w-[150px]">
                              <p className="text-sm text-gray-500 mb-1">{t(translations[lang].inspection.inspector)}</p>
                              <p className="text-lg font-bold text-gray-900">{record.inspectorName}</p>
                          </div>
                          <div className="min-w-[150px]">
                              <p className="text-sm text-gray-500 mb-1">{t(translations[lang].inspection.zone)}</p>
                              <p className="text-lg font-bold text-gray-900">{record.zoneName}</p>
                              <span className="text-xs border px-2 py-0.5 rounded text-gray-500 mt-1 inline-block">
                                   {t(translations[lang].values[record.zoneType])}
                              </span>
                          </div>
                          <div className={`min-w-[150px] ${lang === 'ar' ? 'text-left' : 'text-right'}`}>
                              <p className="text-sm text-gray-500 mb-1">{t(translations[lang].inspection.finalScore)}</p>
                              <p className={`text-3xl font-black ${getPercentageColor(record.percentage)} print-exact`} dir="ltr">
                                  {record.percentage.toFixed(1)}%
                              </p>
                              <p className="text-xs text-gray-400" dir="ltr">{record.totalScore} / {record.maxPossibleScore}</p>
                          </div>
                      </div>
                  </div>

                  {/* Checklist Items */}
                  <div className="divide-y divide-gray-100 p-6 print:p-0">
                      <h3 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2 print:mt-4">{t(translations[lang].inspection.reportDetails)}</h3>
                      {items.map((item) => {
                          const score = record.scores[item.id];
                          const note = record.notes[item.id];
                          const observations = record.selectedObservations?.[item.id] || [];
                          
                          if (score === undefined) return null;

                          const itemName = lang === 'ar' ? item.name : (item.name_en || item.name);

                          return (
                              <div key={item.id} className="py-3 break-inside-avoid">
                                  <div className="flex justify-between items-start mb-1">
                                      <div className="flex-1">
                                          <div className="flex items-center gap-3 mb-1">
                                            <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">#{item.number}</span>
                                            <span className="font-bold text-gray-800">{itemName}</span>
                                          </div>
                                          
                                          {/* Render Selected Observations */}
                                          {observations.length > 0 && (
                                            <div className={`flex flex-wrap gap-1 mt-1 ${lang === 'ar' ? 'mr-8' : 'ml-8'}`}>
                                              {observations.map((obs, idx) => (
                                                <span key={idx} className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded border border-red-100 print-exact">
                                                  • {obs}
                                                </span>
                                              ))}
                                            </div>
                                          )}
                                      </div>
                                      
                                      <div className="flex items-center gap-2 dir-ltr">
                                        <div className={`
                                          px-3 py-1 rounded font-bold border text-sm print-exact whitespace-nowrap
                                          ${score === item.max_score ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 
                                            score === 0 ? 'bg-red-50 text-red-800 border-red-200' : 'bg-yellow-50 text-yellow-800 border-yellow-200'}
                                        `}>
                                          {score} / {item.max_score}
                                        </div>
                                      </div>
                                  </div>
                                  
                                  {note && (
                                      <div className={`mt-1 text-sm text-gray-600 bg-yellow-50 p-2 rounded border border-yellow-100 print-exact ${lang === 'ar' ? 'mr-10' : 'ml-10'}`}>
                                          <span className="font-bold">{t(translations[lang].inspection.additionalNotes)}:</span> {note}
                                      </div>
                                  )}
                              </div>
                          );
                      })}
                  </div>
                </td>
              </tr>
            </tbody>

            {/* Print Footer (Repeats on every page) */}
            <tfoot className="hidden print:table-footer-group">
              <tr>
                <td>
                  <div className="mt-8 pt-4 border-t border-gray-300 text-center">
                    <p className="text-gray-500 text-sm font-medium">{t(translations[lang].inspection.electronicSignature)}</p>
                    <p className="text-gray-400 text-xs mt-1">{t(translations[lang].inspection.systemSignature)}</p>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
       </div>
    </div>
  );
};
