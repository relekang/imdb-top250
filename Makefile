setup:
	virtualenv venv
	venv/bin/pip install -r requirements.txt

run:
	PYTHONPATH=$(shell pwd) venv/bin/python top250/server.py

test:
	PYTHONPATH=$(shell pwd) venv/bin/python top250/tests.py
