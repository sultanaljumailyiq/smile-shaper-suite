import React from "react";
import AIAssistantRedesigned from "./AIAssistantRedesigned";

interface SmartClinicAIPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SmartClinicAIPopup: React.FC<SmartClinicAIPopupProps> = ({
  isOpen = true,
  onClose
}) => {
  return (
    <div className="smart-clinic-ai-popup">
      <AIAssistantRedesigned />
    </div>
  );
};

export default SmartClinicAIPopup;