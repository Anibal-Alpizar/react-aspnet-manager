const ReportsButton = ({
  handleDownloadReport,
  reportType,
}: {
  handleDownloadReport: (reportType: string) => void;
  reportType: string;
}) => {
  let buttonText = "";
  switch (reportType) {
    case "usuarios":
      buttonText = "Reporte de usuarios";
      break;
    case "eventos":
      buttonText = "Reporte de eventos";
      break;
    case "calendario_eventos":
      buttonText = "Reporte de calendario de eventos";
      break;
    default:
      buttonText = "Generar reporte";
  }

  return (
    <button
      className="bg-primary gap-4 m-2 hover:bg-secondary text-ascent-2 font-bold py-2 px-4 rounded inline-flex items-center"
      onClick={() => handleDownloadReport(reportType)}
    >
      <svg
        className="fill-current w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
      </svg>
      <span>{buttonText}</span>
    </button>
  );
};

export default ReportsButton;
