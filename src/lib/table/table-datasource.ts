import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class GhTableDataSource<T> {
    private readonly _data = new BehaviorSubject<T[]>([]);

    get data() {
        return this._data.value;
    }
    set data(data: T[]) {
        this._data.next(data);
    }

    connect() {
    }

    disconnect() {
    }
}
