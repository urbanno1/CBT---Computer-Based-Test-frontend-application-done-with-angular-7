import { Component } from "@angular/core"
import { SuiModal, ComponentModalConfig, ModalSize } from "ng2-semantic-ui"

interface ILoginModalContext {
     title: string;
    question: string;
    color:string;
}

@Component({
    selector: 'modal-Login',
    template: `
<div class="header" [ngStyle]="{'text-align':'center'}" [style.color]="modal.context.color != '' ? 'red' : 'green'">{{ modal.context.title }}</div>
<div class="content" style="text-align:center">
    <p>{{ modal.context.question }}</p>
</div>
<div class="actions" *ngIf="modal.context.title != 'Submit Questions?'">
    <button class="ui green button" (click)="modal.approve(undefined)" autofocus>OK</button>
</div>
<div class="actions" *ngIf="modal.context.title == 'Submit Questions?'">
    <button class="ui red button" style="float:left" (click)="modal.deny(undefined)">Cancel</button>
    <button class="ui green button" (click)="modal.approve(undefined)" autofocus>Submit Anyways</button>
</div>
`
})

export class LoginModalComponent {
    constructor(public modal: SuiModal<ILoginModalContext, void, void>) { }

}

export class LoginModal extends ComponentModalConfig<ILoginModalContext, void, void> {
    constructor(title:string, question:string, color:string, size = ModalSize.Small) {
        super(LoginModalComponent, { title, question, color });

        this.isClosable = false;
        this.transitionDuration = 200;
        this.size = size;
    }
}
