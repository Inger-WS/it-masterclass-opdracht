module.exports =
{
    default: 
    {
      require: 
      [
        'features/step_definitions/*.js' // Pad naar de stapdefinitiebestanden
      ],

      format: 
      [
        'progress', // Geeft een eenvoudige voortgangsuitvoer weer
        'json:reports/cucumber_report.json' // Genereert een JSON-rapport
      ],

      paths: 
      [
        'features/*.feature' // Pad naar de .feature-bestanden
      ],
      
      publishQuiet: true // Vermindert de hoeveelheid console-uitvoer van Cucumber
    }
  };
  