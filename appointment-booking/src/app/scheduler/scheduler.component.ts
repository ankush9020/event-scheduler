import {Component, ViewChild, AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DayPilot, DayPilotSchedulerComponent} from 'daypilot-pro-angular';
import {DataService} from './data.service';

@Component({
  selector: 'app-scheduler',
  template: `<daypilot-scheduler [config]="config" [events]="events" #scheduler></daypilot-scheduler>`,
  styles: [``]
})
export class SchedulerComponent implements AfterViewInit {

  @ViewChild('scheduler')
  scheduler!: DayPilotSchedulerComponent;

  events: DayPilot.EventData[] = [];

  config: DayPilot.SchedulerConfig = {
    timeHeaders: [
      {groupBy: "Month"},
      {groupBy: "Day", format: "d"}
    ],
    scale: "Day",
    days: 30,
    startDate: "2022-10-01",
    
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args:any) => {
      const dp = args.control;
      const form = [
        { name: "Name", id: "text", type: "text"},
        { name: "Description", id: "description", type: "textarea"}
      ];
      const modal = await DayPilot.Modal.form(form);
      dp.clearSelection();
      if (modal.canceled) { return; }
      debugger
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        resource: args.resource,
        text: modal.result.description
      });
    },
    contextMenu: new DayPilot.Menu({
      items: [
        { text: "Edit...",
          onClick: async (args : any) => {
            const e = args.source;
            this.editEvent(e);
          }
        },
        { text: "Delete",
          onClick: (args : any) => {
            const e = args.source;
            this.scheduler.control.events.remove(e);
          }
        }
      ]
    }),
    onBeforeEventRender: (args : any)=> {
      args.data.areas = [
        {
          right: 5,
          top: 10,
          width: 16,
          height: 16,
          symbol: "assets/daypilot.svg#minichevron-down-2",
          fontColor: "#aaa",
          backColor: "#fff",
          action: "ContextMenu",
          style: "border: 1px solid #aaa",
          visibility: "Hover"
        }
      ];
    },
    bubble: new DayPilot.Bubble({
      onLoad: (args : any) => {
        args.html = DayPilot.Util.escapeHtml(args.source.description);
      }
    }),
    onEventClick: (args : any) => {
      this.editEvent(args.e);
    },
    eventMoveHandling: "Update",
    onEventMoved: (args: any) => {
      args.control.message("Event moved: " + args.e.text());
    },
    eventResizeHandling: "Update",
    onEventResized: (args: any) => {
      args.control.message("Event resized: " + args.e.text());
    },
    treeEnabled: true,
  };
  btnShow: any;

  constructor(private ds: DataService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.btnShow = res.showBtn;
  
    })
  }



  async editEvent(e: DayPilot.Event): Promise<void> {
    const form = [
      { name: "Name", id: "text", type: "text"},
      { name: "Description", id: "description", type: "textarea"}
    ];
    const modal = await DayPilot.Modal.form(form, e.data);
    if (modal.canceled) {
      return;
    }
    const updated = modal.result;
    this.scheduler.control.events.update(updated);
  }

  ngAfterViewInit(): void {
    this.ds.getResources().subscribe(result => this.config.resources = result);

    const from = this.scheduler.control.visibleStart();
    const to = this.scheduler.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
  }

}
