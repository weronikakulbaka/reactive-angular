import { Component, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { Observable, throwError } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';


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
    private coursesStore: CoursesStore
  ) { }

  ngOnInit(): void {
    this.reloadCourses();
  }

  reloadCourses(): void {
    this.beginnerCourses$ = this.coursesStore.filterByCategory(CourseCategory.BEGINNER)
    this.advancedCourses$ = this.coursesStore.filterByCategory(CourseCategory.ADVANCED)
  }

}
