import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { Observable } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { map } from 'rxjs/operators';


const enum CourseCategory {
  BEGINNER = "BEGINNER",
  ADVANCED = "ADVANCED"
}

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService
  ) { }

  static filterCourses(courses$: Observable<Course[]>, courseCategory: CourseCategory): Observable<Course[]> {
    return courses$
      .pipe(
        map(courses => courses.filter(course => course.category === courseCategory))
      );
  }

  ngOnInit(): void {
    this.reloadCourses();
  }

  reloadCourses(): void {
    const courses$ = this.coursesService.loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo))
      );

    this.beginnerCourses$ = HomeComponent.filterCourses(courses$, CourseCategory.BEGINNER);
    this.advancedCourses$ = HomeComponent.filterCourses(courses$, CourseCategory.ADVANCED);
  }




}
