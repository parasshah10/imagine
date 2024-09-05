import os
import psycopg2
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from runware import Runware, IImageInference
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

RUNWARE_API_KEY = os.getenv("RUNWARE_API_KEY")

# Database connection parameters
db_params = {
    'dbname': os.getenv('DB_NAME', 'defaultdb'),
    'user': os.getenv('DB_USER', 'avnadmin'),
    'password': os.getenv('DB_PASSWORD', 'AVNS_1WhwMIz3vFT7rhgh5NT'),
    'host': os.getenv('DB_HOST', 'pg-cd55329-dpptd-66be.e.aivencloud.com'),
    'port': os.getenv('DB_PORT', '19489'),
    'sslmode': 'require'
}

class ImageRequest(BaseModel):
    prompt: str
    aspect_ratio: str
    number_results: int = 1

def insert_batch(prompt: str, aspect_ratio: str, urls: list[str]):
    conn = None
    try:
        conn = psycopg2.connect(**db_params)
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO batches (prompt, aspect_ratio) VALUES (%s, %s) RETURNING id",
            (prompt, aspect_ratio)
        )
        batch_id = cur.fetchone()[0]
        
        for url in urls:
            cur.execute(
                "INSERT INTO images (batch_id, url) VALUES (%s, %s)",
                (batch_id, url)
            )
        
        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error inserting batch: {error}")
    finally:
        if conn is not None:
            conn.close()

@app.post("/generate-image")
async def generate_image(request: ImageRequest):
    runware = Runware(api_key=RUNWARE_API_KEY)
    await runware.connect()

    aspect_ratios = {
        "square": (1024, 1024),
        "landscape": (1216, 832),
        "portrait": (832, 1216)
    }

    if request.aspect_ratio not in aspect_ratios:
        raise HTTPException(status_code=400, detail="Invalid aspect ratio")

    width, height = aspect_ratios[request.aspect_ratio]

    request_image = IImageInference(
        positivePrompt=request.prompt,
        model="runware:100@1",
        numberResults=request.number_results,
        height=height,
        width=width,
    )

    try:
        images = await runware.imageInference(requestImage=request_image)
        image_urls = [image.imageURL for image in images]
        
        # Insert generated images into the database as a batch
        insert_batch(request.prompt, request.aspect_ratio, image_urls)
        
        return {"images": [{"url": url} for url in image_urls]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
