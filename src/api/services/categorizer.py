
import openai
import os
def categorize_expense(description):
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY")) 
    api_key=os.getenv("OPENAI_API_KEY")
    if not client:
        raise ValueError("API Key is missing")
    
    openai.api_key=api_key

    prompt = f"""
    Categorize this expense: "{description}" 
    Provide the response in this format: {{"category": '', "subcategory": ''}}    
    Response:
    """
    
    response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Use GPT-4 or GPT-3.5
            messages=[{"role": "system", "content": "You are an AI that categorizes expenses."},
                    {"role": "user", "content": prompt}],
            max_tokens=50
        )
        
    category_info = response.choices[0].message.content.strip()
    return category_info