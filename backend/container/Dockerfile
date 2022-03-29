FROM python:3.9

RUN apt update \
  && apt install -y --no-install-recommends \
      libmecab-dev mecab-ipadic-utf8 libboost-all-dev libgdal-dev \
  && apt -y clean \
  && rm -rf /var/lib/apt/lists/*

# install python dependencies
COPY ./requirements.txt $HOME/
RUN pip install -r requirements.txt

# install pygeonlp dependencies
RUN python -m pygeonlp.api setup
RUN python -m jageocoder install-dictionary

# install lambda RIC
RUN pip install awslambdaric

# install lambda RIE
# reference:
# - https://aws.amazon.com/jp/builders-flash/202104/new-lambda-container-development-2/?awsf.filter-name=*all
# - https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/images-test.html
COPY ./entry_script.sh /entry_script.sh
COPY aws-lambda-rie-x86_64 /usr/local/bin/aws-lambda-rie
RUN ["chmod", "+x", "/entry_script.sh"]

# WORKDIR /tmp
# RUN mv /root/geonlp/db .
# WORKDIR /
RUN mv /root/geonlp/db .

COPY index.py ${LAMBDA_TASK_ROOT}

ENTRYPOINT [ "/entry_script.sh" ]
CMD ["index.handler"]
