FROM gitpod/workspace-full

# Install SDKMAN and Java 21.0.6-tem
RUN curl -s "https://get.sdkman.io" | bash && \
    echo 'source "$HOME/.sdkman/bin/sdkman-init.sh"' >> $HOME/.bashrc && \
    bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && yes | sdk install java 21.0.6-tem"
