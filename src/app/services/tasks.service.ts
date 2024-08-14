import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SelectData, Task } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class TaksService {
  protected http = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks')
  }

  getProjects(): Observable<SelectData[]> {
    return this.http.get<Task[]>('/api/tasks')
      .pipe(
        map(tasks => {
          const uniqueProjects = new Set(tasks.map(task => task.project));
          return [...uniqueProjects].map((projectName, index) => ({
            id: index + 1,
            text: projectName
          }));
        })
      );
  }
}
