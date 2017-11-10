import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit{

  days= ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  calendar = [
    [
      {
        year: 2017,
        month: 'October',
        day: 'Mon',
        dayInMonth: 30
      },
      {
        year: 2017,
        month: 'October',
        day: 'Tue',
        dayInMonth: 31
      },
      {
        year: 2017,
        month: 'November',
        day: 'Wed',
        dayInMonth: 1
      },
      {
        year: 2017,
        month: 'November',
        day: 'Thu',
        dayInMonth: 2
      },
      {
        year: 2017,
        month: 'November',
        day: 'Fri',
        dayInMonth: 3
      },
      {
        year: 2017,
        month: 'November',
        day: 'Sat',
        dayInMonth: 4
      },
      {
        year: 2017,
        month: 'November',
        day: 'Sun',
        dayInMonth: 5
      }
    ],
    [
      {
        year: 2017,
        month: 'October',
        day: 'Mon',
        dayInMonth: 6
      },
      {
        year: 2017,
        month: 'October',
        day: 'Tue',
        dayInMonth: 7
      },
      {
        year: 2017,
        month: 'November',
        day: 'Wed',
        dayInMonth: 8
      },
      {
        year: 2017,
        month: 'November',
        day: 'Thu',
        dayInMonth: 9
      },
      {
        year: 2017,
        month: 'November',
        day: 'Fri',
        dayInMonth: 10
      },
      {
        year: 2017,
        month: 'November',
        day: 'Sat',
        dayInMonth: 11
      },
      {
        year: 2017,
        month: 'November',
        day: 'Sun',
        dayInMonth: 12
      }
    ],
    [
      {
        year: 2017,
        month: 'October',
        day: 'Mon',
        dayInMonth: 13
      },
      {
        year: 2017,
        month: 'October',
        day: 'Tue',
        dayInMonth: 14
      },
      {
        year: 2017,
        month: 'November',
        day: 'Wed',
        dayInMonth: 15
      },
      {
        year: 2017,
        month: 'November',
        day: 'Thu',
        dayInMonth: 16
      },
      {
        year: 2017,
        month: 'November',
        day: 'Fri',
        dayInMonth: 17
      },
      {
        year: 2017,
        month: 'November',
        day: 'Sat',
        dayInMonth: 18
      },
      {
        year: 2017,
        month: 'November',
        day: 'Sun',
        dayInMonth: 19
      }
    ],
    [
      {
        year: 2017,
        month: 'October',
        day: 'Mon',
        dayInMonth: 20
      },
      {
        year: 2017,
        month: 'October',
        day: 'Tue',
        dayInMonth: 21
      },
      {
        year: 2017,
        month: 'November',
        day: 'Wed',
        dayInMonth: 22
      },
      {
        year: 2017,
        month: 'November',
        day: 'Thu',
        dayInMonth: 23
      },
      {
        year: 2017,
        month: 'November',
        day: 'Fri',
        dayInMonth: 24
      },
      {
        year: 2017,
        month: 'November',
        day: 'Sat',
        dayInMonth: 25
      },
      {
        year: 2017,
        month: 'November',
        day: 'Sun',
        dayInMonth: 26
      }
    ],
    [
      {
        year: 2017,
        month: 'October',
        day: 'Mon',
        dayInMonth: 27
      },
      {
        year: 2017,
        month: 'October',
        day: 'Tue',
        dayInMonth: 28
      },
      {
        year: 2017,
        month: 'November',
        day: 'Wed',
        dayInMonth: 29
      },
      {
        year: 2017,
        month: 'November',
        day: 'Thu',
        dayInMonth: 30
      },
      {
        year: 2017,
        month: 'December',
        day: 'Fri',
        dayInMonth: 1
      },
      {
        year: 2017,
        month: 'December',
        day: 'Sat',
        dayInMonth: 2
      },
      {
        year: 2017,
        month: 'December',
        day: 'Sun',
        dayInMonth: 3
      }
    ],
    [
      {
        year: 2017,
        month: 'December',
        day: 'Mon',
        dayInMonth: 4
      },
      {
        year: 2017,
        month: 'December',
        day: 'Tue',
        dayInMonth: 5
      },
      {
        year: 2017,
        month: 'December',
        day: 'Wed',
        dayInMonth: 6
      },
      {
        year: 2017,
        month: 'December',
        day: 'Thu',
        dayInMonth: 7
      },
      {
        year: 2017,
        month: 'December',
        day: 'Fri',
        dayInMonth: 8
      },
      {
        year: 2017,
        month: 'December',
        day: 'Sat',
        dayInMonth: 9
      },
      {
        year: 2017,
        month: 'December',
        day: 'Sun',
        dayInMonth: 10
      }
    ],
  ];






  ngOnInit(){
    console.log('CALENDAR');
  }

  constructor() {}

}
