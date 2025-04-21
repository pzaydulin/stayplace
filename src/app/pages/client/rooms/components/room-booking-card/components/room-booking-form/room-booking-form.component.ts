import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomExtended } from '@app/pages/client/rooms/data-access/room-manager.service';
import { IftaLabelModule } from 'primeng/iftalabel';
import { DatePickerModule } from 'primeng/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { BookingField } from '@app/models/booking.interface';
import { BookingService } from '@app/pages/client/booking/data-access/booking.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-room-booking-form',
  imports: [
    CommonModule,
    IftaLabelModule,
    DatePickerModule,
    SelectModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './room-booking-form.component.html',
  styleUrl: './room-booking-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomBookingFormComponent {
  readonly room = input.required<RoomExtended>();
  isMobileScreen = input<boolean>(false);

  private readonly bookingService: BookingService = inject(BookingService);

  form = this.getRoomBookingForm();
  BookingField = BookingField;

  minDate: Date = new Date();
  maxDate: Date = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );

  onSubmit(): void {
    if (this.form.valid) {
      this.bookingService.setBookingDetails(this.form.value);
      console.log('Выбранная дата:', this.form.value);
    } else {
      console.log('Форма недействительна');
    }
  }

  getRoomBookingForm(): FormGroup {
    return new FormGroup({
      [BookingField.Period]: new FormGroup({
        [BookingField.PeriodStart]: new FormControl(null, [
          Validators.required,
        ]),
        [BookingField.PeriodEnd]: new FormControl(null, [Validators.required]),
      }),
      [BookingField.Guests]: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  get guests(): number[] {
    return Array.from(
      { length: this.room().guests ?? 1 },
      (value, key) => key + 1
    );
  }
}
