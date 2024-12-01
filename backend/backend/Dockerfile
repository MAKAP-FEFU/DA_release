FROM python:3.11.5-slim

RUN mkdir backend
WORKDIR /backend
COPY . /backend//

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["python", "src/main.py"]