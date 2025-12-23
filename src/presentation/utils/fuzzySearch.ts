import { SearchableItem } from '../data/searchableItems';

/**
 * Calcula la similitud entre dos strings usando el algoritmo de Levenshtein simplificado
 * @param str1 - Primera cadena
 * @param str2 - Segunda cadena
 * @returns Puntuación de similitud (mayor es mejor)
 */
function calculateSimilarity(str1: string, str2: string): number {
	const s1 = str1.toLowerCase();
	const s2 = str2.toLowerCase();

	// Coincidencia exacta
	if (s1 === s2) {
		return 100;
	}

	// Coincidencia al inicio
	if (s1.startsWith(s2) || s2.startsWith(s1)) {
		return 90;
	}

	// Contiene la búsqueda
	if (s1.includes(s2)) {
		return 70;
	}

	// Palabras que empiezan con la búsqueda
	const words = s1.split(' ');
	for (const word of words) {
		if (word.startsWith(s2)) {
			return 60;
		}
	}

	// Caracteres en común
	let matches = 0;
	for (const char of s2) {
		if (s1.includes(char)) {
			matches++;
		}
	}

	return (matches / s2.length) * 50;
}

/**
 * Busca items que coincidan con el query usando fuzzy search
 * @param items - Array de items buscables
 * @param query - Término de búsqueda
 * @param maxResults - Número máximo de resultados (default: 8)
 * @returns Array de items ordenados por relevancia
 */
export function fuzzySearch(
	items: SearchableItem[],
	query: string,
	maxResults: number = 8
): SearchableItem[] {
	if (query.trim() === '') {
		return [];
	}

	const normalizedQuery = query.toLowerCase().trim();

	// Calcular puntuación para cada item
	const scoredItems = items.map((item) => {
		let score = 0;

		// Buscar en título
		const titleScore = calculateSimilarity(item.title, normalizedQuery);
		score += titleScore * 3; // El título tiene más peso

		// Buscar en descripción
		if (item.description !== undefined && item.description !== null && item.description !== '') {
			const descScore = calculateSimilarity(item.description, normalizedQuery);
			score += descScore;
		}

		// Buscar en keywords
		if (item.keywords !== undefined && item.keywords !== null && item.keywords.length > 0) {
			const keywordScores = item.keywords.map((keyword) =>
				calculateSimilarity(keyword, normalizedQuery)
			);
			const maxKeywordScore = Math.max(...keywordScores, 0);
			score += maxKeywordScore * 2; // Keywords tienen peso medio
		}

		return { item, score };
	});

	// Filtrar items con puntuación mínima y ordenar por relevancia
	return scoredItems
		.filter(({ score }) => score > 30) // Umbral mínimo de relevancia
		.sort((a, b) => b.score - a.score)
		.slice(0, maxResults)
		.map(({ item }) => item);
}

/**
 * Resalta el texto que coincide con el query
 * @param text - Texto original
 * @param query - Término de búsqueda
 * @returns Array de segmentos con flag de highlight
 */
export function highlightMatch(
	text: string,
	query: string
): Array<{ text: string; highlight: boolean }> {
	if (query.trim() === '') {
		return [{ text, highlight: false }];
	}

	const normalizedQuery = query.toLowerCase().trim();
	const lowerText = text.toLowerCase();
	const index = lowerText.indexOf(normalizedQuery);

	if (index === -1) {
		return [{ text, highlight: false }];
	}

	return [
		{ text: text.slice(0, index), highlight: false },
		{ text: text.slice(index, index + query.length), highlight: true },
		{ text: text.slice(index + query.length), highlight: false },
	].filter((segment) => segment.text.length > 0);
}
