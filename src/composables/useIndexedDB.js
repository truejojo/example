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

	const getRecords = () => {
		return new Promise((resolve, reject) => {
			const objectStore = makeTransaction(dbStoreName, 'readonly');
			const request = objectStore.getAll();

			request.addEventListener('success', () => {
				resolve(request.result);
			});
			request.addEventListener('error', event => {
				reject(event.target.error);
			});
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

	const closeDB = () => {
		db.value.close();
	};

	// helper functions
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
