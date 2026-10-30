import React, { useState, useEffect } from 'react';
import { DokumenRPM } from './types/rpm';
import { 
  EXEMPLAR_BIOLOGI_FOTOSINTESIS, 
  ALL_EXEMPLARS 
} from './data/exemplars';
import { Navbar } from './components/Navbar';
import { RpmDocumentViewer } from './components/RpmDocumentViewer';
import { RpmGeneratorForm } from './components/RpmGeneratorForm';
import { ExemplarsLibrary } from './components/ExemplarsLibrary';
import { FrameworkExplainer } from './components/FrameworkExplainer';
import { TeacherPresenterModal } from './components/TeacherPresenterModal';
import { RefineSectionModal } from './components/RefineSectionModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'document' | 'generator' | 'exemplars' | 'principles'>('document');
  const [currentDoc, setCurrentDoc] = useState<DokumenRPM>(() => {
    const saved = localStorage.getItem('sideep_current_rpm');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return EXEMPLAR_BIOLOGI_FOTOSINTESIS;
      }
    }
    return EXEMPLAR_BIOLOGI_FOTOSINTESIS;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClassroomModalOpen, setIsClassroomModalOpen] = useState<boolean>(false);
  const [refineModal, setRefineModal] = useState<{
    isOpen: boolean;
    sectionName: string;
    content: any;
  }>({
    isOpen: false,
    sectionName: '',
    content: null,
  });

  // Save to localStorage whenever currentDoc changes
  useEffect(() => {
    try {
      localStorage.setItem('sideep_current_rpm', JSON.stringify(currentDoc));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [currentDoc]);

  const handleDocumentGenerated = (newDoc: DokumenRPM) => {
    setCurrentDoc(newDoc);
    setActiveTab('document');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExemplar = (exemplarDoc: DokumenRPM) => {
    setCurrentDoc(exemplarDoc);
    setActiveTab('document');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRefineModal = (sectionName: string, content: any) => {
    setRefineModal({
      isOpen: true,
      sectionName,
      content,
    });
  };

  const handleApplyRefinedContent = (sectionName: string, refinedData: any) => {
    setCurrentDoc((prev) => {
      const updated = { ...prev };
      if (sectionName.includes('Capaian')) {
        if (refinedData.cp) updated.capaianPembelajaran = refinedData.cp;
        if (refinedData.tp) updated.tujuanPembelajaran = Array.isArray(refinedData.tp) ? refinedData.tp : [refinedData.tp];
      } else if (sectionName.includes('Skenario')) {
        if (Array.isArray(refinedData)) {
          updated.skenarioPertemuan = refinedData;
        }
      } else if (sectionName.includes('Prinsip')) {
        if (Array.isArray(refinedData)) {
          updated.tabelAnalisisPrinsip = refinedData;
        }
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Official Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentDoc={currentDoc}
        onOpenClassroomMode={() => setIsClassroomModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'document' && (
          <RpmDocumentViewer
            document={currentDoc}
            onOpenRefineModal={handleOpenRefineModal}
            onOpenClassroomMode={() => setIsClassroomModalOpen(true)}
          />
        )}

        {activeTab === 'generator' && (
          <RpmGeneratorForm
            onDocumentGenerated={handleDocumentGenerated}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}

        {activeTab === 'exemplars' && (
          <ExemplarsLibrary
            onSelectDoc={handleSelectExemplar}
            selectedDocId={currentDoc.id}
          />
        )}

        {activeTab === 'principles' && (
          <FrameworkExplainer
            onStartGenerator={() => setActiveTab('generator')}
          />
        )}
      </main>

      {/* Classroom Facilitator Modal (Live Teaching Mode) */}
      <TeacherPresenterModal
        document={currentDoc}
        isOpen={isClassroomModalOpen}
        onClose={() => setIsClassroomModalOpen(false)}
      />

      {/* AI Refine Section Modal */}
      <RefineSectionModal
        isOpen={refineModal.isOpen}
        onClose={() => setRefineModal({ ...refineModal, isOpen: false })}
        sectionName={refineModal.sectionName}
        currentContent={refineModal.content}
        document={currentDoc}
        onApplyRefinedContent={handleApplyRefinedContent}
      />

      {/* Official Footer */}
      <footer className="no-print bg-slate-900 text-slate-400 py-8 px-4 text-xs border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="font-bold text-slate-200">
              Si-Deep • Sistem Perancang Pembelajaran Mendalam Kemendikdasmen RI
            </p>
            <p className="text-[11px] text-slate-500">
              Mewujudkan Pembelajaran Berkesadaran (Mindful), Bermakna (Meaningful), dan Menggembirakan (Joyful).
            </p>
          </div>
          <div className="text-[11px] text-slate-500">
            Ditenagai Model Gemini 3.8 Flash • Standar Kurikulum Nasional Resmi Indonesia
          </div>
        </div>
      </footer>
    </div>
  );
}
