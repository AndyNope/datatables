import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * @title Edit
 */
@Component({
    selector: 'app-edit-dialog-component',
    templateUrl: './edit.dialog.component.html',
})
export class EditDialogComponent {
    id: number;
    elements;
    element;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialogRef<EditDialogComponent>
    ) {
        this.id = this.data.id;
        this.getElements(this.id);
        this.element = this.elements.name;
    }

    /**
     * when the button is submitted, the change will be processed.
     */
    save(): void {
        this.overwriteLocalstorage();
        this.dialog.close('success');
    }

    overwriteLocalstorage(): void {
        const elements = JSON.parse(localStorage.elements);
        elements.forEach((element) => {
            if (element.position === this.id) {
                element.name = this.element;
            }
        });
        localStorage.elements = JSON.stringify(elements);
    }
    applyInput(input: string): void {
        this.element = input;
    }
    getElements(id: number): void {
        const elements = JSON.parse(localStorage.elements);
        elements.forEach((element) => {
            if (element.position === id) {
                console.log(element);
                this.elements = element;
            }
        });
    }

}
