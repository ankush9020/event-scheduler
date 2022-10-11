import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  btnShow: any;
  showCreateEventBtn = true;
  showHomeBtn = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.btnShow = res.showBtn;

    })
  }

  ngOnInit(): void {

  }

  public scheduleEvent() {
    this.showCreateEventBtn = false;
    this.showHomeBtn = true;
    this.router.navigate(['/schedule']);
  }

  public backToHome() {
    this.showCreateEventBtn = true;
    this.showHomeBtn = false;
    this.router.navigate(['/']);
  }

}
