import React from "react";
import AIAssistantRedesigned from "./AIAssistantRedesigned";

interface DentistHubAIPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const DentistHubAIPopup: React.FC<DentistHubAIPopupProps> = ({
  isOpen = true,
  onClose
}) => {
  return (
    <div className="dentist-hub-ai-popup">
      <AIAssistantRedesigned />
    </div>
  );
};

export default DentistHubAIPopup;