import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

@Injectable()
export class LoadingService {

    private loadingSubject = new BehaviorSubject<boolean>(false);
    
    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
        return of(null)
            .pipe(
                tap(() => this.loadingOn()),
                concatMap(() => obs$),
                finalize(() => this.loadingOff())
            )
    }

    loadingOn(): void {
        this.loadingSubject.next(true);
    }

    loadingOff(): void {
        this.loadingSubject.next(false);
    }
    
}