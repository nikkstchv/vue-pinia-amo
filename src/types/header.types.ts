import type { RouteRecordName } from "vue-router";

export class HeaderState {
  currentRouteName: RouteRecordName | string;
  currentRouteId: number;
}