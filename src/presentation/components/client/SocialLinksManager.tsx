import React, { useEffect, useReducer, useCallback, useState } from 'react';
import { Card, Button, Input, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from '@nextui-org/react';
import {
    fetchSocialLinks,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    fetchAvailableIcons
} from '@/src/presentation/hooks/socialsLinksService';
import { EyeFilledIcon, EyeSlashFilledIcon, EditProductIcon, MiniTrashIcon } from "@/src/presentation/components/shared/icons";
import { socialLinksReducer, initialState } from '@/src/presentation/reducers/socialLinksReducer';
import { SocialLink, IconOption } from '@/src/domain';

const SocialLinksManager = () => {
    const [state, dispatch] = useReducer(socialLinksReducer, initialState);
    const [availableIcons, setAvailableIcons] = useState<IconOption[]>([]);

    // Refresh links and fetch icons
    const refreshLinks = useCallback(async () => {
        try {
            const fetchedLinks = await fetchSocialLinks();
            dispatch({ type: 'SET_LINKS', payload: fetchedLinks });
        } catch (error) {
            console.error('Error fetching links:', error);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await refreshLinks();
            try {
                const icons = await fetchAvailableIcons();
                setAvailableIcons(icons);
            } catch (error) {
                console.error('Error fetching icons:', error);
            }
        };
        fetchData();
    }, [refreshLinks]);

    // Handle icon change
    const handleIconChange = (selectedKeys: Set<string> | any) => {
        const selectedIconKey = selectedKeys instanceof Set ? Array.from(selectedKeys)[0] : selectedKeys;
        const selectedIcon = availableIcons.find(icon => icon.key === selectedIconKey);
        if (selectedIcon) {
            dispatch({ type: 'SET_NEW_LINK_ICON', payload: selectedIcon });
        }
    };

    // Get disabled keys for icon select
    const getDisabledKeys = () => {
        return new Set(state.links
            .filter(link => !state.editingLink || link._id !== state.editingLink._id)
            .map(link => link.icon)
        );
    };

    // Handle Add or Edit link
    const handleAddOrEditLink = async () => {
        const actionType = state.editingLink ? 'update' : 'add';
        try {
            if (state.editingLink) {
                await updateSocialLink({ ...state.newLink, _id: state.editingLink._id });
            } else {
                await addSocialLink(state.newLink);
            }
            dispatch({ type: 'RESET_NEW_LINK' });
            refreshLinks();
            dispatch({ type: 'CLOSE_MODAL' });
        } catch (error) {
            console.error(`Error during ${actionType} link:`, error);
        }
    };

    // Handle link edit
    const handleEditLink = (link: SocialLink) => {
        dispatch({ type: 'SET_EDITING_LINK', payload: link });
    };

    // Handle link delete
    const handleDeleteLink = async () => {
        if (!state.selectedLinkId) return;
        try {
            await deleteSocialLink(state.selectedLinkId);
            dispatch({ type: 'RESET_SELECTED_LINK' });
            refreshLinks();
        } catch (error) {
            console.error('Error deleting link:', error);
        }
    };

    // Handle toggle link active status
    const handleToggleActive = async (link: SocialLink) => {
        try {
            const updatedLink = { ...link, is_active: !link.is_active };
            await updateSocialLink(updatedLink);
            refreshLinks();
        } catch (error) {
            console.error('Error toggling link active state:', error);
        }
    };

    // Open delete confirmation modal
    const openDeleteModal = (linkId: string) => {
        dispatch({ type: 'SET_SELECTED_LINK_ID', payload: linkId });
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Redes Sociales</h2>
                    <p className="text-sm text-zinc-500">Conecta tus perfiles para que tus clientes te encuentren.</p>
                </div>
                <Button
                    color='primary'
                    startContent={<span className="text-lg">+</span>}
                    onClick={() => dispatch({ type: 'OPEN_ADD_MODAL' })}
                >
                    Agregar red social
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {state.links.map((link) => (
                    <Card key={link._id} shadow="none" className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <CardBody className="p-4">
                            <div className='flex justify-between items-center'>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                        {/* Here ideally we render the Icon component dynamically if available, or just the title */}
                                        <span className="font-bold text-sm">{link.icon.substring(0, 2).toUpperCase()}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{link.title}</span>
                                        <span className="text-xs text-zinc-500 truncate max-w-[150px]">{link.url}</span>
                                    </div>
                                </div>

                                <div className='flex gap-1 items-center'>
                                    <Button isIconOnly variant="light" color='primary' size="sm" onClick={() => handleEditLink(link)}>
                                        <EditProductIcon size={18} />
                                    </Button>
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        color={link.is_active ? "success" : "default"}
                                        size="sm"
                                        onClick={() => handleToggleActive(link)}
                                    >
                                        {link.is_active ? (
                                            <EyeFilledIcon className="text-xl" />
                                        ) : (
                                            <EyeSlashFilledIcon className="text-xl text-zinc-400" />
                                        )}
                                    </Button>
                                    <Button color="danger" variant="light" isIconOnly size="sm" onClick={() => openDeleteModal(link._id)}>
                                        <MiniTrashIcon size={18} />
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}

                {state.links.length === 0 && (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-zinc-400 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                        <p>Aún no has conectado ninguna red social.</p>
                        <Button
                            variant="light"
                            color="primary"
                            className="mt-2"
                            onClick={() => dispatch({ type: 'OPEN_ADD_MODAL' })}
                        >
                            Agregar la primera
                        </Button>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={state.showModal}
                onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
                backdrop="blur"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        {state.editingLink ? 'Editar red social' : 'Agregar red social'}
                    </ModalHeader>
                    <ModalBody>
                        <Select
                            label="Plataforma"
                            placeholder="Selecciona una plataforma"
                            variant="bordered"
                            selectedKeys={state.newLink.icon ? new Set([state.newLink.icon]) : new Set()}
                            onSelectionChange={handleIconChange}
                            disabledKeys={getDisabledKeys()}
                        >
                            {availableIcons.map((icon) => (
                                <SelectItem key={icon.key} value={icon.key}>
                                    {icon.value}
                                </SelectItem>
                            ))}
                        </Select>
                        <Input
                            label="Nombre Visible"
                            variant="bordered"
                            value={state.newLink.title}
                            onChange={(e) => dispatch({ type: 'SET_NEW_LINK_TITLE', payload: e.target.value })}
                            placeholder="Ej: Síguenos en Facebook"
                            description="Este es el texto que verán tus clientes."
                        />
                        <Input
                            label="Enlace del perfil"
                            variant="bordered"
                            value={state.newLink.url}
                            onChange={(e) => dispatch({ type: 'SET_NEW_LINK_URL', payload: e.target.value })}
                            placeholder="https://facebook.com/tu-empresa"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => dispatch({ type: 'CLOSE_MODAL' })} variant="flat" color="danger">
                            Cancelar
                        </Button>
                        <Button onClick={handleAddOrEditLink} color='primary'>
                            {state.editingLink ? 'Guardar Cambios' : 'Agregar Red Social'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={state.showDeleteModal}
                onClose={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}
                backdrop="blur"
            >
                <ModalContent>
                    <ModalHeader>¿Eliminar esta red social?</ModalHeader>
                    <ModalBody>
                        <p className="text-zinc-600 dark:text-zinc-400">Esta acción eliminará el enlace permanentemente de tu tienda. ¿Estás seguro de continuar?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })} variant="flat">
                            Cancelar
                        </Button>
                        <Button color="danger" onClick={handleDeleteLink}>
                            Eliminar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default SocialLinksManager;
