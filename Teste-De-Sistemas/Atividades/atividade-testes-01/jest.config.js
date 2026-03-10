export default{
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "Relatório de Testes",
        outputPath: "./reports/test-report.html",
        includeFailureMsg: true,
        openReport: true,
      }
    ]
  ]
};