pipeline {
   agent {
        docker {
            image 'eddevopsd2/maven-java-npm-docker:mvn3.8.5-jdk17-node18.16-go1.20-docker'
            args '-v /root/.m2/Qlack-Java:/root/.m2 -v /root/sonar-scanner:/root/sonar-scanner'
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
    post {
        changed {
            emailext subject: '$DEFAULT_SUBJECT',
                body: '$DEFAULT_CONTENT',
                to: 'qlack@eurodyn.com'
            script {
                if (currentBuild.result == 'SUCCESS') {
                    rocketSend avatar: "http://d2-np.eurodyn.com/jenkins/jenkins.png", channel: 'qlack', message: ":white_check_mark: | ${BUILD_URL} \n\nBuild succeeded. *${env.BRANCH_NAME}* \nChangelog: ${getChangeString(10)}", rawMessage: true
                }
                if (currentBuild.result == 'FAILURE') {
                   rocketSend avatar: "http://d2-np.eurodyn.com/jenkins/jenkins.png", channel: 'qlack', message: ":x: | ${BUILD_URL} \n\nBuild failed. *${env.BRANCH_NAME}* \nChangelog: ${getChangeString(10)}", rawMessage: true
                }
            }
        }
    }
}

@NonCPS
def getChangeString(maxMessages) {
    MAX_MSG_LEN = 100
    def changeString = ""

    def changeLogSets = currentBuild.changeSets

    for (int i = 0; i < changeLogSets.size(); i++) {
        def entries = changeLogSets[i].items
        for (int j = 0; j < entries.length && i + j < maxMessages; j++) {
            def entry = entries[j]
            truncated_msg = entry.msg.take(MAX_MSG_LEN)
            changeString += "*${truncated_msg}* _by author ${entry.author}_\n"
        }
    }

    if (!changeString) {
        changeString = " There have not been any changes since the last build"
    }

    return changeString
}