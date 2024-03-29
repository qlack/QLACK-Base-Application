pipeline {
   agent {
        kubernetes {
            yaml '''
                    apiVersion: v1
                    kind: Pod
                    metadata:
                      name: qlack
                      namespace: jenkins
                    spec:
                      affinity:
                        podAntiAffinity:
                          preferredDuringSchedulingIgnoredDuringExecution:
                          - weight: 50
                            podAffinityTerm:
                              labelSelector:
                                matchExpressions:
                                - key: jenkins/jenkins-jenkins-agent
                                  operator: In
                                  values:
                                  - "true"
                              topologyKey: kubernetes.io/hostname
                      securityContext:
                        runAsUser: 0
                        runAsGroup: 0
                      containers:
                      - name: qlack-builder
                        image: eddevopsd2/maven-java-npm-docker:mvn3.8.5-jdk17-node18.16-go1.20-docker
                        volumeMounts:
                        - name: maven
                          mountPath: /root/.m2/
                          subPath: Qlack-Java
                        - name: sonar-scanner
                          mountPath: /root/sonar-scanner
                        tty: true
                        securityContext:
                          privileged: true
                          runAsUser: 0
                          runAsGroup: 0
                      imagePullSecrets:
                      - name: regcred
                      restartPolicy: OnFailure
                      volumes:
                      - name: maven
                        persistentVolumeClaim:
                          claimName: maven-nfs-pvc
                      - name: sonar-scanner
                        persistentVolumeClaim:
                          claimName: sonar-scanner-nfs-pvc
            ''' 
            workspaceVolume persistentVolumeClaimWorkspaceVolume(claimName: 'workspace-nfs-pvc', readOnly: false)
        }
    }
    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 3, unit: 'HOURS')
    }
   stages {
        stage('Build') {
            steps {
                container (name: 'qlack-builder') {
                    sh '''
                        mvn -f qlack-base-application-server/pom.xml clean install
                        cd qlack-base-application-ui
                        npm install
                        npx ng build --configuration production --output-path=dist
                    '''
                }
            }
        }
        stage('Sonar Analysis') {
            steps {
                container (name: 'qlack-builder') {
                    withSonarQubeEnv('sonar'){
                        sh '/root/sonar-scanner/sonar-scanner/bin/sonar-scanner -Dsonar.projectName=QLACK-Base-Application -Dsonar.host.url=${SONAR_HOST_URL} -Dsonar.login=${SONAR_GLOBAL_KEY} -Dsonar.working.directory="/tmp"'
                    }
                }
            }
        }
        stage('Produce bom.xml for service-user') {
            steps{
                container (name: 'qlack-builder') {
                    sh 'mvn -f qlack-base-application-server/pom.xml org.cyclonedx:cyclonedx-maven-plugin:makeAggregateBom'
                }
            }
        }
        stage('Produce bom.xml for frontend') {
            steps{
                container (name: 'qlack-builder') {
                    sh '''
                        cd qlack-base-application-ui
                        npm install --global @cyclonedx/cyclonedx-npm
                        cyclonedx-npm --ignore-npm-errors --output-format xml --output-file bom.xml
                    '''
                }
            }
        }
        stage('Dependency-Track Analysis for backend') {
            steps{
                container (name: 'qlack-builder') {
                    sh '''
                        echo '{"project": "cd02194b-2d24-46fc-867c-bea9b0b9020e", "bom": "'"$(cat qlack-base-application-server/target/bom.xml | base64 -w 0)"'"}' > payload.json
                    '''

                    sh '''
                        curl -X "PUT" ${DEPENDENCY_TRACK_URL} -H 'Content-Type: application/json' -H 'X-API-Key: '${DEPENDENCY_TRACK_API_KEY} -d @payload.json
                    '''
                }
            }
        }
        stage('Dependency-Track Analysis for frontend') {
            steps{
                container (name: 'qlack-builder') {
                    sh '''
                        echo '{"project": "d6f86bbe-0c74-4480-a27c-cd0e5a770d8a", "bom": "'"$(cat qlack-base-application-ui/bom.xml | base64 -w 0)"'"}' > payload.json
                    '''

                    sh '''
                        curl -X "PUT" ${DEPENDENCY_TRACK_URL} -H 'Content-Type: application/json' -H 'X-API-Key: '${DEPENDENCY_TRACK_API_KEY} -d @payload.json
                    '''
                }
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
