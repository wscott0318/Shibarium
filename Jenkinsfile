node {
  stage('SonarQube analysis') {
    def scannerHome = tool 'SonarScanner';
    withSonarQubeEnv('SonarScanner') { // If you have configured more than one global server connection, you can specify its name
      sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=AYU9SXcsStXaHq2lF3fX"
    }
  }
}
