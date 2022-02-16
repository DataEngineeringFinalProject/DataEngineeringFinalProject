#%% import required libraries
from transformers import pipeline
from transformers import AutoTokenizer, TFAutoModelForSequenceClassification    
model_path = 'models/transformers/' # will be created automatically if not exists

#%% download and save the model to local directory
model_name = "unitary/toxic-bert"

model = TFAutoModelForSequenceClassification.from_pretrained(model_name, from_pt=True)
tokenizer = AutoTokenizer.from_pretrained(model_name)
classifier = pipeline('text-classification', model=model, tokenizer=tokenizer, return_all_scores=True)
classifier.save_pretrained(model_path)
#%% test if it works
classifier(["I am going to kill you !"]) 

#%% load model from local directory if it works
model = TFAutoModelForSequenceClassification.from_pretrained(model_path, local_files_only=True)
print("-----------  model loaded from local dir ------------")
tokenizer = AutoTokenizer.from_pretrained(model_path, local_files_only=True)
print("-----------  tokenizer loaded from local dir ------------")
classifier = pipeline('text-classification', model=model, tokenizer=tokenizer)

classifier(["I am going to kill you !"]) 

# %%
