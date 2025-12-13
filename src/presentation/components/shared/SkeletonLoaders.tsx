/**
 * Reusable Skeleton Loader Components
 * 
 * A collection of elegant, reusable skeleton loaders for consistent loading states
 * across the application. All components use the app's color scheme and are optimized
 * for both light and dark modes.
 */

import React from 'react';
import { Skeleton } from '@nextui-org/react';

/**
 * Skeleton for stat cards (dashboard metrics)
 */
export const StatCardSkeleton: React.FC = () => (
    <div className="p-4 rounded-lg border bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800">
        <Skeleton className="h-3 w-24 rounded-lg mb-3 bg-zinc-200 dark:bg-zinc-800" />
        <Skeleton className="h-8 w-16 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
    </div>
);

/**
 * Skeleton for table rows
 */
export const TableRowSkeleton: React.FC<{ columns?: number }> = ({ columns = 4 }) => (
    <div className="flex items-center gap-4 px-4 py-3.5 bg-white dark:bg-[#13161c] border border-zinc-200 dark:border-zinc-800 rounded-lg">
        {Array.from({ length: columns }).map((_, i) => (
            <Skeleton
                key={i}
                className={`h-5 rounded-lg bg-zinc-200 dark:bg-zinc-800 ${i === 0 ? 'w-12' : 'flex-1'}`}
            />
        ))}
    </div>
);

/**
 * Skeleton for form inputs
 */
export const FormInputSkeleton: React.FC<{ label?: boolean }> = ({ label = true }) => (
    <div className="space-y-2">
        {label && <Skeleton className="h-4 w-32 rounded-lg bg-zinc-200 dark:bg-zinc-800" />}
        <Skeleton className="h-12 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
    </div>
);

/**
 * Skeleton for card components
 */
export const CardSkeleton: React.FC<{ height?: string }> = ({ height = 'h-48' }) => (
    <div className={`${height} rounded-lg border bg-white dark:bg-[#13161c] border-zinc-200 dark:border-zinc-800 p-6 space-y-4`}>
        <Skeleton className="h-6 w-3/4 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <Skeleton className="h-4 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <Skeleton className="h-4 w-5/6 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
    </div>
);

/**
 * Skeleton for product/order cards
 */
export const ProductCardSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-[#13161c] border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 space-y-3">
        <Skeleton className="h-40 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <Skeleton className="h-5 w-3/4 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <Skeleton className="h-4 w-1/2 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex gap-2">
            <Skeleton className="h-8 flex-1 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-8 flex-1 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        </div>
    </div>
);

/**
 * Skeleton for image upload areas
 */
export const ImageUploadSkeleton: React.FC = () => (
    <div className="p-4 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 min-h-[120px] flex items-center justify-center">
        <Skeleton className="h-20 w-20 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
    </div>
);

/**
 * Skeleton for order detail sections
 */
export const OrderDetailSkeleton: React.FC = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-10 w-32 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
                <StatCardSkeleton key={i} />
            ))}
        </div>
        <CardSkeleton height="h-64" />
    </div>
);

/**
 * Skeleton for configuration pages
 */
export const ConfigSkeleton: React.FC = () => (
    <div className="space-y-6">
        <Skeleton className="h-10 w-64 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
                <FormInputSkeleton key={i} />
            ))}
        </div>
        <div className="flex gap-3">
            <Skeleton className="h-10 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <Skeleton className="h-10 w-32 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        </div>
    </div>
);

/**
 * Grid of skeleton cards
 */
export const SkeletonGrid: React.FC<{ count?: number; component?: React.FC }> = ({
    count = 6,
    component: Component = ProductCardSkeleton
}) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, i) => (
            <Component key={i} />
        ))}
    </div>
);

/**
 * List of skeleton rows
 */
export const SkeletonList: React.FC<{ count?: number; columns?: number }> = ({
    count = 5,
    columns = 4
}) => (
    <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
            <TableRowSkeleton key={i} columns={columns} />
        ))}
    </div>
);
