import React, { useEffect, useReducer, useCallback, useState } from 'react';
import { Card, Button, Input, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from '@nextui-org/react';
import {
    fetchSocialLinks,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    fetchAvailableIcons
} from '@/hooks/socialsLinksService';
import { EyeFilledIcon, EyeSlashFilledIcon, EditProductIcon, MiniTrashIcon } from './icons';
import { socialLinksReducer, initialState } from '@/hooks/socialLinksReducer';
import { SocialLink, IconOption } from '@/types';

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
    const handleIconChange = (selectedKeys: Set<string>) => {
        const selectedIconKey = Array.from(selectedKeys)[0];
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
        <div>
            <Button color='warning' onClick={() => dispatch({ type: 'OPEN_ADD_MODAL' })} style={{ marginTop: '1rem' }}>
                Agregar Enlace
            </Button>

            {/* Links List */}
            {state.links.map((link) => (
                <Card key={link._id} style={{ marginTop: '1rem' }} isBlurred className="p-0 border-1 border-[#0ea5e9]/30 bg-[#0c4a6e]/40">
                    <CardBody>
                        <div className='flex gap-5 justify-between items-center'>
                          
                            <div>{link.title}</div>
                            
                            <div className='flex gap-5 items-center'>
                                <Button isIconOnly variant="flat" color='success' onClick={() => handleEditLink(link)}>
                                    <EditProductIcon size={16} />
                                </Button>
                                <Button color="danger" variant="flat" isIconOnly onClick={() => openDeleteModal(link._id)}>
                                    <MiniTrashIcon size={18} />
                                </Button>
                                <Button color="default" variant="flat" isIconOnly onClick={() => handleToggleActive(link)}>
                                    {link.is_active ? (
                                        <EyeFilledIcon className="text-2xl text-[#ffffff]" />
                                    ) : (
                                        <EyeSlashFilledIcon className="text-2xl text-[#cccccc]" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}

            {/* Add/Edit Modal */}
            <Modal isOpen={state.showModal} onClose={() => dispatch({ type: 'CLOSE_MODAL' })} className='backdrop-blur-md border-1 border-[#0ea5e9]/20 bg-[#082f49]/90'>
                <ModalContent>
                    <ModalHeader>{state.editingLink ? 'Editar Enlace Social' : 'Agregar Enlace Social'}</ModalHeader>
                    <ModalBody>
                        <Select
                            label="Icono"
                            variant="bordered"
                            selectedKeys={new Set([state.newLink.icon])}
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
                            label="Título"
                            value={state.newLink.title}
                            onChange={(e) => dispatch({ type: 'SET_NEW_LINK_TITLE', payload: e.target.value })}
                            placeholder="Ingrese el título"
                            classNames={
                                {
                                    label: "text-black/50 dark:text-white/90",
                                    innerWrapper: "bg-transparent",
                                    input: [
                                        "bg-transparent",
                                        "text-black/90 dark:text-white/90",
                                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                    ],
                                    inputWrapper: [
                                        "shadow-xl",
                                        "bg-cyan-500/50",
                                        "dark:bg-cyan-600/10",
                                        "backdrop-blur-xl",
                                        "backdrop-saturate-200",
                                        "hover:bg-default-200/70",
                                        "dark:hover:bg-default/70",
                                        "group-data-[focus=true]:bg-default-200/50",
                                        "dark:group-data-[focus=true]:bg-default/60",
                                        "!cursor-text",
                                    ],
                                }
                            }
                        />
                        <Input
                            label="URL"
                            value={state.newLink.url}
                            onChange={(e) => dispatch({ type: 'SET_NEW_LINK_URL', payload: e.target.value })}
                            placeholder="Ingrese la URL"
                            classNames={
                                {
                                    label: "text-black/50 dark:text-white/90",
                                    innerWrapper: "bg-transparent",
                                    input: [
                                        "bg-transparent",
                                        "text-black/90 dark:text-white/90",
                                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                    ],
                                    inputWrapper: [
                                        "shadow-xl",
                                        "bg-cyan-500/50",
                                        "dark:bg-cyan-600/10",
                                        "backdrop-blur-xl",
                                        "backdrop-saturate-200",
                                        "hover:bg-default-200/70",
                                        "dark:hover:bg-default/70",
                                        "group-data-[focus=true]:bg-default-200/50",
                                        "dark:group-data-[focus=true]:bg-default/60",
                                        "!cursor-text",
                                    ],
                                }
                            }
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleAddOrEditLink}>
                            {state.editingLink ? 'Actualizar Enlace' : 'Agregar Enlace'}
                        </Button>
                        <Button onClick={() => dispatch({ type: 'CLOSE_MODAL' })} color="secondary">
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={state.showDeleteModal} onClose={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })} className='backdrop-blur-md border-1 border-[#0ea5e9]/20 bg-[#082f49]/90'>
                <ModalContent>
                    <ModalHeader>Confirmar Eliminación</ModalHeader>
                    <ModalBody>
                        ¿Estás seguro que deseas eliminar este enlace?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={handleDeleteLink}>
                            Eliminar
                        </Button>
                        <Button onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })} color="secondary">
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default SocialLinksManager;
