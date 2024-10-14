import { SocialLink } from '@/types';

// Definir el estado inicial
export const initialState = {
    links: [] as SocialLink[],
    newLink: { title: '', icon: '', url: '', is_active: true },
    editingLink: null as SocialLink | null,
    showModal: false,
    showDeleteModal: false,
    selectedLinkId: null as string | null,
};

// Definir los tipos de las acciones
type Action =
    | { type: 'SET_LINKS'; payload: SocialLink[] }
    | { type: 'SET_NEW_LINK_TITLE'; payload: string }
    | { type: 'SET_NEW_LINK_ICON'; payload: { key: string; value: string } }
    | { type: 'SET_NEW_LINK_URL'; payload: string }
    | { type: 'RESET_NEW_LINK' }
    | { type: 'SET_EDITING_LINK'; payload: SocialLink }
    | { type: 'SET_SELECTED_LINK_ID'; payload: string }
    | { type: 'RESET_SELECTED_LINK' }
    | { type: 'OPEN_ADD_MODAL' }
    | { type: 'CLOSE_MODAL' }
    | { type: 'OPEN_DELETE_MODAL' }
    | { type: 'CLOSE_DELETE_MODAL' };

// Reducer para manejar el estado
export const socialLinksReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'SET_LINKS':
            return { ...state, links: action.payload };

        case 'SET_NEW_LINK_TITLE':
            return { ...state, newLink: { ...state.newLink, title: action.payload } };

        case 'SET_NEW_LINK_ICON':
            return { ...state, newLink: { ...state.newLink, icon: action.payload.key, title: action.payload.value } };

        case 'SET_NEW_LINK_URL':
            return { ...state, newLink: { ...state.newLink, url: action.payload } };

        case 'RESET_NEW_LINK':
            return { ...state, newLink: { title: '', icon: '', url: '', is_active: true }, editingLink: null };

        case 'SET_EDITING_LINK':
            return { ...state, newLink: { ...action.payload }, editingLink: action.payload, showModal: true };

        case 'SET_SELECTED_LINK_ID':
            return { ...state, selectedLinkId: action.payload, showDeleteModal: true };

        case 'RESET_SELECTED_LINK':
            return { ...state, selectedLinkId: null, showDeleteModal: false };

        case 'OPEN_ADD_MODAL':
            return { ...state, showModal: true, editingLink: null };

        case 'CLOSE_MODAL':
            return { ...state, showModal: false, editingLink: null };

        case 'CLOSE_DELETE_MODAL':
            return { ...state, showDeleteModal: false };

        default:
            return state;
    }
};
