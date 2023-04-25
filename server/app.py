import uvicorn
from fastapi import FastAPI
import numpy as np
import pickle
import pandas as pd
import preprocess_kgptalkie as ps
import re 
from fastapi.encoders import jsonable_encoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVC
from sklearn.metrics import classification_report
# 2. Create the app object
app = FastAPI()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Allow all origins (replace "*" with your frontend URL for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df = pd.read_csv("https://raw.githubusercontent.com/agarwalkoustubh38/Suicide_analysis/main/twitter-suicidal_data.csv")
tfidfdup = TfidfVectorizer(max_features = 20000,ngram_range=(1,3),analyzer='char')
X = tfidfdup.fit_transform(df['tweet'])
y = df['intention']
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size = 0.2,random_state=0)
clf = LinearSVC()
clf.fit(X_train,y_train)
y_pred = clf.predict(X_test)

from bs4 import BeautifulSoup
def remove_html_tags(x):
	return BeautifulSoup(x, 'html.parser').get_text().strip()

def get_clean(x):
 x = str(x).lower().replace('\\', '').replace('_', ' ')
 x = ps.cont_exp(x)
 x = ps.remove_emails(x)
 x = ps.remove_urls(x)
 x = remove_html_tags(x)
 x = ps.remove_rt(x)
 x = ps.remove_accented_chars(x)
 x = ps.remove_special_chars(x)
 x = re.sub("(.)\\1{2,}", "\\1", x)
 print(x)
 return x

def get_res(x):
 x = get_clean(x)
 # tfidf1 = TfidfVectorizer(max_features = 20000,ngram_range=(1,3),analyzer='char')
 vec = tfidfdup.transform([x] )

 # clf1 = LinearSVC()
 return clf.predict(vec)

# 3. Index route, opens automatically on http://127.0.0.1:8000
@app.get('/')
def index():
    return {'message': 'Hello, World'}

# 4. Route with a single parameter, returns the parameter within a message
#    Located at: http://127.0.0.1:8000/AnyNameHere
# @app.get('/{name}')
# async def get_input(name: str):
#     # return {f'{name}' : get_res(name)}
#  return {"messaege": "show me the input"}

@app.get('/{name}')
def output_name(name: str):
   print(name)
   temp=float(get_res(name)[0])
   encoded_value = jsonable_encoder(temp)
   # print(temp)\
   my_dict={name:encoded_value}
   # encoded_value = jsonable_encoder(my_dict)

   return my_dict

# 5. Run the API with uvicorn
#    Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
    
#uvicorn app:app --reload