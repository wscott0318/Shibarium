pipeline{
  agent any
  tools {
  SonarScanner
  }
  stages  {
    stage('SonarQube Analysis') {
      //def scannerHome = tool 'SonarScanner';
      steps {
              withSonarQubeEnv('SonarScanner') {
                sh 'sonar-scanner -X'
              }
            }
      //steps{  
        //withSonarQubeEnv() {
          //sh "${scannerHome}/bin/sonar-scanner -X"
        //}
      //}
    }
  }
}
