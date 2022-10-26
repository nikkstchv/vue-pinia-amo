export const GNZS_WIDGET_ID = 55;

export const PAYMENTS_WIDGET_ID = 51;
export const PAYMENTS_WIDGET_CODE = "";
export const PAYMENTS_IFRAME_SRC = "https://payments-iframe.gnzs.ru/calendar";
export const PAYMENTS_IFRAME_NAME = "dna-payments";

export const PERIOD_HOURS = [
  { value: "00", title: "00" },
  { value: "01", title: "01" },
  { value: "02", title: "02" },
  { value: "03", title: "03" },
  { value: "04", title: "04" },
  { value: "05", title: "05" },
  { value: "06", title: "06" },
  { value: "07", title: "07" },
  { value: "08", title: "08" },
  { value: "09", title: "09" },
  { value: "10", title: "10" },
  { value: "11", title: "11" },
  { value: "12", title: "12" },
  { value: "13", title: "13" },
  { value: "14", title: "14" },
  { value: "15", title: "15" },
  { value: "16", title: "16" },
  { value: "17", title: "17" },
  { value: "18", title: "18" },
  { value: "19", title: "19" },
  { value: "20", title: "20" },
  { value: "21", title: "21" },
  { value: "22", title: "22" },
  { value: "23", title: "23" },
  { value: "24", title: "24" },
];

export const PERIOD_MINUTES = [
  { value: "00", title: "00" },
  { value: "15", title: "15" },
  { value: "30", title: "30" },
  { value: "45", title: "45" },
];

export const MODALS_DIALOG = {
  template: {
    create: "templateCreate",
    remove: "templateRemove",
  },
  periods: {
    monthlyPeriods: "appendMonthlyPeriods",
    recursivePeriods: "appendRecursivePeriods",
    removeMonthlyPeriods: "removeMonthlyPeriods",
    removeRecursivePeriods: "removeRecursivePeriods",
  },
  user: {
    append: "appendUsers",
  },
};