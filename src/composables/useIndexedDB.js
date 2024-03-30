import { ref } from 'vue';

const useIndexedDB = (dbName, storeName) => {
  	const db = ref(null);

	const openDB = async () => {
        return new Promise((resolve, reject) => {
            const dbRequest = window.indexedDB.open(dbName, 2);
        
            dbRequest.addEventListener("upgradeneeded", (event) => {
                console.log("Upgrade from version", event.oldVersion, "to", event.newVersion);
                const db = event.target.result;
        
                if (!db.objectStoreNames.contains(storeName)) {
                    const objectStore = db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
                    objectStore.createIndex("title", "title", { unique: false });
                    objectStore.createIndex("date", "date", { unique: false });
                    objectStore.createIndex("changeTS", "changeTS", { unique: false });
                }
            });
        
            dbRequest.addEventListener("success", () => {
                db.value = dbRequest.result;
                resolve();    
            });
        
            dbRequest.addEventListener("error", (event) => {
                console.error("Failed to open database:", event.target.error);
                reject(event.target.error);
            });
        });
	};

	const addRecord = record => {
        const transaction = db.value.transaction(storeName, "readwrite");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.add(record);

        request.addEventListener("success", () => {
            console.log("Record added successfully");
        });

        request.addEventListener("error", (event) => {
            console.error("Failed to add record:", event.target.error);
        });
    };

	const updateRecord = record => {
        const transaction = db.value.transaction(storeName, "readwrite");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.put(record);

        request.addEventListener("success", () => {
            console.log("Record updated successfully");
        });

        request.addEventListener("error", (event) => {
            console.error("Failed to update record:", event.target.error);
        });
    };

	const deleteRecord = id => {
        const transaction = db.value.transaction(storeName, "readwrite");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.delete(id);

        request.addEventListener("success", () => {
            console.log("Record deleted successfully");
        });

        request.addEventListener("error", (event) => {
            console.error("Failed to delete record:", event.target.error);
        });
    };

	const getRecords = () => {
        return new Promise((resolve, reject) => {
            const transaction = db.value.transaction(storeName, "readonly");
            const objectStore = transaction.objectStore(storeName);
            const request = objectStore.getAll();

            request.addEventListener("success", () => {
                resolve(request.result);
            });

            request.addEventListener("error", (event) => {
                reject(event.target.error);
            });
        });
    };

	return {
        openDB,
		addRecord,
		updateRecord,
		deleteRecord,
		getRecords,
	};
};

export default useIndexedDB;