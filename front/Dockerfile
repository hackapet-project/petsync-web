FROM node:18.16-buster-slim AS base
ENV USERNAME=node
ENV WORKPATH=/opt/workdir
ARG USER_ID=1000
ARG GROUP_ID=1000

RUN usermod -u ${USER_ID} ${USERNAME} && \
    usermod -g ${GROUP_ID} ${USERNAME} && \
    mkdir -p ${WORKPATH}/node_modules && \
    chown -R ${USERNAME}:${USERNAME} ${WORKPATH}

WORKDIR ${WORKPATH}
USER ${USERNAME}
COPY --chown=${USERNAME}:${USERNAME} package*.json ./
RUN npm install
COPY --chown=${USERNAME}:${USERNAME} . .
RUN npm run build

FROM nginx:alpine
COPY --from=base /opt/workdir/dist /usr/share/nginx/html
EXPOSE 80
