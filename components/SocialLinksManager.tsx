import React, { useEffect, useState } from 'react';
import { Card, Button, Input, CardBody, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import {
    fetchSocialLinks,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    fetchAvailableIcons
} from '@/hooks/socialsLinksService';
import { EyeFilledIcon, EyeSlashFilledIcon, EditProductIcon, MiniTrashIcon, UpdateIcon } from './icons';

const SocialLinksManager = () => {
    const [links, setLinks] = useState<any[]>([]);
    const [newLink, setNewLink] = useState({ title: '', icon: '', url: '', is_active: true });
    const [editingLink, setEditingLink] = useState<any | null>(null);
    const [showAddCard, setShowAddCard] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar el modal de confirmación de eliminación
    const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null); // Enlace seleccionado para eliminar
    const [availableIcons, setAvailableIcons] = useState<any[]>([]);

    const refreshLinks = async () => {
        try {
            const fetchedLinks = await fetchSocialLinks();
            setLinks(fetchedLinks);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await refreshLinks();
            const icons = await fetchAvailableIcons();
            setAvailableIcons(icons);
        };
        fetchData();
    }, []);

    const handleIconChange = (selectedKeys: any) => {
        const selectedIconKey = Array.from(selectedKeys)[0];
        const selectedIcon = availableIcons.find(icon => icon.key === selectedIconKey);
        if (selectedIcon) {
            setNewLink((prev) => ({ ...prev, icon: selectedIcon.key, title: selectedIcon.value }));
        }
    };

    const getDisabledKeys = () => {
        return new Set(
            links
                .filter((link) => !editingLink || link._id !== editingLink._id)
                .map((link) => link.icon)
        );
    };

    const handleAddLink = async () => {
        try {
            await addSocialLink(newLink);
            setNewLink({ title: '', icon: '', url: '', is_active: true });
            setShowAddCard(false);
            refreshLinks();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditLink = (link: any) => {
        setEditingLink(link);
        setNewLink({ ...link });
    };

    const handleUpdateLink = async () => {
        if (editingLink) {
            try {
                await updateSocialLink({ ...newLink, _id: editingLink._id });

                setNewLink({ title: '', icon: '', url: '', is_active: true });
                setEditingLink(null);
                refreshLinks();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleDeleteLink = async () => {
        if (selectedLinkId) {
            try {
                await deleteSocialLink(selectedLinkId);
                setShowDeleteModal(false); // Cerrar el modal después de eliminar
                setSelectedLinkId(null); // Resetear el estado del enlace seleccionado
                refreshLinks();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleToggleActive = async (link: any) => {
        const updatedLink = { ...link, is_active: !link.is_active };
        try {
            await updateSocialLink(updatedLink);
            refreshLinks();
        } catch (error) {
            console.error(error);
        }
    };

    const openDeleteModal = (linkId: string) => {
        setSelectedLinkId(linkId); // Guardar el ID del enlace a eliminar
        setShowDeleteModal(true); // Abrir el modal de confirmación
    };

    return (
        <div>
                  {/* Botón para abrir el modal de agregar enlace */}
                  <Button color='warning' onClick={() => setShowAddCard(true)} style={{ marginTop: '1rem' }}>
                Agregar Enlace
            </Button>
            {links.map((link) => (
                <Card key={link._id} style={{ marginTop: '1rem' }} isBlurred className="p-0  border-1 border-[#0ea5e9]/30 bg-[#0c4a6e]/40">
                    <CardBody>
                        <div className='flex gap-5 flex-col md:flex-row relative'>
                            <Select
                                className='w-[250px]'
                                label="Icono"
                                variant="flat"
                                selectedKeys={editingLink?._id === link._id ? new Set([newLink.icon]) : new Set([link.icon])}
                                onSelectionChange={handleIconChange}
                                disabledKeys={getDisabledKeys()}
                                disabled={editingLink?._id !== link._id}
                                classNames={{
                                    trigger: ["bg-[#082f49]/90"],
                                    popoverContent: ["backdrop-blur-md bg-[#082f49]/80"]
                                  }}
                            >
                                {availableIcons.map((icon) => (
                                    <SelectItem key={icon.key} value={icon.key}>
                                        {icon.value}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Input
                                className='hidden d-none'
                                label="Título"
                                value={editingLink?._id === link._id ? newLink.title : link.title}
                                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                placeholder="Ingrese el título"
                                disabled={editingLink?._id !== link._id}
                            />
                            <Input
                                label="URL"
                                value={editingLink?._id === link._id ? newLink.url : link.url}
                                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                placeholder="Ingrese la URL"
                                disabled={editingLink?._id !== link._id}
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
                                        "bg-cyan-500/40",
                                        "dark:bg-cyan-600/30",
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
                            <div className='flex gap-5  order-1 items-center absolute md:relative right-0'>
                                {editingLink?._id === link._id ? (
                                    <Button isIconOnly onClick={handleUpdateLink} variant="flat"
                                        className='p-1 min-w-6 w-6 h-6 rounded-md' color='warning'>
                                        <UpdateIcon size={16} />
                                    </Button>
                                ) : (
                                    <Button isIconOnly variant="flat"
                                        className='p-0 min-w-6 w-6 h-6 rounded-md' color='success' onClick={() => handleEditLink(link)}>
                                        <EditProductIcon size={16} />
                                    </Button>
                                )}
                                <Button color="danger" variant="flat"
                                    className='p-0 min-w-6 w-6 h-6 rounded-md' isIconOnly onClick={() => openDeleteModal(link._id)}>
                                    <MiniTrashIcon size={18} />
                                </Button>

                                <Button color="default" variant="flat"
                                    className='p-1 min-w-6 w-6 h-6 rounded-md' isIconOnly onClick={() => handleToggleActive(link)}>

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

      

            {/* Modal para agregar enlace */}
            <Modal isOpen={showAddCard} onClose={() => setShowAddCard(false)}>
                <ModalContent>
                    <ModalHeader>Agregar Enlace Social</ModalHeader>
                    <ModalBody>
                        <Select
                            label="Icono"
                            variant="bordered"
                            selectedKeys={new Set([newLink.icon])}
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
                            value={newLink.title}
                            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                            placeholder="Ingrese el título"
                        />
                        <Input
                            label="URL"
                            value={newLink.url}
                            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                            placeholder="Ingrese la URL"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleAddLink}>
                            Agregar Enlace
                        </Button>
                        <Button onClick={() => setShowAddCard(false)} color="secondary">
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal de confirmación para eliminar */}
            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <ModalContent>
                    <ModalHeader>Confirmar Eliminación</ModalHeader>
                    <ModalBody>
                        ¿Estás seguro que deseas eliminar este enlace?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={handleDeleteLink}>
                            Eliminar
                        </Button>
                        <Button onClick={() => setShowDeleteModal(false)} color="secondary">
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default SocialLinksManager;
