FROM python:3.12.3-slim-bookworm AS base

ARG USER_ID=1000
ARG GROUP_ID=1000

ENV USERNAME servo
ENV WORKPATH /opt/workdir
RUN addgroup --gid ${GROUP_ID} $USERNAME
RUN adduser --uid ${USER_ID} --gid ${GROUP_ID} --disabled-password --gecos '' $USERNAME
WORKDIR $WORKPATH
RUN chown -R ${USER_ID}:${GROUP_ID} .

ENV PYTHONPATH "${PYTHONPATH}:${WORKPATH}"
ENV PATH "/home/${USERNAME}/.local/bin:${PATH}"
USER $USERNAME

COPY --chown=$USERNAME:$USERNAME requirements.txt $WORKPATH

RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

ENV PYTHONDONTWRITEBYTECODE 1

# Copy your application code
COPY . ${WORKPATH}