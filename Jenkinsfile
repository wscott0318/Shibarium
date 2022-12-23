pipeline{
  agent any
  tool {
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
