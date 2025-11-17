import { Save } from "lucide-react";

export default function DraftSavedToast() {
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center z-50">
      <Save className="w-4 h-4 mr-2" />
      Draft saved
    </div>
  );
}