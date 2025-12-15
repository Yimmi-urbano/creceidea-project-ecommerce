"use client"
import React from 'react';
import { Skeleton } from '@nextui-org/react';
import { ConfigProvider, useConfig } from '@/src/presentation/contexts';
import UpdateCatalogForm from '@/src/presentation/components/client/UpdateCatalog';

// Skeleton Component
function CatalogConfigSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 rounded-lg" />
        <Skeleton className="h-4 w-96 rounded-lg" />
      </div>

      {/* Form Card Skeleton */}
      <div className="bg-white dark:bg-dark-card border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-6">
        {/* Section 1 */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-48 rounded-lg" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-48 rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-48 rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>

        {/* Button Skeleton */}
        <div className="flex justify-end pt-4">
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// Main Content Component
function CatalogConfigContent() {
  const { loading } = useConfig();

  if (loading) {
    return <CatalogConfigSkeleton />;
  }

  return <UpdateCatalogForm />;
}

export default function CatalogConfig() {
  return (
    <div>
      <ConfigProvider>
        <CatalogConfigContent />
      </ConfigProvider>
    </div>
  );
}
