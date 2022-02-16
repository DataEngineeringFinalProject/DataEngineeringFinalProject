#!/bin/bash

set -e

exec python save_hf_model.py
exec python app.py 