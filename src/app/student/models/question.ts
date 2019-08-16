export interface Topic {
    examTopic: any;
    examQuestionLength: any;
  }
  export interface Question {
    examTopicId: number;
    examTopicName: string;
    examQuestionLength: any;
    examQuestion: any[];
  }
  
  export interface QuestionSet {
    examTopicId: number;
    examTopicName: string;
    examQuestionLength: any;
    page: number
  }

  export interface paginate {
    examTopicId: number;
    page: pagination[];
  }
  
  export interface pagination {
    page: number;
    flagged?: boolean;
  }

  export interface answers {
    examTopicId: number;
    question: answered[];
  }
  
  export interface answered {
    questionId: number;
    answer: boolean;
  }