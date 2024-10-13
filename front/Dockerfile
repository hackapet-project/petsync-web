FROM node:18.16-buster-slim AS base

ENV WORKPATH=/opt/workdir/
ENV USERNAME=node
ARG USER_ID=1000
ARG GROUP_ID=1000
RUN usermod -u ${USER_ID} ${USERNAME}
RUN usermod -g ${GROUP_ID} ${USERNAME}

RUN mkdir -p ${WORKPATH}/node_modules && chown -R ${USERNAME}:${USERNAME} ${WORKPATH}
WORKDIR ${WORKPATH}

USER ${USERNAME}

CMD ["npm", "run", "dev"]

COPY --chown=${USERNAME}:${USERNAME} . $WORKPATH

FROM base AS ci
RUN npm clean-install
