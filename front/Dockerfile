FROM node:18.16-buster-slim AS base

ENV WORKPATH=/opt/workdir/
ENV USERNAME=node
ARG USER_ID=1000
ARG GROUP_ID=1000

# Setup user and directories first
RUN usermod -u ${USER_ID} ${USERNAME} && \
    usermod -g ${GROUP_ID} ${USERNAME} && \
    mkdir -p ${WORKPATH}/node_modules && \
    chown -R ${USERNAME}:${USERNAME} ${WORKPATH}

WORKDIR ${WORKPATH}

# Switch to non-root user before any npm operations
USER ${USERNAME}

# Copy package files with correct ownership
COPY --chown=${USERNAME}:${USERNAME} package*.json ./

# Install dependencies as non-root user
RUN npm install

# Copy remaining files with correct ownership
COPY --chown=${USERNAME}:${USERNAME} . .

# Set host binding
ENV HOST=0.0.0.0
CMD ["npm", "run", "dev"]
