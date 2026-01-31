"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Edit2,
  Trash2,
  Brain,
  Zap,
  TrendingUp,
  Code,
  Eye,
  Lightbulb,
} from "lucide-react";
import { ServiceEditForm } from "./service-edit-form";
import { DeleteConfirmModal } from "./delete-confirm-modal";
import { HeaderDashboard } from "./header-dashboard";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const ICON_OPTIONS = [
  { value: "brain", label: "Brain", icon: Brain },
  { value: "zap", label: "Lightning", icon: Zap },
  { value: "trending", label: "Trending", icon: TrendingUp },
  { value: "code", label: "Code", icon: Code },
  { value: "eye", label: "Eye", icon: Eye },
  { value: "lightbulb", label: "Lightbulb", icon: Lightbulb },
];

const DEFAULT_SERVICES: Service[] = [
  {
    id: "1",
    title: "AI-Powered Solutions",
    description:
      "Leverage machine learning and AI to automate processes, predict outcomes, and enhance decision-making.",
    icon: "brain",
  },
  {
    id: "2",
    title: "Intelligent Chatbots",
    description:
      "Deploy smart conversational AI that understands context and provides personalized customer experiences.",
    icon: "zap",
  },
  {
    id: "3",
    title: "Predictive Analytics",
    description:
      "Transform data into actionable insights with AI-driven analytics and forecasting tools.",
    icon: "trending",
  },
  {
    id: "4",
    title: "Custom AI Applications",
    description:
      "Tailored AI-enhanced software solutions designed specifically for your business challenges.",
    icon: "code",
  },
  {
    id: "5",
    title: "Computer Vision",
    description:
      "Advanced image and video analysis solutions for quality control, security, and automation.",
    icon: "eye",
  },
  {
    id: "6",
    title: "Innovation Consulting",
    description:
      "Strategic guidance on implementing AI technologies to solve your most complex problems.",
    icon: "lightbulb",
  },
];

export function ServicesContent() {
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getIconComponent = (iconName: string) => {
    const option = ICON_OPTIONS.find((opt) => opt.value === iconName);
    return option ? option.icon : Brain;
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
  };

  const handleSaveEdit = (updatedService: Service) => {
    setServices(
      services.map((s) => (s.id === updatedService.id ? updatedService : s)),
    );
    setEditingId(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      setServices(services.filter((s) => s.id !== deleteId));
      setDeleteId(null);
    }
  };

  const editingService = services.find((s) => s.id === editingId);

  if (editingService) {
    return (
      <ServiceEditForm
        service={editingService}
        iconOptions={ICON_OPTIONS}
        getIconComponent={getIconComponent}
        onSave={handleSaveEdit}
        onCancel={() => setEditingId(null)}
      />
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <HeaderDashboard />
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Manage Services
        </h1>
        <p className="text-gray-600">
          Add, edit, or remove services displayed on the landing page
        </p>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10"
          />
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 whitespace-nowrap">
          <Plus size={20} />
          Add Service
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const IconComponent = getIconComponent(service.icon);
          return (
            <Card
              key={service.id}
              className="p-6 flex flex-col hover:shadow-lg transition-shadow"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <IconComponent size={28} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm flex-grow mb-6">
                {service.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 bg-transparent"
                  onClick={() => handleEdit(service)}
                >
                  <Edit2 size={16} />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 text-red-600 hover:text-red-700 bg-transparent"
                  onClick={() => setDeleteId(service.id)}
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No services found matching your search.
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteId !== null}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
        itemName={
          services.find((s) => s.id === deleteId)?.title || "this service"
        }
      />
    </div>
  );
}
