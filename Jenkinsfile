pipeline{
  agent any
  
  stages  {
    stage('SonarQube Analysis') {
      def scannerHome = tool 'SonarScanner';
      withSonarQubeEnv() {
        sh "${scannerHome}/bin/sonar-scanner -X"
      }
    }
  }
}
