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
      // {
      //   year: 2017,
      //   month: 'October',
      //   day: 'Mon',
      //   dayInMonth: 23
      // }
      'Mon 23. October 2017.',
      'Tue 24. October 2017.',
      'Wed 25. October 2017.',
      'Thu 26. October 2017.',
      'Fri 27. October 2017.',
      'Sat 28. October 2017.',
      'Sun 29. October 2017.',
    ],
    [
      'Mon 30. October 2017.',
      'Tue 31. October 2017.',
      'Wed 01. November 2017.',
      'Thu 02. November 2017.',
      'Fri 03. November 2017.',
      'Sat 04. November 2017.',
      'Sun 05. November 2017.',
    ],
    [
      'Mon 30. October 2017.',
      'Tue 31. October 2017.',
      'Wed 01. November 2017.',
      'Thu 02. November 2017.',
      'Fri 03. November 2017.',
      'Sat 04. November 2017.',
      'Sun 05. November 2017.',
    ]
  ];



    // 'Mon 30. October 2017.',
    // 'Tue 31. October 2017.',
    // 'Wed 01. November 2017.',
    // 'Thu 02. November 2017.',
    // 'Fri 03. November 2017.',
    // 'Sat 04. November 2017.',
    // 'Sun 05. November 2017.',
    //
    // 'Mon 06. November 2017.',
    // 'Tue 07. November 2017.',
    // 'Wed 08. November 2017.',
    // 'Thu 09. November 2017.',
    // 'Fri 10. November 2017.',
    // 'Sat 11. November 2017.',
    // 'Sun 12. November 2017.',
    //
    // 'Mon 13. November 2017.',
    // 'Tue 14. November 2017.',
    // 'Wed 15. November 2017.',
    // 'Thu 16. November 2017.',
    // 'Fri 17. November 2017.',
    // 'Sat 18. November 2017.',
    // 'Sun 19. November 2017.',
    //
    // 'Mon 20. November 2017.',
    // 'Tue 21. November 2017.',
    // 'Wed 22. November 2017.',
    // 'Thu 23. November 2017.',
    // 'Fri 24. November 2017.',
    // 'Sat 25. November 2017.',
    // 'Sun 26. November 2017.',
    //
    // 'Mon 27. November 2017.',
    // 'Tue 28. November 2017.',
    // 'Wed 29. November 2017.',
    // 'Thu 30. November 2017.',
    // 'Fri 01. December 2017.',
    // 'Sat 02. December 2017.',
    // 'Sun 03. December 2017.',
    //
    // 'Mon 13. November 2017.',
    // 'Tue 14. November 2017.',
    // 'Wed 15. November 2017.',
    // 'Thu 16. November 2017.',
    // 'Fri 10. November 2017.',
    // 'Sat 1a. November 2017.',
    // 'Sun 12. November 2017.',
    //
    // 'Mon 13. November 2017.',
    // 'Tue 14. November 2017.',
    // 'Wed 15. November 2017.',
    // 'Thu 16. November 2017.',

  // ];



  ngOnInit(){
    console.log('CALENDAR');
  }

  constructor() {}

}
