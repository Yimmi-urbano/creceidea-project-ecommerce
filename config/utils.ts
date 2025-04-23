export const getDomainFromLocalStorage = (): string => {
    if (typeof window !== "undefined") {
        const domain = localStorage.getItem('domainSelect');
        return domain ?? ''; 
    }
    return ''; 
};
