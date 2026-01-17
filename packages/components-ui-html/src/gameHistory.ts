export type HistoryEntry = {
	id: string;
	bookId: string | number;
	betAmount: number;
	winAmount: number;
	payoutMultiplier: number;
	timestamp: number;
};

const STORAGE_KEY = 'gameHistory';
const MAX_ENTRIES = 50;

function loadHistory(): HistoryEntry[] {
	if (typeof window === 'undefined') return [];
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
}

function saveHistory(history: HistoryEntry[]) {
	if (typeof window === 'undefined') return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function addEntry(entry: Omit<HistoryEntry, 'id'>) {
	console.log('addEntry called with:', entry);
	const history = loadHistory();
	
	const newEntry: HistoryEntry = {
		...entry,
		id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
	};
	
	history.unshift(newEntry);
	
	if (history.length > MAX_ENTRIES) {
		history.splice(MAX_ENTRIES);
	}
	
	console.log('Saving history:', history);
	saveHistory(history);
}

export function clearHistory() {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(STORAGE_KEY);
	}
}

export function getHistory(): HistoryEntry[] {
	return loadHistory();
}
