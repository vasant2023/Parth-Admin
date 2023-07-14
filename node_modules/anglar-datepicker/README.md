# Datepicker

## Installation

To install this library, run:

```bash
$ npm install anglar-datepicker --save
```

## Consuming your library

###### Add the below line in app.module.ts
```javascript

  import { AngularDatepickerModule } from 'anglar-datepicker';
```

###### And this import in app.module.ts

```javascript
imports: [
    BrowserModule,
    AngularDatepickerModule, <-- here
    CommonModule,
    FormsModule
  ],
```

## How to use it for Model based input
```html
<anglar-datepicker 
[position]="'top'" 
[dateFormat]="'DD-MM-YYYY'" 
(onDateSelction)="getDateObject($event)" 
 [(ngModel)]="myInput"></anglar-datepicker>
```

## How to use it for Reactive form based input
```html
<form [formGroup]="myfrmGroup">
 <anglar-datepicker 
  [position]="'top'" 
[dateFormat]="'DD-MM-YYYY'" 
(onDateSelction)="getDateObject($event)" 
formControlName="myInput" ></anglar-datepicker>

</form>
```

## Input and Output
* @Input - position (optional) - bottom | top | left | right - Default bottom
* @input - dateFormat (optional) - Any Moment Js based date format - Default DD-MMM-YYYY
* @output - onDateSelect - Outputs Moment Object

## LICENSE


###### It currently supports ngModel in the text input element and the support for reactiveform is pending still.


## License

MIT © [Sudhakar Pilavadi](mailto:sudhakarpilavadi82@gmail.com)

## Keywords
Angular Datepicker, Angular 6 Datepicker, Angular 7 Datepicker, Angular 5 Datepicker
