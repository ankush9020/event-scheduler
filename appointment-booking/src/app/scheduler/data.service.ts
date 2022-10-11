import {Injectable} from '@angular/core';
import {DayPilot} from 'daypilot-pro-angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class DataService {

  resources: DayPilot.ResourceData[] = [
    {
      name: '', id: 'GA', expanded: true, children: [
        
      ]
    },
    {
      name: '', id: 'GB', expanded: true, children: [
       
      ]
    }
  ];

  events: DayPilot.EventData[] = [
    {
      id: '1',
      resource: 'R1',
      start: '2022-07-03',
      end: '2022-07-08',
      text: 'Scheduler Event 1',
      barColor: '#e69138'
    },
    {
      id: '2',
      resource: 'R3',
      start: '2022-07-02',
      end: '2022-07-05',
      text: 'Scheduler Event 2',
      barColor: '#6aa84f'
    },
    {
      id: '3',
      resource: 'R3',
      start: '2022-07-06',
      end: '2022-07-09',
      text: 'Scheduler Event 3',
      barColor: '#3c78d8'
    }
  ];

  constructor(private http: HttpClient) {
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

  getResources(): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.resources);
      }, 200);
    });

    // return this.http.get("/api/resources");
  }

}
