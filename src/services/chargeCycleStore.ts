export interface ChargeCycle {
  id: string;
  timestamp: number;
  startLevel: number;
  endLevel: number;
  addedMah: number;
  type: string;
}

const DB_NAME = 'ampere-eye-db';
const DB_VERSION = 1;
const STORE_NAME = 'charge_cycles';

const defaultCycles: ChargeCycle[] = [
  {
    id: 'cycle-1',
    timestamp: new Date('2026-05-24T08:00:00Z').getTime(),
    startLevel: 15,
    endLevel: 80,
    addedMah: 3250,
    type: 'Fast Charge'
  },
  {
    id: 'cycle-2',
    timestamp: new Date('2026-05-23T08:00:00Z').getTime(),
    startLevel: 42,
    endLevel: 95,
    addedMah: 2650,
    type: 'Standard'
  },
  {
    id: 'cycle-3',
    timestamp: new Date('2026-05-21T08:00:00Z').getTime(),
    startLevel: 5,
    endLevel: 100,
    addedMah: 4750,
    type: 'Full Cycle'
  }
];

const openDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });

const getAllCyclesFromDb = async (): Promise<ChargeCycle[]> => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const result = (request.result as ChargeCycle[]).sort((a, b) => b.timestamp - a.timestamp);
      resolve(result);
    };

    request.onerror = () => reject(request.error);
  });
};

const saveCyclesToDb = async (cycles: ChargeCycle[]): Promise<void> => {
  const db = await openDb();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    cycles.forEach((cycle) => {
      store.put(cycle);
    });

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export const getChargeCycles = async (): Promise<ChargeCycle[]> => {
  try {
    const cycles = await getAllCyclesFromDb();

    if (cycles.length > 0) {
      return cycles;
    }

    await saveCyclesToDb(defaultCycles);
    return defaultCycles;
  } catch {
    const fallback = localStorage.getItem(STORE_NAME);

    if (fallback) {
      return JSON.parse(fallback) as ChargeCycle[];
    }

    localStorage.setItem(STORE_NAME, JSON.stringify(defaultCycles));
    return defaultCycles;
  }
};
