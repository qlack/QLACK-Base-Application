pipeline {
   agent {
        docker {
            image 'eddevopsd2/maven-java-npm-docker:mvn3.8.5-jdk17-node18.16-go1.20-docker'
            args '-v /root/.m2/QLACK-Java:/root/.m2 -v /root/sonar-scanner:/root/sonar-scanner'
        }
   }
   options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
   }
   stages {
        stage('Build') {
            steps {
                sh '''
                    mvn -f qlack-base-application-server/pom.xml clean install
                    cd qlack-base-application-ui
                    npm install
                    npx ng build --configuration production --output-path=dist
                '''
            }
        }
        stage('Sonar Analysis') {
            steps {
                withSonarQubeEnv('sonar'){
                    sh '/root/sonar-scanner/bin/sonar-scanner -Dsonar.projectName=QLACK-Base-Application -Dsonar.host.url=${SONAR_HOST_URL} -Dsonar.login=${SONAR_KEY_QLACK_BASE_APPLICATION}'
                }
            }
        }
        stage('Produce bom.xml'){
            parallel {
                stage('Produce bom.xml for service-user') {
                    steps{
                        sh 'mvn -f qlack-base-application-server/pom.xml org.cyclonedx:cyclonedx-maven-plugin:makeAggregateBom'
                    }
                }
                stage('Produce bom.xml for frontend') {
                    steps{
                        sh '''
                            cd qlack-base-application-ui
                            npm install --global @cyclonedx/cyclonedx-npm
                            cyclonedx-npm --ignore-npm-errors --output-format xml --output-file bom.xml
                        '''
                    }
                }
            }
        }
        stage('Dependency-Track Analysis for backend') {
            steps{
                sh '''
                    cat > payload.json <<__HERE__
                    {
                        "project": "737536ae-e12c-4144-b4b1-b5caa30f4099",
                        "bom": "$(cat cd qlack-base-application-server/bom.xml |base64 -w 0 -)"
                    }
                    __HERE__
                '''

                sh '''
                    curl -X "PUT" ${DEPENDENCY_TRACK_URL} -H 'Content-Type: application/json' -H 'X-API-Key: '${DEPENDENCY_TRACK_API_KEY} -d @payload.json
                '''
            }
        }
        stage('Dependency-Track Analysis for frontend') {
            steps{
                sh '''
                    cat > payload.json <<__HERE__
                    {
                        "project": "395b4dd1-552b-4647-b443-c3bac142b5c1",
                        "bom": "$(cat cd qlack-base-application-ui/bom.xml |base64 -w 0 -)"
                    }
                    __HERE__
                '''

                sh '''
                    curl -X "PUT" ${DEPENDENCY_TRACK_URL} -H 'Content-Type: application/json' -H 'X-API-Key: '${DEPENDENCY_TRACK_API_KEY} -d @payload.json
                '''
            }
        }
   }
}