import { Component } from '@angular/core';

interface Job {
  id: string,
  name: string,
  path: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  jobs: Job[] = []

  ngOnInit(): void {
    fetch('/jobs').then((response: Response) => {
        response.json().then((json) => {
          this.jobs = json['jobs']
        })
      }
    )
  }
}
