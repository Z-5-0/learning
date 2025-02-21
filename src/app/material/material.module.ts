import { CommonModule } from "@angular/common";
import { MaterialComponent } from "./material.component";
import { NgModule } from "@angular/core";
import { MaterialRoutingModule } from "./material-routing.module";
import { MInputComponent } from './m-input/m-input.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from "@angular/material/core";
import { MAutocompleteComponent } from './m-autocomplete/m-autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MMenuToolbarComponent } from './m-menu-toolbar/m-menu-toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MBadgeComponent } from './m-badge/m-badge.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MSidenavComponent } from './m-sidenav/m-sidenav.component';
import { MCardComponent } from './m-card/m-card.component';
import { MatCardModule } from '@angular/material/card';
import { MSliderComponent } from './m-slider/m-slider.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MTableComponent } from './m-table/m-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatRippleModule } from '@angular/material/core';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { MFormControlComponent } from './m-form-control/m-form-control.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MDialogComponent } from './m-dialog/m-dialog.component';
import { MPopupComponent } from './m-dialog/m-popup/m-popup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
    declarations: [
        MaterialComponent,
        MInputComponent,
        MAutocompleteComponent,
        MMenuToolbarComponent,
        MBadgeComponent,
        MSidenavComponent,
        MCardComponent,
        MSliderComponent,
        MTableComponent,
        MFormControlComponent,
        MDialogComponent,
        MPopupComponent
    ],
    imports: [
        CommonModule,
        MaterialRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatMenuModule,
        MatBadgeModule,
        MatSidenavModule,
        MatCardModule,
        MatSliderModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatRippleModule,
        CdkDrag,
        CdkDropList,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    providers: [
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
    ],
    exports: [MInputComponent]
})

export class MaterialModule { }