import requests
from pymongo import MongoClient
from datetime import datetime

# MongoDB connection details
mongo_uri = "mongodb+srv://petricazahapschiz:1wUjWWib3cZ8PVUT@buci.jas6h.mongodb.net/?retryWrites=true&w=majority&appName=Buci"  # replace with your MongoDB connection string
database_name = "crypto_data"
collection_name = "prices"

# Cryptocurrency API endpoints
api_urls = {
    "BTC": "https://api.coindesk.com/v1/bpi/currentprice/BTC.json",
    "ETH": "https://api.coindesk.com/v1/bpi/currentprice/ETH.json",
    "LTC": "https://api.coindesk.com/v1/bpi/currentprice/LTC.json",
    "XRP": "https://api.coindesk.com/v1/bpi/currentprice/XRP.json"
}

def get_crypto_price(crypto):
    response = requests.get(api_urls[crypto])
    data = response.json()
    return data["bpi"]["USD"]["rate_float"]

def store_price_in_mongodb(crypto, price):
    client = MongoClient(mongo_uri)
    db = client[database_name]
    collection = db[collection_name]
    entry = {
        "currency": crypto,
        "price": price,
        "timestamp": datetime.now()
    }
    collection.insert_one(entry)
    print(f"Price for {crypto} {price} added to MongoDB.")

if __name__ == "__main__":
    for crypto in api_urls.keys():
        price = get_crypto_price(crypto)
        store_price_in_mongodb(crypto, price)