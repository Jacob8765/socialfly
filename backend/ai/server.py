from flask import Flask
import tensorflow as tf
from keras.models import load_model
import tensorflow_hub as hub
import numpy as np

app = Flask(__name__)

model = load_model("./my_model.h5", custom_objects={'KerasLayer': hub.KerasLayer})

@app.route("/<tweet>")
def make_prediction(tweet):
  evaulation = model.predict([tweet])
  evaulation = evaulation[0]
  classes = ["Negative", "Neutral", "Positive"]
  predicted_class = classes[np.argmax(evaulation)]
  score = 0
  if predicted_class == classes[0]:
    score = 0 - evaulation[0]
  elif predicted_class == classes[1]:
    score = 1 - evaulation[1]
  else:
    score = evaulation[2]
  
  print(evaulation)
  print("Negative: " + str(evaulation[0]) + ", neutral: " + str(evaulation[1]) + ", positive: " + str(evaulation[2]) + ".\nPredicted class: " + predicted_class + ", Normalized score: " + str(score))
  return str(score)

if __name__ == "__main__":
  app.run(port=7070)