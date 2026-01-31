"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  itemName: string;
}

export function DeleteConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  itemName,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 sm:p-8">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertCircle size={32} className="text-red-600" />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-lg font-bold text-gray-900 text-center mb-2">
          Delete Service?
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{itemName}</span>? This action cannot
          be undone.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
