#FROM alpine:edge
FROM mhart/alpine-node:7.8.0

MAINTAINER Aron Vaughan <aronvaughan@outlook.com>

#setup base items needed to run
#RUN set -x \
#      && apk --update add \
#          bash \
#      		build-base \
#			    curl \
#			    git


# install nvm
#COPY bin/nvm-install.sh ~/nvm-install.sh
#RUN ls -al ~
#RUN source ~/nvm-install.sh
#RUN source ~/.bash_profile

#RUN nvm install v7.7.2
#RUN nvm use v7.7.2
# production deploy config, copies code to docker image

# install loopback
# RUN npm install -g loopback-cli

# Add additional generators here

# Add non-root user for dev work
#RUN adduser -u 501 dev -D -s /bin/ash
	# && \
	# chmod -R dev:dev /app

#USER dev

# ports: node
EXPOSE 3000

# setup the environment for this execution
ENV NODE_ENV development
#ARG DB_HOST
#ENV DB_HOST $DB_HOST
#ENV DB_HOST 127.0.0.1
#ENV DB_HOST mongo

# allow for mounting of the application on the command line
VOLUME ["/app"]
# copy the application to the remote docker image - if not mounted will pass through and use this version
ADD . /app

WORKDIR /app

# install necessary packages for the app
RUN npm install --production .

# run the application
CMD npm start
