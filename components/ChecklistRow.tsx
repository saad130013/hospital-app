
import React, { useContext } from 'react';
import { ChecklistItem } from '../types';
import { LanguageContext, translations } from '../i18n';

interface ChecklistRowProps {
  item: ChecklistItem;
  currentScore: number | undefined;
  note: string;
  selectedObservations?: string[];
  onScoreChange: (itemId: string, score: number) => void;
  onNoteChange: (itemId: string, note: string) => void;
  onObservationToggle?: (itemId: string, observation: string) => void;
}

export const ChecklistRow: React.FC<ChecklistRowProps> = ({
  item,
  currentScore,
  note,
  selectedObservations = [],
  onScoreChange,
  onNoteChange,
  onObservationToggle,
}) => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang];
  
  // Generate array [0, 1, ..., max_score]
  const scores = Array.from({ length: item.max_score + 1 }, (_, i) => i);
  
  // Use English name if available and language is English
  const itemName = lang === 'en' && item.name_en ? item.name_en : item.name;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4 transition-all hover:shadow-md">
      <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <span className="font-bold text-gray-800 text-lg flex-1 mx-4">
          {item.number}. {itemName}
        </span>
        <span className="text-xs font-semibold px-2 py-1 bg-gray-200 text-gray-600 rounded-md whitespace-nowrap">
          {t.labels.maxScore}: {item.max_score}
        </span>
      </div>

      <div className="p-4">
        {/* Score Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.inspection.score}:</label>
          <div className="flex flex-wrap gap-2 dir-ltr">
            {scores.map((score) => (
              <button
                key={score}
                onClick={() => onScoreChange(item.id, score)}
                className={`
                  w-10 h-10 rounded-lg font-bold text-lg transition-all
                  ${currentScore === score 
                    ? (score === item.max_score ? 'bg-emerald-600 text-white shadow-emerald-200' : 
                       score === 0 ? 'bg-red-600 text-white shadow-red-200' : 'bg-emerald-500 text-white shadow-emerald-200')
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'}
                  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
                `}
              >
                {score}
              </button>
            ))}
          </div>
        </div>

        {/* Possible Observations Checkboxes */}
        {item.possible_observations && item.possible_observations.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.labels.possibleObs}:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.possible_observations.map((obs, idx) => {
                const isChecked = selectedObservations.includes(obs);
                return (
                  <label 
                    key={idx} 
                    className={`
                      flex items-center p-2 rounded-lg border cursor-pointer transition-colors
                      ${isChecked ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200 hover:bg-gray-50'}
                    `}
                  >
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      onChange={() => onObservationToggle && onObservationToggle(item.id, obs)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <span className={`mx-2 text-sm ${isChecked ? 'text-red-700 font-medium' : 'text-gray-600'}`}>
                      {obs}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Notes Section */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">{t.inspection.additionalNotes}:</label>
          <input
            type="text"
            value={note}
            onChange={(e) => onNoteChange(item.id, e.target.value)}
            placeholder={t.labels.obsPlaceholder}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};
