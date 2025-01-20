import paho.mqtt.client as mqtt
from influxdb_client import InfluxDBClient, Point, WritePrecision
import json
import os

# Variables de connexion MQTT
MQTT_BROKER = "mqtt"
MQTT_TOPICS = ["sensors/temperature", "sensors/humidity", "sensors/luminosity"]
MQTT_PORT = 1883

# Variables de connexion InfluxDB
INFLUXDB_URL = "http://212.83.130.117:8086/"
INFLUXDB_TOKEN = "I-E0Cz0jnyTUu0UUnb_xJV4N21Dd4dMsgfZ-jf3iS-ejvPOM0tjI_FDe_SLEaFrXZ4SebWfVRHnfmXeNe5Dwew=="
INFLUXDB_ORG = "archi"
INFLUXDB_BUCKET = "archi-logi"

# Client InfluxDB
influx_client = InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN)
write_api = influx_client.write_api(write_options=WritePrecision.NS)

def on_message(client, userdata, msg):
    payload = msg.payload.decode('utf-8')
    print(f"Message reçu sur {msg.topic}: {payload}")

    try:

        data = json.loads(payload)

        mac_address = data.get("mac")
        value = data.get("value")
        timestamp = data.get("timestamp")

        if not mac_address or not value or not timestamp:
            print("Données manquantes dans le message.")
            return

        # Créer un point InfluxDB
        point = Point("sensor_data") \
            .tag("mac", mac_address) \
            .field("value", value) \
            .time(timestamp, WritePrecision.NS)

        # Écrit dans InfluxDB
        write_api.write(INFLUXDB_BUCKET, INFLUXDB_ORG, point)
        print(f"Donnée envoyée à InfluxDB: mac={mac_address}, value={value}, timestamp={timestamp}")

    except json.JSONDecodeError:
        print("Erreur de décodage JSON")
    except Exception as e:
        print(f"Erreur de traitement du message: {e}")

# Configuration du client MQTT
client = mqtt.Client()
client.on_message = on_message
client.connect(MQTT_BROKER, MQTT_PORT, 60)

# Abonnement aux topics MQTT
for topic in MQTT_TOPICS:
    client.subscribe(topic)

# Boucle pour recevoir des messages
client.loop_forever()
