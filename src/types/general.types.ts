export class CreateSheduleDto {
  name: string;
  type: string | number;
}

export class UpdatedScheduleNameDto {
  scheduleId: number;
  scheduleName: string;
}

export class SaveResourceTitleCallbacksDto {
  name: string;
  editClose: Function;
  setIsLoad: Function;
}

export class scheduleType {
  value: number; 
  title: string;
}

export class Schedule {
  extAccountId: number | null;
  id: string | null;
  name: string | null;
  type: number | null;
  users: number[];
}

export class User {
  id: number; 
  name: string; 
  group: string; 
  image: string; 
  email: string;
  isAdmin: boolean;
}

export class MonthDay {
  id: number;
  day: string;
  month: number;
  year: number;
}

export class firstAndLastDays {
  firstDay: string;
  lastDay: string;
}