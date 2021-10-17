interface TLocalStorageMockReturn {
	getItem(item: string): string | null;
	setItem(item: string, value: string): void;
	removeItem(item: string): void;
}

const localStorageMock = (storageData = ''): TLocalStorageMockReturn => {
	const data = JSON.parse(storageData);

	return {
		getItem: (item) => {
			if (data[item]) {
				return JSON.stringify(data[item]);
			}
			
			return null;
		},
		setItem: (item, value) => {
			data[item] = JSON.parse(value);
		},
		removeItem: (item) => {
			delete data[item];
		}
	}
}

export default localStorageMock;
