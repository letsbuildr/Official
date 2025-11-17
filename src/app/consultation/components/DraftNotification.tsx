import { AlertCircle } from "lucide-react";

interface DraftNotificationProps {
  onClearDraft: () => void;
}

export default function DraftNotification({ onClearDraft }: DraftNotificationProps) {
  return (
    <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center">
        <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
        <span className="text-blue-800 text-sm">
          We found a saved draft. Your previous information has been restored.
        </span>
      </div>
      <button
        onClick={onClearDraft}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        Clear Draft
      </button>
    </div>
  );
}