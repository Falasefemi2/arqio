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
import { toast } from "sonner";
import {
  useGetAllServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "@/utils/api/services/hooks/useServices";
import type { Service } from "@/utils/api/services/api/types";

const ICON_OPTIONS = [
  { value: "brain", label: "Brain", icon: Brain },
  { value: "zap", label: "Lightning", icon: Zap },
  { value: "trending", label: "Trending", icon: TrendingUp },
  { value: "code", label: "Code", icon: Code },
  { value: "eye", label: "Eye", icon: Eye },
  { value: "lightbulb", label: "Lightbulb", icon: Lightbulb },
];

interface ServiceWithIcon extends Service {
  icon: string;
}

export function ServicesContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: response = [], isLoading } = useGetAllServices();
  const { mutate: createService, isPending: isCreatingService } =
    useCreateService();
  const { mutate: updateService, isPending: isUpdatingService } =
    useUpdateService();
  const { mutate: deleteService, isPending: isDeletingService } =
    useDeleteService();

  const apiServices = Array.isArray(response) ? response : [];
  const servicesWithIcons: ServiceWithIcon[] = apiServices.map((service) => ({
    ...service,
    icon: "brain",
  }));

  const filteredServices = servicesWithIcons.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getIconComponent = (iconName: string) => {
    const option = ICON_OPTIONS.find((opt) => opt.value === iconName);
    return option ? option.icon : Brain;
  };

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleEdit = (service: ServiceWithIcon) => {
    setEditingId(service.id);
  };

  const handleSaveEdit = (updatedService: ServiceWithIcon) => {
    updateService(
      {
        id: updatedService.id,
        title: updatedService.title,
        description: updatedService.description,
      },
      {
        onSuccess: () => {
          setEditingId(null);
          toast.success("Service updated successfully!");
        },
        onError: (error) => {
          toast.error("Failed to update service.", {
            description: error.message || "Please try again.",
          });
        },
      },
    );
  };

  const handleSaveCreate = (newService: ServiceWithIcon) => {
    createService(
      {
        title: newService.title,
        description: newService.description,
      },
      {
        onSuccess: () => {
          setIsCreating(false);
          toast.success("Service created successfully!");
        },
        onError: (error) => {
          toast.error("Failed to create service.", {
            description: error.message || "Please try again.",
          });
        },
      },
    );
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteService(deleteId, {
        onSuccess: () => {
          setDeleteId(null);
          toast.success("Service deleted successfully!");
        },
        onError: (error) => {
          toast.error("Failed to delete service.", {
            description: error.message || "Please try again.",
          });
          setDeleteId(null);
        },
      });
    }
  };

  const emptyService: ServiceWithIcon = {
    id: 0,
    title: "",
    description: "",
    icon: "brain",
    createdDate: new Date().toISOString(),
    createdBy: "",
    modifiedDate: new Date().toISOString(),
    modifiedBy: "",
    deletedDate: "",
    deletedBy: "",
    isActive: true,
    isDeleted: false,
  };

  const editingService = servicesWithIcons.find((s) => s.id === editingId);

  if (isCreating) {
    return (
      <div>
        <HeaderDashboard />
        <ServiceEditForm
          service={emptyService}
          iconOptions={ICON_OPTIONS}
          getIconComponent={getIconComponent}
          onSave={handleSaveCreate}
          onCancel={() => setIsCreating(false)}
          isCreating={true}
          isLoading={isCreatingService}
        />
      </div>
    );
  }

  if (editingService) {
    return (
      <div>
        <HeaderDashboard />
        <ServiceEditForm
          service={editingService}
          iconOptions={ICON_OPTIONS}
          getIconComponent={getIconComponent}
          onSave={handleSaveEdit}
          onCancel={() => setEditingId(null)}
          isCreating={false}
          isLoading={isUpdatingService}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderDashboard />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
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
          <Button
            onClick={handleCreateClick}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} />
            Add Service
          </Button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <Card className="p-8 text-center">
            <p className="text-gray-500">Loading services...</p>
          </Card>
        ) : filteredServices.length > 0 ? (
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
                      disabled={isDeletingService}
                    >
                      <Edit2 size={16} />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 flex items-center justify-center gap-2 text-red-600 hover:text-red-700 bg-transparent"
                      onClick={() => setDeleteId(service.id)}
                      disabled={isDeletingService}
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
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
            servicesWithIcons.find((s) => s.id === deleteId)?.title ||
            "this service"
          }
        />
      </main>
    </div>
  );
}
