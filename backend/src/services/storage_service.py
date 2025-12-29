import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

class StorageService:
    def __init__(self):
        self.url = os.getenv("SUPABASE_URL")
        self.key = os.getenv("SUPABASE_KEY")
        self.client: Client = None
        if self.url and self.key:
            try:
                self.client = create_client(self.url, self.key)
            except Exception as e:
                print(f"Supabase Connection Error: {e}")

    def save_analysis(self, data: dict):
        if not self.client:
            print("Supabase client not initialized")
            return None
        
        try:
            # Prepare data for insertion
            record = {
                "filename": data.get("filename", "unknown"),
                "risk_score": data.get("risk_score", 0),
                "summary": data.get("summary", ""),
                "details": data.get("technical_details", {}),
                "source": data.get("source", "unknown")
            }
            
            response = self.client.table("analysis_results").insert(record).execute()
            return response
        except Exception as e:
            print(f"Error saving to Supabase: {e}")
            return None

storage_service = StorageService()
