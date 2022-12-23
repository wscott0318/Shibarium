pipeline{
  agent any
  tools {
  scannerHome 'SonarScanner'
  }
  stages  {
    stage('SonarQube Analysis') {
      //def scannerHome = tool 'SonarScanner';
      steps{
        withSonarQubeEnv() {
          sh "${scannerHome}/bin/sonar-scanner -X"
        }
      }
    }
  }
}
