#!/bin/sh
NAME=""
API-URL=""
interval=1500

usage() {
  echo "Usage: $0 [-u API_URL] [-n NAME]"
  echo "  -u  URL de l'API (par défaut : $API_URL)"
  echo "  -n  Nom du client"
  exit 1
}

while getopts "u:n:h" opt; do
  case $opt in
    u) API_URL="$OPTARG" ;;
    n) NAME="$OPTARG" ;;
    h) usage ;;
    *) usage ;;
  esac
done

while true; do
  echo "Appel à l'API à $(date)"
  RESPONSE=$(curl -s -X POST $API_URL+$NAME+"/1883")

  if [ $? -eq 0 ]; then
    echo "Réponse de l'API : $RESPONSE"
  else
    echo "Erreur lors de l'appel à l'API"
  fi

  echo "Attente de $INTERVAL secondes avant le prochain appel"
  sleep $INTERVAL
done