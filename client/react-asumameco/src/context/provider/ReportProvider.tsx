import { ReportsContext } from "../ReportsContext";
import {
  usersReportRequest,
  eventsReportRequest,
  eventsCalendarReportRequest,
} from "../../api/reports.api";

export const ReportProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReportsContext.Provider
      value={{
        usersReportRequest,
        eventsReportRequest,
        eventsCalendarReportRequest,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};
