FROM postgres:15-alpine

RUN ["mkdir", "/var/log/postgresql"] 
RUN ["chown", "postgres:postgres", "/var/log/postgresql"]

CMD ["postgres", "-c", "logging_collector=on", "-c", "log_directory=/var/log/postgresql"]
