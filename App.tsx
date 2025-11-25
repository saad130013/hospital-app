
import React, { useState, useEffect } from 'react';
import { INITIAL_DATA } from './data';
import { AppConfig, Inspector, Zone, ChecklistItem, InspectionRecord } from './types';
import { LanguageContext, translations, Language } from './i18n';
import { InspectionApp } from './components/InspectionApp';
import { Button } from './components/Button';

// Admin Components (Inline for simplicity given file constraints, usually separate)

const AdminLayout = ({ children, activeTab, onTabChange }: any) => {
  const { t, lang, setLang, dir } = React.useContext(LanguageContext);
  
  return (
    <div className="min-h-screen bg-gray-100 flex" dir={dir}>
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold">{t(translations[lang].adminTitle)}</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {['inspectors', 'zones', 'checklists', 'settings'].map((key) => (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={`w-full text-start px-4 py-3 rounded-lg transition-colors ${activeTab === key ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
            >
              {t(translations[lang].nav[key as keyof typeof translations['en']['nav']])}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button onClick={() => onTabChange('exit')} className="w-full text-start px-4 py-3 text-red-400 hover:bg-slate-700 rounded-lg">
             {t(translations[lang].nav.backToApp)}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm h-16 flex justify-end items-center px-8">
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <span>{lang === 'ar' ? '🇬🇧 English' : '🇸🇦 العربية'}</span>
          </button>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const InspectorManager = ({ data, onChange }: { data: AppConfig, onChange: (d: AppConfig) => void }) => {
  const { t, lang } = React.useContext(LanguageContext);
  const [editing, setEditing] = useState<Inspector | null>(null);

  const handleDelete = (id: string) => {
    if (confirm(t(translations[lang].messages.confirmDelete))) {
      onChange({ ...data, inspectors: data.inspectors.filter(i => i.id !== id) });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    
    // Logic to add or update
    const exists = data.inspectors.find(i => i.id === editing.id);
    let newInspectors = [...data.inspectors];
    if (exists) {
      newInspectors = newInspectors.map(i => i.id === editing.id ? editing : i);
    } else {
      newInspectors.push({ ...editing, id: Date.now().toString() });
    }
    onChange({ ...data, inspectors: newInspectors });
    setEditing(null);
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">{t(translations[lang].nav.inspectors)}</h2>
        <Button onClick={() => setEditing({ id: '', displayName: '', username: '', passwordHash: '', allowedZoneTypes: [], isActive: true })}>
          {t(translations[lang].actions.add)}
        </Button>
      </div>

      {editing && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 animate-fade-in">
          <form onSubmit={handleSave} className="space-y-4">
             <div>
               <label className="block text-sm font-medium mb-1">{t(translations[lang].labels.nameAr)}</label>
               <input className="w-full border p-2 rounded" value={editing.displayName} onChange={e => setEditing({...editing, displayName: e.target.value})} required />
             </div>
             <div>
               <label className="block text-sm font-medium mb-1">{t(translations[lang].labels.username)}</label>
               <input className="w-full border p-2 rounded" value={editing.username} onChange={e => setEditing({...editing, username: e.target.value})} required />
             </div>
             <div className="flex gap-4">
               <Button type="submit">{t(translations[lang].actions.save)}</Button>
               <Button variant="ghost" type="button" onClick={() => setEditing(null)}>{t(translations[lang].actions.cancel)}</Button>
             </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-start">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-start">{t(translations[lang].labels.nameAr)}</th>
              <th className="p-4 text-start">{t(translations[lang].labels.username)}</th>
              <th className="p-4 text-start">{t(translations[lang].actions.edit)}</th>
            </tr>
          </thead>
          <tbody>
            {data.inspectors.map(insp => (
              <tr key={insp.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{insp.displayName}</td>
                <td className="p-4">{insp.username}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => setEditing(insp)} className="text-blue-600 hover:underline">{t(translations[lang].actions.edit)}</button>
                  <button onClick={() => handleDelete(insp.id)} className="text-red-600 hover:underline">{t(translations[lang].actions.delete)}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ZoneManager = ({ data, onChange }: { data: AppConfig, onChange: (d: AppConfig) => void }) => {
  const { t, lang } = React.useContext(LanguageContext);
  const [filter, setFilter] = useState('');

  // Simple add/edit logic omitted for brevity, focusing on list view
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">{t(translations[lang].nav.zones)}</h2>
        <Button onClick={() => alert("Add Zone Modal")}>{t(translations[lang].actions.add)}</Button>
      </div>
      
      <input 
        className="w-full p-3 border rounded-lg mb-4" 
        placeholder={t(translations[lang].labels.search)}
        value={filter}
        onChange={e => setFilter(e.target.value)} 
      />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-start">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-start">{t(translations[lang].labels.nameAr)}</th>
              <th className="p-4 text-start">{t(translations[lang].labels.zoneType)}</th>
              <th className="p-4 text-start"></th>
            </tr>
          </thead>
          <tbody>
            {data.zones.filter(z => z.name.includes(filter)).map(zone => (
              <tr key={zone.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold">{zone.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${zone.type_code === 'HIGH_RISK' ? 'bg-red-100 text-red-800' : zone.type_code === 'MED_RISK' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {t(translations[lang].values[zone.type_code])}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-red-600 hover:underline">{t(translations[lang].actions.delete)}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ChecklistManager = ({ data, onChange }: { data: AppConfig, onChange: (d: AppConfig) => void }) => {
  const { t, lang } = React.useContext(LanguageContext);
  const [typeFilter, setTypeFilter] = useState('ALL');

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">{t(translations[lang].nav.checklists)}</h2>
        <Button>{t(translations[lang].actions.add)}</Button>
      </div>

      <div className="flex gap-2 mb-4">
         {['ALL', 'HIGH_RISK', 'MED_RISK', 'GENERAL'].map(type => (
           <button 
             key={type}
             onClick={() => setTypeFilter(type)}
             className={`px-4 py-2 rounded-lg text-sm font-bold ${typeFilter === type ? 'bg-slate-800 text-white' : 'bg-gray-200 text-gray-700'}`}
           >
             {type === 'ALL' ? 'All' : t(translations[lang].values[type as any] || type)}
           </button>
         ))}
      </div>

      <div className="space-y-2">
        {data.checklists
          .filter(c => typeFilter === 'ALL' || c.area_type === typeFilter)
          .map(item => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow border border-gray-100 flex justify-between items-center">
               <div>
                  <div className="font-bold text-gray-800">#{item.number} - {lang === 'ar' ? item.name : (item.name_en || item.name)}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {t(translations[lang].values[item.area_type])} | {t(translations[lang].labels.maxScore)}: {item.max_score}
                  </div>
               </div>
               <div className="flex gap-2">
                 <button className="p-2 text-gray-400 hover:text-blue-600">⬆</button>
                 <button className="p-2 text-gray-400 hover:text-blue-600">⬇</button>
                 <button className="p-2 text-gray-400 hover:text-red-600">✕</button>
               </div>
            </div>
        ))}
      </div>
    </div>
  );
};

const SettingsManager = ({ data, onChange }: { data: AppConfig, onChange: (d: AppConfig) => void }) => {
  const { t, lang } = React.useContext(LanguageContext);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "evs_config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        onChange(json);
        alert(t(translations[lang].messages.importSuccess));
      } catch (err) {
        alert(t(translations[lang].messages.importError));
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-xl">
       <h2 className="text-2xl font-bold mb-6">{t(translations[lang].nav.settings)}</h2>
       
       <div className="space-y-6">
          <div className="p-4 border rounded-lg bg-gray-50">
             <h3 className="font-bold mb-2">{t(translations[lang].actions.export)}</h3>
             <Button onClick={handleExport} fullWidth>{t(translations[lang].actions.export)}</Button>
          </div>

          <div className="p-4 border rounded-lg bg-gray-50">
             <h3 className="font-bold mb-2">{t(translations[lang].actions.import)}</h3>
             <input type="file" onChange={handleImport} className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-emerald-50 file:text-emerald-700
                hover:file:bg-emerald-100
              "/>
          </div>
       </div>
    </div>
  );
};

// Root App Component
export default function App() {
  const [appConfig, setAppConfig] = useState<AppConfig>(INITIAL_DATA);
  const [history, setHistory] = useState<InspectionRecord[]>([]); // Centralized history state
  const [lang, setLang] = useState<Language>('ar');
  const [view, setView] = useState<'APP' | 'ADMIN'>('APP');
  const [adminTab, setAdminTab] = useState('inspectors');

  const contextValue = {
    lang,
    setLang,
    t: (key: string) => key, // Translation helper
    dir: lang === 'ar' ? 'rtl' : 'ltr' as 'rtl' | 'ltr'
  };

  if (view === 'APP') {
    return (
       <InspectionApp 
         data={appConfig} 
         history={history}
         onHistoryUpdate={setHistory}
         onExit={() => setView('ADMIN')} 
       />
    );
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      <AdminLayout activeTab={adminTab} onTabChange={(t: string) => t === 'exit' ? setView('APP') : setAdminTab(t)}>
         {adminTab === 'inspectors' && <InspectorManager data={appConfig} onChange={setAppConfig} />}
         {adminTab === 'zones' && <ZoneManager data={appConfig} onChange={setAppConfig} />}
         {adminTab === 'checklists' && <ChecklistManager data={appConfig} onChange={setAppConfig} />}
         {adminTab === 'settings' && <SettingsManager data={appConfig} onChange={setAppConfig} />}
      </AdminLayout>
    </LanguageContext.Provider>
  );
}
