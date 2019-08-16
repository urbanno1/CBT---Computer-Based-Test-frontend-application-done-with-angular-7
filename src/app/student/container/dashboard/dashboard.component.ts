import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TimerObjectService, Time } from 'src/app/shared/service/timer-object.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../provider/student.service';
import { takeUntil } from 'rxjs/operators';
import { AppFilter } from '../../models/filters';
import { ModalSize, SuiModalService } from 'ng2-semantic-ui';
import { LoginModal } from 'src/app/shared/login-modal';
import { Question, Topic, QuestionSet, pagination, paginate, answers, answered } from '../../models/question';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  error: string;
  modalTitle: string;
  modalColor: string;
  modalMessage: string;

  currentDate = new Date();
  time1$: Observable<Time>;

  questionParams: AppFilter;
  examQuestionArray: any[] = [];
  examTopicArray: any[] = [];
  //examQuestionsStorage: any[];
  examQuestions: any[] = [];
  pages: any[] = [];
  pageArrays: any[] = [];
  selectedAnswers: answers[] = [];

  timeObject: any;
  examTopics: any;
  instruction: any;
  instructionModel: any;
  selectedValue: any;
  public selected = new FormControl();

  questionSuccess: boolean;
  questionModel: Question;
  isCurrent: boolean;

  TopicModels: Topic;
  questionDisplayed: QuestionSet;
  questionLenght: any;
  currentPage: pagination;
  selectedQuestion: answers;

  questionSelected: any;
  valueAnswer: any;

  //page:paginate;
  page: paginate;
  pageObject: pagination;

  //Used for Pagination.
  count = 0;
  countPage = 0;
  countTime = 0;
  countSubmit = 0;
  countFlagged = 0;
  percentageAnswered = 0;


  searchFilter = {
    groupOp: "AND",
    rules: [
      {
        field: "examTopicId",
        op: "eq",
        data: ""
      },
    ]
  }

  constructor(
    private timerService: TimerObjectService,
    private route: Router,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private modalService: SuiModalService) {
    this.questionParams = new AppFilter({ sidx: "state_Name", rows: 1 })
    this.getExamQuestionModels("MainQuestion");
  }

  questionFilter: any = {
    examTopicId: 0,
  };

  ngOnInit() {
    this.getRoute();
  }

  getRoute() {
    this.questionSuccess = true;
    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.questionFilter.examTopicId = params['id'];
        if (this.questionFilter.examTopicId > 0) {
          this.getQuestions(1);
          this.questionSuccess = false;
        }
      });
  }

  getExamQuestionModels(timeLookUp: any) {
    this.error = null;
    this.questionSuccess = true;
    this.studentService.getExamQuestionModels({ timeLookUp: timeLookUp }).pipe(
      takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        this.timeObject = res.timeViewModel;
        this.ExamQuestionSorting(res.examTopicViewModels);

        let currentday = 0;
        let currenthour = 0;
        let currentMinute = 0
        let currentSecond = 0;

        currentday = this.timeObject.instructionDays;
        currenthour = this.timeObject.instructionHours;
        currentMinute = this.timeObject.instructionMins;
        currentSecond = this.timeObject.instructionSeconds > 2 ? (this.timeObject.instructionSeconds + 2) : 2;

        this.currentDate.setDate(this.currentDate.getDate() + currentday);
        this.currentDate.setHours(this.currentDate.getHours() + currenthour);
        this.currentDate.setMinutes(this.currentDate.getMinutes() + currentMinute);
        this.currentDate.setSeconds(this.currentDate.getSeconds() + currentSecond);

        this.time1$ = this.time1$ == null ? this.timerService.timer(this.currentDate) : new Observable<Time>();
        this.time1$.pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
          if (result == null) {
            this.logout()
          }
          if (result != null && result.days == 0 && result.hours == 0 && result.minutes == 3 && result.seconds == 0) {
            this.modalTitle = "Time remaining!"
            this.modalMessage = "You have less than 0" + result.minutes + " minutes remaining!";
            this.modalColor = "red";
            this.timeMessage();
          }
        })
        this.questionSuccess = false;
      },
        error => {
          this.questionSuccess = false;
          this.error = error;
        })
  }

  ExamQuestionSorting(questionArray: any[]) {
    this.count = 0;
    if (questionArray != null && questionArray != undefined && questionArray.length > 0)
      questionArray.forEach(result => {
        if (this.count < 1) {
          this.questionFilter.examTopicId = result.topicViewModel.examTopicId;
        }
        this.count++;

        this.TopicModels = {
          examTopic: result.topicViewModel,
          examQuestionLength: result.examQuestionsViewModels.length
        }

        this.examTopicArray.push(this.TopicModels);

        this.questionModel = {
          examTopicId: result.topicViewModel.examTopicId,
          examTopicName: result.topicViewModel.examTopicName,
          examQuestionLength: result.examQuestionsViewModels.length,
          examQuestion: result.examQuestionsViewModels
        };
        this.examQuestionArray.push(this.questionModel);
      })

    localStorage.setItem("examTopics", JSON.stringify(this.examTopicArray));
    localStorage.setItem("examQuestions", JSON.stringify(this.examQuestionArray));
    this.getQuestions(1);
  }

  timeMessage() {
    this.modalService
      .open(new LoginModal(this.modalTitle, this.modalMessage, this.modalColor, ModalSize.Tiny))
      .onApprove(() => { })
      .onDeny(() => { });
  }
  submitMessage() {
    this.modalService
      .open(new LoginModal(this.modalTitle, this.modalMessage, this.modalColor, ModalSize.Tiny))
      .onApprove(() => {
        this.submit();
      })
      .onDeny(() => { });
  }

  //Get the questions to the view.
  getQuestions(page) {
    this.questionParams.page = page;
    this.examQuestions = [];
    let examQuestionsStorage = JSON.parse(localStorage.getItem("examQuestions"));
    if (examQuestionsStorage != null && examQuestionsStorage != undefined
      && examQuestionsStorage.length > 0) {

      let questionStorage: any[] = examQuestionsStorage.
        filter(result => result.examTopicId == this.questionFilter.examTopicId);

      if (questionStorage != null && questionStorage != undefined && questionStorage.length > 0) {
        let questionExam: any[] = questionStorage[0].examQuestion;
        let skip = ((this.questionParams.page - 1) * this.questionParams.rows);
        let questionView = questionExam[skip];

        this.examQuestions.push(questionView);
        this.questionDisplayed = {
          examTopicId: questionStorage[0].examTopicId,
          examTopicName: questionStorage[0].examTopicName,
          examQuestionLength: questionStorage[0].examQuestionLength,
          page: this.questionParams.page
        };

        this.questionLenght = 0;
        let length = this.questionDisplayed.examQuestionLength;
        let topicId = this.questionDisplayed.examTopicId;
        this.questionLenght = length;
        let pageIndex = this.questionParams.page;
        this.getPageSize(length, topicId, pageIndex)
      }
    }
  }

  getPageSize(length, topicId, page?, flagged?) {
    if (length > 0 && topicId > 0 && this.pageArrays != null && this.pageArrays.length > 0) {
      let topicIdExit = true;
      this.pageArrays.forEach(result => {
        if (result.examTopicId == topicId) {
          if (topicIdExit) {
            topicIdExit = false;
            let keepGoing = true;
            if (length > 0 && topicId > 0 && page > 0 && flagged) {
              let pagess: any[] = result.page;
              pagess.forEach(res => {
                if (keepGoing) {
                  if (res.page == page) {
                    res.flagged = res.flagged ? false : true;
                    if (res.flagged) {
                      this.countFlagged++
                      localStorage.removeItem("countFlagged");
                      localStorage.setItem("countFlagged", JSON.stringify(this.countFlagged));
                    }
                    else {
                      this.countFlagged--
                      localStorage.removeItem("countFlagged");
                      localStorage.setItem("countFlagged", JSON.stringify(this.countFlagged));
                    }
                    this.currentPage = { page: page, flagged: true };
                    this.pages = pagess;
                    keepGoing = false;
                  }
                }
              })
            }
            else {
              if (keepGoing) {
                this.currentPage = { page: page, flagged: true }
                this.pages = result.page;
                keepGoing = false;
              }
            }
          }
        }
      })
      if (topicIdExit) {
        let pagesArray = [];
        for (let i = 1; i <= length; i++) {
          this.pageObject = { page: i, flagged: false }
          pagesArray.push(this.pageObject);
        }
        this.page = { examTopicId: topicId, page: pagesArray }
        this.pageArrays.push(this.page);
        this.pageSerialize(this.pageArrays, topicId, page)
      }
    }
    else {
      let pagesArray = [];
      for (let i = 1; i <= length; i++) {
        this.pageObject = { page: i, flagged: false }
        pagesArray.push(this.pageObject);
      }
      this.page = { examTopicId: topicId, page: pagesArray }
      this.pageArrays.push(this.page);
      this.pageSerialize(this.pageArrays, topicId, page)
    }
  }

  pageSerialize(pageArrays: any[], topicId, page) {
    pageArrays.forEach(result => {
      if (result.examTopicId == topicId) {
        this.currentPage = { page: page, flagged: true };
        this.pages = result.page;
      }
    })
  }

  nextPage(page, examTopicId) {
    this.questionFilter.examTopicId = examTopicId;
    let newPage = page + 1;
    this.getQuestions(newPage)
  }

  previousPage(page, examTopicId) {
    this.questionFilter.examTopicId = examTopicId;
    let newPage = page - 1;
    this.getQuestions(newPage)

  }

  goToPage(page, examTopicId) {
    this.questionFilter.examTopicId = examTopicId;
    let newPage = page.page;
    this.getQuestions(newPage)
  }

  flagQuestion(length, topicId, page) {
    if (page != "") {
      this.getPageSize(length, topicId, page, true)
    }
  }

  SelectedOption(value, questionId, topicId) {

    this.calculatePercentageAnswered();
    this.setTheAnswerSelected(topicId, questionId, value.value)
  }

  setTheAnswerSelected(topicId, questionId, value) {
    let examQuestionsStorage = JSON.parse(localStorage.getItem("examQuestions"));
    if (examQuestionsStorage != null && examQuestionsStorage != undefined
      && examQuestionsStorage.length > 0) {

      let questionStorage: any[] = examQuestionsStorage.
        filter(result => result.examTopicId == topicId);

      if (questionStorage != null && questionStorage != undefined && questionStorage.length > 0) {
        let questionExam: any[] = questionStorage[0].examQuestion;
        let keepAnswer = true;
        if (keepAnswer) {
          questionExam.forEach(result => {
            if (result.examQuestionId == questionId) {
              if (result.answer == null) {
                this.countSubmit++;
                localStorage.removeItem("countSubmit");
                localStorage.setItem("countSubmit", JSON.stringify(this.countSubmit));
              }
              result.answer = value;
              keepAnswer = false
            }
          });
        }
        if (!keepAnswer) {
          localStorage.removeItem("examQuestions");
          localStorage.setItem("examQuestions", JSON.stringify(examQuestionsStorage));
        }
      }
    }
  }

  calculatePercentageAnswered(): number {
    let questionCount = 0;
    let numberSelected = this.countSubmit;
    let examTopics = JSON.parse(localStorage.getItem("examTopics"));
    if (examTopics != null && examTopics != undefined
      && examTopics.length > 0) {
      for (let i = 0; i < examTopics.length; i++) {
        questionCount += examTopics[i].examQuestionLength;
      }
      this.percentageAnswered = Math.floor((numberSelected / questionCount) * 100);
      return this.percentageAnswered;
    }
    return this.percentageAnswered = 0;
  }


  submitAnswers() {
    let answeredPercentage = this.calculatePercentageAnswered()
    if (answeredPercentage >= 70 && answeredPercentage < 100) {
      this.modalTitle = "Submit Questions?"
      this.modalMessage = "You still have some questions not answered!";
      this.modalColor = "red";
      this.submitMessage();
    }
    else {
      this.modalTitle = "Submit Questions?"
      this.modalMessage = "Your questions will be submitted on confirmation";
      this.modalColor = "";
      this.submitMessage();
    }
  }

  submit() {
    this.questionSuccess = true;
    let examQuestions = JSON.parse(localStorage.getItem("examQuestions"));
    
    if (examQuestions != null && examQuestions != undefined
      && examQuestions.length > 0) {
      this.studentService.submitExamQuestions({ body: examQuestions }).pipe(
        takeUntil(this.unsubscribe$))
        .subscribe((result) => {
          localStorage.removeItem("examResults");
          localStorage.setItem("examResults", JSON.stringify(result));
          
          this.logIntoResult()
          this.questionSuccess = false;
        },
          error => {
            this.error = error;
            this.questionSuccess = false;
          });
    }
    else
      this.questionSuccess = false;
  }

  logout() {
    this.submit();

    localStorage.removeItem("examTopics");
    localStorage.removeItem("examQuestions");
    localStorage.removeItem("countSubmit");
    localStorage.removeItem("countFlagged");

    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("roles");

    this.submit();
  }

  logIntoResult() {
    localStorage.removeItem("examTopics");
    localStorage.removeItem("examQuestions");
    localStorage.removeItem("countSubmit");
    localStorage.removeItem("countFlagged");

    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("roles");

    this.route.navigate(['student/result']);
  }

  ngOnDestroy() {
    // unsubscribe all subsciptons
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
