import '@testing-library/jest-dom';

class LocalStorageMock {
    private store: { [key: string]: string };

    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key: string): string | null {
        return this.store[key] || null;
    }

    setItem(key: string, value: string) {
        this.store[key] = value;
    }

    removeItem(key: string) {
        delete this.store[key];
    }
}

class SessionStorageMock {
    private store: { [key: string]: string };

    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key: string): string | null {
        return this.store[key] || null;
    }

    setItem(key: string, value: string) {
        this.store[key] = value;
    }

    removeItem(key: string) {
        delete this.store[key];
    }
}

(global as any).localStorage = new LocalStorageMock();
(global as any).sessionStorage = new SessionStorageMock();

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () { },
            removeListener: function () { }
        };
    };
