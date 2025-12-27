import pandas as pd
import numpy as np
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import json

# Sample training data - FIXED: SAME LENGTH FOR QUESTIONS AND INTENTS
training_data = {
    "questions": [
        "What is your name",
        "what is your full name",
        "who are you",
        "can you tell me about yourself",
        "give me your introduction",
        "What is your major",
        "what did you study",
        "what is your educational background",
        "what are your machine learning skills",
        "tell me about your ml projects",
        "what ml algorithms do you know",
        "explain your credit risk model",
        "show me your data science projects",
        "what is your experience with python",
        "tell me about fastapi",
        "how can i download your cv",
        "where is your resume",
        "get your curriculum vitae",
        "what certifications do you have",
        "show me your qualifications",
        "are you available for work",
        "how can i contact you",
        "what is your email",
        "tell me about yourself",
        "who are you",
        "what do you do",
        "hi",
        "hello",
        "hey",
        "machine learning",
        "data science",
        "backend development",
        "download your cv",
        "get your resume",
        "contact information",
        "email address",
        "linkedin profile",
        "github repositories",
        "upwork profile",
        "show me your projects",
        "what have you built",
        "are you avaliable for hire"
    ],
    "intents": [  
        "about", "about", "about", "about", "about",           
        "about", "about", "about",                             
        "skills", "projects", "skills",                        
        "project_details", "projects",                         
        "skills", "backend",                                   
        "cv", "cv", "cv",                                      
        "certifications", "certifications",                    
        "contact", "contact", "contact",                       
        "about", "about", "about",                             
        "greeting", "greeting", "greeting",                    
        "skills", "skills", "backend",                         
        "cv", "cv",                                            
        "contact", "contact", "contact", "contact",            
        "projects", "projects", "projects",                    
        "contact"                                           
    ]
}

# Verify lengths match
print(f"📊 Data check:")
print(f"Questions: {len(training_data['questions'])}")
print(f"Intents: {len(training_data['intents'])}")

if len(training_data['questions']) != len(training_data['intents']):
    print("❌ ERROR: Questions and intents must have same length!")
    print(f"   Questions: {len(training_data['questions'])}")
    print(f"   Intents: {len(training_data['intents'])}")
    # Auto-fix by truncating to shortest
    min_len = min(len(training_data['questions']), len(training_data['intents']))
    training_data['questions'] = training_data['questions'][:min_len]
    training_data['intents'] = training_data['intents'][:min_len]
    print(f"✅ Auto-truncated to {min_len} samples")

# Create DataFrame
df = pd.DataFrame(training_data)

# Show data distribution
print(f"\n📈 Intent distribution:")
print(df['intents'].value_counts())

# Create and train pipeline
print("\n🚀 Training ML model...")
model = Pipeline([
    ('tfidf', TfidfVectorizer(
        stop_words='english',
        ngram_range=(1, 2),
        max_features=200,
        min_df=1,
        max_df=0.9
    )),
    ('clf', MultinomialNB(alpha=0.5))
])

# Train model
model.fit(df['questions'], df['intents'])

# Test predictions
print("\n🧪 Testing predictions:")
test_questions = [
    "what ml models have you built",
    "can i get your resume",
    "what are your qualifications",
    "tell me about your background",
    "how do i contact you",
    "what programming languages",
    "show me your github",
    "hello there",
    "machine learning projects",
    "download cv"
]

print("Question -> Intent (Confidence)")
print("-" * 50)
for q in test_questions:
    prediction = model.predict([q])[0]
    proba = model.predict_proba([q])[0]
    confidence = proba[list(model.classes_).index(prediction)]
    print(f"'{q[:30]}...' -> {prediction:15} ({confidence:.1%})")

# Save model
import os
os.makedirs('ml_model', exist_ok=True)
joblib.dump(model, 'ml_model/intent_classifier.pkl')

# Save vectorizer vocabulary for TypeScript
vectorizer = model.named_steps['tfidf']
vocab = {k: int(v) for k, v in vectorizer.vocabulary_.items()}  # Convert int64 to int

with open('ml_model/vocabulary.json', 'w') as f:
    json.dump(vocab, f, indent=2)

# Save class labels
with open('ml_model/classes.json', 'w') as f:
    json.dump(model.classes_.tolist(), f, indent=2)

# Save training data for reference
with open('ml_model/training_data.json', 'w') as f:
    json.dump(training_data, f, indent=2)

print(f"\n✅ Model trained and saved!")
print(f"📊 Classes ({len(model.classes_)}): {model.classes_.tolist()}")
print(f"📚 Vocabulary size: {len(vocab)}")
print(f"📁 Training samples: {len(df)}")
print(f"\n💾 Files saved:")
print(f"   • ml_model/intent_classifier.pkl")
print(f"   • ml_model/vocabulary.json")
print(f"   • ml_model/classes.json")
print(f"   • ml_model/training_data.json")

# Show model accuracy on training data (for reference)
train_predictions = model.predict(df['questions'])
accuracy = np.mean(train_predictions == df['intents'])
print(f"\n📊 Training accuracy: {accuracy:.1%}")