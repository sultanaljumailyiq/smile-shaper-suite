import React, { createContext, useContext, useState, useEffect } from "react";

export interface SystemSettings {
  marketplace: boolean;
  community: boolean;
  jobs: boolean;
  favorites: boolean;
  clinicAdmin: boolean;
  aiDiagnosis: boolean;
  education: boolean;
  articles: boolean;
}

interface SystemSettingsContextType {
  settings: SystemSettings;
  updateSetting: (key: keyof SystemSettings, value: boolean) => void;
  resetToDefaults: () => void;
  isFeatureEnabled: (feature: keyof SystemSettings) => boolean;
}

const defaultSettings: SystemSettings = {
  marketplace: true,
  community: true,
  jobs: true,
  favorites: true,
  clinicAdmin: true,
  aiDiagnosis: true,
  education: true,
  articles: true,
};

const SystemSettingsContext = createContext<
  SystemSettingsContextType | undefined
>(undefined);

export const SystemSettingsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);

  // تحميل الإعدادات من localStorage عند التشغيل
  useEffect(() => {
    const savedSettings = localStorage.getItem("systemSettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error("خطأ في تحميل إعدادات النظام:", error);
      }
    }
  }, []);

  // حفظ الإعدادات في localStorage عند التغيير
  useEffect(() => {
    localStorage.setItem("systemSettings", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key: keyof SystemSettings, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  const isFeatureEnabled = (feature: keyof SystemSettings) => {
    return settings[feature];
  };

  return (
    <SystemSettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetToDefaults,
        isFeatureEnabled,
      }}
    >
      {children}
    </SystemSettingsContext.Provider>
  );
};

export const useSystemSettings = () => {
  const context = useContext(SystemSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useSystemSettings must be used within a SystemSettingsProvider",
    );
  }
  return context;
};
