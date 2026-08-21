import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initialResumeState, defaultSettings } from './types/resume';
import { LandingPage } from './pages/LandingPage';
import { BuilderPage } from './pages/BuilderPage';
import { SmartResumePage } from './pages/SmartResumePage';
import { SmartParserModal } from './components/Modals/SmartParserModal';

export default function App() {
  // Local storage resume state
  const [resume, setResume] = useState(() => {
    const saved = localStorage.getItem('myresume_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing cached resume', e);
      }
    }
    return initialResumeState;
  });

  // Local storage settings state
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('myresume_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing cached settings', e);
      }
    }
    return defaultSettings;
  });

  const [landingSmartParserOpen, setLandingSmartParserOpen] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('myresume_data', JSON.stringify(resume));
  }, [resume]);

  useEffect(() => {
    localStorage.setItem('myresume_settings', JSON.stringify(settings));
  }, [settings]);

  const handleSelectTemplate = (templateId) => {
    setSettings(prev => ({
      ...prev,
      template: templateId
    }));
  };

  const handleSelectSample = (sampleData) => {
    setResume(sampleData);
  };

  const handleLandingImport = (importedData) => {
    setResume(prev => ({
      ...prev,
      ...importedData,
      personalInfo: {
        ...prev.personalInfo,
        ...(importedData.personalInfo || {})
      }
    }));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Route 1: Landing Page */}
        <Route
          path="/"
          element={
            <>
              <LandingPage
                onSelectTemplate={handleSelectTemplate}
                onSelectSample={handleSelectSample}
                onOpenSmartParser={() => setLandingSmartParserOpen(true)}
              />
              <SmartParserModal
                onImport={handleLandingImport}
                isOpen={landingSmartParserOpen}
                onClose={() => setLandingSmartParserOpen(false)}
              />
            </>
          }
        />

        {/* Route 2: Primary Resume Studio at /resume */}
        <Route
          path="/resume"
          element={
            <BuilderPage
              resume={resume}
              setResume={setResume}
              settings={settings}
              setSettings={setSettings}
            />
          }
        />

        {/* Route 3: Smart AI Resume Studio at /smartresume */}
        <Route
          path="/smartresume"
          element={
            <SmartResumePage
              resume={resume}
              setResume={setResume}
            />
          }
        />
        <Route
          path="/smart"
          element={<Navigate to="/smartresume" replace />}
        />

        {/* Route 4: Aliases /builder and /studio redirect to /resume */}
        <Route
          path="/builder"
          element={<Navigate to="/resume" replace />}
        />
        <Route
          path="/studio"
          element={<Navigate to="/resume" replace />}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
