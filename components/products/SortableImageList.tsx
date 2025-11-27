import React, { useMemo, useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Image, Button } from '@nextui-org/react';
import { MiniTrashIcon } from '../icons';
import { GripVertical } from 'lucide-react';

interface SortableImageListProps {
  images: string[];
  onRemove: (index: number) => void;
  onReorder: (newOrder: string[]) => void;
}

interface SortableImageItemProps {
  url: string;
  index: number;
  onRemove: (index: number) => void;
}

function SortableImageItem({ url, index, onRemove }: SortableImageItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: index });

  const style: React.CSSProperties = useMemo(() => {
    // Solo aplicar transición cuando no se está arrastrando y hay una transformación
    const shouldAnimate = !isDragging && transform !== null;
    
    return {
      transform: CSS.Transform.toString(transform),
      transition: isDragging 
        ? 'none' 
        : (shouldAnimate && transition ? transition : undefined),
      opacity: isDragging ? 0.5 : 1,
      zIndex: isDragging ? 50 : 1,
    };
  }, [transform, transition, isDragging]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group overflow-visible border-1 border-[#0ea5e9]/30 h-[80px] min-w-20 md:h-[200px] md:w-[200px] w-full rounded-lg"
    >
      <Image
        src={url}
        className="object-cover h-[80px] md:h-[200px] w-full pointer-events-none rounded-lg"
        isBlurred
      />
      
      {/* Área arrastrable - toda la imagen */}
      <div
        {...attributes}
        {...listeners}
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing rounded-lg"
        style={{ touchAction: 'none' }}
      />
      
      {/* Botón de arrastrar - indicador visual */}
      <div
        className="absolute top-2 left-2 z-20 bg-black/50 hover:bg-black/70 rounded-lg p-2 pointer-events-none"
      >
        <GripVertical className="w-4 h-4 text-white" />
      </div>

      {/* Botón de eliminar - dentro del contenedor de la imagen */}
      <div className="absolute top-2 right-2 z-50 pointer-events-none">
        <Button
          data-remove-button
          isIconOnly
          size="sm"
          color="danger"
          className=" shadow-lg pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onRemove(index);
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <MiniTrashIcon size={16} />
        </Button>
      </div>

      {/* Indicador de posición */}
      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-20 pointer-events-none">
        #{index + 1}
      </div>
    </div>
  );
}

export default function SortableImageList({
  images,
  onRemove,
  onReorder,
}: SortableImageListProps) {
  // Estado local para manejar el orden durante la animación
  const [localImages, setLocalImages] = useState(images);
  
  // Sincronizar cuando cambian las imágenes desde fuera
  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = active.id as number;
      const newIndex = over.id as number;

      const newOrder = arrayMove(localImages, oldIndex, newIndex);
      
      // Actualizar estado local inmediatamente para la animación
      setLocalImages(newOrder);
      
      // Actualizar estado padre después de que termine la animación
      requestAnimationFrame(() => {
        setTimeout(() => {
          onReorder(newOrder);
        }, 250); // Duración de la transición
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={useMemo(() => localImages.map((_, index) => index), [localImages.length])} 
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-4 gap-4">
          {localImages.map((url, index) => (
            <SortableImageItem
              key={`${url}-${index}`}
              url={url}
              index={index}
              onRemove={onRemove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
