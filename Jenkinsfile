pipeline{
  agent any
  tools {
  hudson.plugins.sonar.SonarRunnerInstallation 'SonarScanner'
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
