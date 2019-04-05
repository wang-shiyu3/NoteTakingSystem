#!/bin/bash

openssl rand -hex $(( 5000*4 )) | \
while IFS= read -rn8 -d '' r; do
    echo "$r,123456" >> accounts.csv
done