# Use Node.js 20 Alpine image
FROM alpine

# Copy the rest of the application code
COPY connect-api.sh /connect-api.sh

RUN chmod +x /connect-api.sh

CMD sh -c "/connect-api.sh -u $API_URL -n $RASP_NAME"