import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { SharedService } from 'src/app/shared/service/shared-service.service';
import { TimerObjectService } from 'src/app/shared/service/timer-object.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  @Input() userProfile: any;
  @Input() pending: any;

  questionSuccess: boolean;
  assessment: any[];
  instructions: any;
  public baseUrl;

  successResult: boolean;

  examTopicArray: any[];
  selectedItem: any;
  firstTopic: boolean;
  countSubmit = 0;
  countFlagged = 0;
  totalQuestion = 0;

  constructor(private sharedService: SharedService,
    private timerService: TimerObjectService) {
    this.baseUrl = this.sharedService.baseUrl;
  }

  ngOnInit() {
    this.getTopicArray()
  }

  getTopicArray() {
    let isgetTopic = true;
    let isNotTopic = true;

    interval(500).subscribe(x => {

      let countSub = JSON.parse(localStorage.getItem("countSubmit"));
      let countFlag = JSON.parse(localStorage.getItem("countFlagged"));
      this.countSubmit = countSub == null ? 0 : countSub;
      this.countFlagged = countFlag == null ? 0 : countFlag;

      if (isgetTopic) {

        if (this.examTopicArray == null || this.examTopicArray == undefined) {
          this.questionSuccess = true;
          this.examTopicArray = JSON.parse(localStorage.getItem("examTopics"))
          if (this.examTopicArray != undefined && this.examTopicArray != null) {
            isgetTopic = false;
            this.successResult = false;
            this.setActiveTopic(this.examTopicArray)
            this.questionSuccess = false
          }
        }
      }
      if (isNotTopic) {
        let examTopicArray = JSON.parse(localStorage.getItem("examTopics"))
        if (examTopicArray == null || examTopicArray == undefined) {
          console.log("examTopicArray", examTopicArray);
          this.questionSuccess = true;
          this.examTopicArray == null;
          this.successResult = true;
          this.ngOnInit();
          console.log("successResult", this.successResult);
          console.log("examTopicArray", examTopicArray);
          isNotTopic = false;
          this.questionSuccess = false;
        }
      }
    })
  }

  setActiveTopic(topicArr: any[]) {
    let count = 0;
    topicArr.forEach(topic => {
      if (count < 1) {
        this.totalQuestion += topic.examQuestionLength;
        this.firstTopic = true;
        this.clickedTopic(topic)
        count++;
      }
      else {
        this.totalQuestion += topic.examQuestionLength;
      }
    })
  }

  clickedTopic(topic) {
    if (topic != null) {
      this.selectedItem = null;
      this.selectedItem = topic
    }
    else {
      this.selectedItem = null
    }
  }

  ngOnDestroy() {
    // unsubscribe all subsciptons
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
