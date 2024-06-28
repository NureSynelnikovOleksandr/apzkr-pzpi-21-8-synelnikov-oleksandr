#include <WiFi.h>
#include <HTTPClient.h>
#include "DHTesp.h"

const int TERM_1 = 18;
const int TERM_2 = 19;

DHTesp sensor1;
DHTesp sensor2;

const char* ssid = "Wokwi-GUEST";
const char* password = "";

const String url = "https://xx5w707k-3000.euw.devtunnels.ms/api/data/reports";

const int worker_id = 1;
const int cow_id = 1;

#define LED_1 12
#define LED_2 13
#define STOP_BTN 5

void sendReport(
  int worker_id, 
  int cow_id, 
  float heartRate, 
  float bodyTemp, 
  float roomTemp,
  float milkVolume
) {
  Serial.print("Sending report...");

  HTTPClient http;
  http.begin(url);

  String json = "{";
  json += "\"worker_id\":";
  json += worker_id;
  json += ",\"cow_id\":";
  json += cow_id;
  json += ",\"type\":\"auto_milk\"";
  json += ",\"info\":{\"heartRate\":";
  json += heartRate;
  json += ",\"bodyTemp\":";
  json += bodyTemp;
  json += ",\"roomTemp\":";
  json += roomTemp;
  json += ",\"milkVolume\":";
  json += milkVolume;
  json += "}}";

  int httpResponseCode = http.POST(json);

  Serial.print("Report sent.");
}

void setup() {
  pinMode(LED_1, OUTPUT);
  pinMode(LED_2, OUTPUT);

  sensor1.setup(TERM_1, DHTesp::DHT22);
  sensor2.setup(TERM_2, DHTesp::DHT22);
  
  //Ready 1
  digitalWrite(LED_1, HIGH);

  //Wifi Setup
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.print("OK! IP=");
  Serial.println(WiFi.localIP());

  //Ready 2
  digitalWrite(LED_2, HIGH);

  randomSeed(analogRead(0));
}

int isDone = 0;

int measureCount = 0;

float bodyTempSum = 0;
float roomTempSum = 0;

//Measurement functions
float bodyTempMeasure() {
  TempAndHumidity data = sensor1.getTempAndHumidity();
  return data.temperature;
}

float roomTempMeasure() {
  TempAndHumidity data = sensor2.getTempAndHumidity();
  return data.temperature;
}

float milkVolumeMeasure() {
  return random(10, 20);
}

int heartRateMeasure() {
  return random(48, 84);
}

void loop() {
  if (isDone) return;

  //Ending Check
  int stopBtn = digitalRead(STOP_BTN);
  if (stopBtn) {
    //Collecting last measurements 
    int heartRate = heartRateMeasure();
    int milkVolume = milkVolumeMeasure();

    int bodyTemp = bodyTempSum / measureCount;
    int roomTemp = roomTempSum / measureCount;

    digitalWrite(LED_2, LOW);

    //Sending data to the server
    sendReport(
      worker_id, 
      cow_id, 
      heartRate, 
      bodyTemp, 
      roomTemp, 
      milkVolume
    );

    isDone = 1;
    digitalWrite(LED_1, LOW);
    return;
  }

  //Measure
  bodyTempSum += bodyTempMeasure();
  roomTempSum += roomTempMeasure();

  measureCount++;
}