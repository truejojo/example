import { ref } from 'vue';

const useIndexedDB = (dbName, dbStoreName) => {
	const db = ref(null);

	const openDB = async (dbVersion, dbIndexes) => {
		return new Promise((resolve, reject) => {
			const dbRequest = window.indexedDB.open(dbName, dbVersion);

			dbRequest.addEventListener('upgradeneeded', event => {
				const db = event.target.result;

				if (!db.objectStoreNames.contains(dbStoreName)) {
					const objectStore = db.createObjectStore(dbStoreName, {
						keyPath: 'id',
						autoIncrement: true,
					});
					dbIndexes.forEach(index => {
						objectStore.createIndex(index, index, { unique: false });
					});
				}
			});
			dbRequest.addEventListener('success', () => {
				db.value = dbRequest.result;
				resolve();
			});
			dbRequest.addEventListener('error', event => {
				console.error('Failed to open database:', event.target.error);
				reject(event.target.error);
			});
		});
	};

	const addRecord = record => {
		const objectStore = makeTransaction(dbStoreName, 'readwrite');
		const request = objectStore.add(record);

		request.addEventListener('success', event => {
			return event;
		});
		request.addEventListener('error', event => {
			console.error('Failed to add record:', event.target.error);
			return event;
		});
	};

	const updateRecord = record => {
		const objectStore = makeTransaction(dbStoreName, 'readwrite');
		const request = objectStore.put(record);

		request.addEventListener('success', event => {
			return event;
		});
		request.addEventListener('error', event => {
			console.error('Failed to update record:', event.target.error);
			return event;
		});
	};

	const deleteRecord = id => {
		const objectStore = makeTransaction(dbStoreName, 'readwrite');
		const request = objectStore.delete(id);

		request.addEventListener('success', event => {
			return event;
		});
		request.addEventListener('error', event => {
			console.error('Failed to delete record:', event.target.error);
			return event;
		});
	};

	const getRecord = id => {
		return new Promise((resolve, reject) => {
			const objectStore = makeTransaction(dbStoreName, 'readonly');
			const request = objectStore.get(id);

			request.addEventListener('success', () => {
				resolve(request.result);
			});
			request.addEventListener('error', event => {
				reject(event.target.error);
			});
		});
	};

	// const getRecords = () => {
	// 	return new Promise((resolve, reject) => {
	// 		const objectStore = makeTransaction(dbStoreName, 'readonly');
	// 		const request = objectStore.getAll();

	// 		request.addEventListener('success', () => {
	// 			resolve(request.result);
	// 		});
	// 		request.addEventListener('error', event => {
	// 			reject(event.target.error);
	// 		});
	// 	});
	// };

	const closeDB = () => {
		db.value.close();
	};
	/**
    const allRecords = await getRecords();
    console.log(allRecords);

    // Datensätze mit Filter abrufen
    const query = {
        index: 'changeTS',
        range: { lower: null }, // Alle Datensätze, wo changeTS !== null
        filters: {
            gender: { operator: '===', value: 'female' },
            dateTS: { operator: '>', value: 20240401 },
            tag: { operator: '===', value: 'sport', logic: 'OR' }
        }
    };
    const filteredRecords = await getRecords(query);
    console.log(filteredRecords);
     */
	const getRecords = (query = null) => {
		return new Promise((resolve, reject) => {
			const objectStore = makeTransaction(dbStoreName, 'readonly').objectStore(
				dbStoreName
			);
			let request;

			if (!query) {
				request = objectStore.getAll();
			} else {
				const { index, range, filters } = query;

				if (index && range) {
					const indexRange = getObjectStoreRange(index, range);
					request = objectStore.index(index).openCursor(indexRange);
				} else {
					request = objectStore.openCursor();
				}
			}

			const records = [];

			request.onsuccess = event => {
				const cursor = event.target.result;
				if (cursor) {
					const record = cursor.value;
					if (!query || !filters || passesFilters(record, filters)) {
						records.push(record);
					}
					cursor.continue();
				} else {
					resolve(records);
				}
			};

			request.onerror = event => {
				reject(event.target.error);
			};
		});
	};
	/*
    const getRecords = (query = null, sortBy = 'createTS', sortOrder = 'desc') => {
        return new Promise((resolve, reject) => {
            const objectStore = makeTransaction(dbStoreName, 'readonly').objectStore(dbStoreName);
            let request;

            if (!query) {
                const index = sortBy !== 'createTS' ? sortBy : null;
                request = objectStore.getAll(index);
            } else {
                const { index, range, filters } = query;

                if (index && range) {
                    const indexRange = getObjectStoreRange(range);
                    request = objectStore.index(index).openCursor(indexRange);
                } else {
                    request = objectStore.openCursor();
                }
            }

            const records = [];

            request.onsuccess = event => {
                const cursor = event.target.result;
                if (cursor) {
                    const record = cursor.value;
                    if (!query || !filters || passesFilters(record, filters)) {
                        records.push(record);
                    }
                    cursor.continue();
                } else {
                    const sortedRecords = sortRecords(records, sortBy, sortOrder);
                    resolve(sortedRecords);
                }
            };

            request.onerror = event => {
                reject(event.target.error);
            };
        });
    };

    const sortRecords = (records, sortBy, sortOrder) => {
        return records.sort((a, b) => {
            const aValue = sortBy === 'createTS' ? new Date(a[sortBy]) : a[sortBy];
            const bValue = sortBy === 'createTS' ? new Date(b[sortBy]) : b[sortBy];

            if (sortOrder === 'asc') {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }
        });
    }; 
    */
	// helper functions
	const getObjectStoreRange = range => {
		if (range.lower !== undefined && range.upper !== undefined) {
			return IDBKeyRange.bound(
				range.lower,
				range.upper,
				range.lowerOpen,
				range.upperOpen
			);
		} else if (range.lower !== undefined) {
			return IDBKeyRange.lowerBound(range.lower, range.lowerOpen);
		} else if (range.upper !== undefined) {
			return IDBKeyRange.upperBound(range.upper, range.upperOpen);
		} else {
			return null;
		}
	};

	const passesFilters = (record, filters) => {
		return Object.keys(filters).every(field => {
			const { operator, value } = filters[field];
			switch (operator) {
				case '===':
					return record[field] === value;
				case '!==':
					return record[field] !== value;
				case '>':
					return record[field] > value;
				case '<':
					return record[field] < value;
				case '>=':
					return record[field] >= value;
				case '<=':
					return record[field] <= value;
				default:
					return true; // Default to true if operator is not recognized
			}
		});
	};
	/**
	 * Builds a transaction object and returns the object store
	 * @param {*} dbStoreName
	 * @param {*} mode
	 * @param {*} callback
	 * @returns
	 */
	const makeTransaction = (dbStoreName, mode, callback = null) => {
		const transaction = db.value.transaction(dbStoreName, mode);

		transaction.addEventListener('complete', event => {
			typeof callback === 'function' && callback();
			return event;
		});
		transaction.addEventListener('error', event => {
			console.error('Transaction failed:', event.target.error);
			return event;
		});
		return transaction.objectStore(dbStoreName);
	};

	return {
		openDB,
		addRecord,
		updateRecord,
		deleteRecord,
		getRecords,
		getRecord,
		closeDB,
	};
};

export default useIndexedDB;
