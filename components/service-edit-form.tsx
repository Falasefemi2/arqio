"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Service } from "@/utils/api/services/api/types";

interface ServiceWithIcon extends Service {
  icon: string;
}

interface ServiceEditFormProps {
  service: ServiceWithIcon;
  iconOptions: Array<{ value: string; label: string; icon: LucideIcon }>;
  getIconComponent: (iconName: string) => LucideIcon;
  onSave: (service: ServiceWithIcon) => void;
  onCancel: () => void;
  isCreating?: boolean;
  isLoading?: boolean;
}

export function ServiceEditForm({
  service,
  iconOptions,
  getIconComponent,
  onSave,
  onCancel,
  isCreating = false,
  isLoading = false,
}: ServiceEditFormProps) {
  const [formData, setFormData] = useState(service);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const IconComponent = getIconComponent(formData.icon);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isCreating ? "Add New Service" : "Edit Service"}
          </h1>
          <p className="text-gray-600">
            {isCreating
              ? "Create a new service offering"
              : "Update service information"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Column */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="space-y-6">
                {/* Service Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Service Title
                  </label>
                  <Input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>

                {/* Service Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Service Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none disabled:opacity-50"
                    rows={6}
                    disabled={isLoading}
                  />
                </div>

                {/* Icon Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 disabled:opacity-50"
                  >
                    {isLoading
                      ? "Saving..."
                      : isCreating
                        ? "Add Service"
                        : "Update Service"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Preview Column */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Preview
              </h2>
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-3">
                    <IconComponent size={24} className="text-white" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {formData.title || "(No title)"}
                </h3>
                <p className="text-sm text-gray-600">
                  {formData.description || "(No description)"}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
