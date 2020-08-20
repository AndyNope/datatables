import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * @title Edit
 */
@Component({
    selector: 'app-add-dialog-component',
    templateUrl: './add.dialog.component.html',
})
export class AddDialogComponent {
    id: number;
    elements;
    name;
    weight;
    symbol;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialogRef<AddDialogComponent>
    ) {
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
        elements.push({
            position: elements.length + 1,
            name: this.name,
            weight: this.weight,
            symbol: this.symbol
        });
        localStorage.elements = JSON.stringify(elements);
    }
    applyName(input: string): void {
        this.name = input;
    }
    applyWeight(input: string): void {
        this.weight = input;
    }
    applySymbol(input: string): void {
        this.symbol = input;
    }

}
