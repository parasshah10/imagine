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
    width: int
    height: int
    model: str
    number_results: int = 1

def insert_batch(prompt: str, width: int, height: int, model: str, urls: list[str]) -> int:
    conn = None
    try:
        conn = psycopg2.connect(**db_params)
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO batches (prompt, width, height, model) VALUES (%s, %s, %s, %s) RETURNING id",
            (prompt, width, height, model)
        )
        batch_id = cur.fetchone()[0]
        
        for url in urls:
            cur.execute(
                "INSERT INTO images (batch_id, url) VALUES (%s, %s)",
                (batch_id, url)
            )
        
        conn.commit()
        cur.close()
        return batch_id
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error inserting batch: {error}")
        raise
    finally:
        if conn is not None:
            conn.close()

@app.post("/generate-image")
async def generate_image(request: ImageRequest):
    try:
        runware = Runware(api_key=RUNWARE_API_KEY)
        await runware.connect()

        request_image = IImageInference(
            positivePrompt=request.prompt,
            model=request.model,
            numberResults=request.number_results,
            height=request.height,
            width=request.width,
        )

        images = await runware.imageInference(requestImage=request_image)
        image_urls = [image.imageURL for image in images]
        
        batch_id = insert_batch(request.prompt, request.width, request.height, request.model, image_urls)
        
        response = {"batch": {"id": batch_id, "prompt": request.prompt, "width": request.width, "height": request.height, "model": request.model, "images": [{"url": url} for url in image_urls]}}
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate image: {str(e)}")

@app.get("/get-batches")
async def get_batches():
    conn = None
    try:
        conn = psycopg2.connect(**db_params)
        cur = conn.cursor()
        cur.execute("""
            SELECT b.id, b.prompt, b.width, b.height, b.model, array_agg(i.url) as image_urls, b.created_at
            FROM batches b
            JOIN images i ON i.batch_id = b.id
            GROUP BY b.id, b.prompt, b.width, b.height, b.model, b.created_at
            ORDER BY b.created_at DESC
            LIMIT 5
        """)
        rows = cur.fetchall()
        
        batches = [
            {
                "id": row[0],
                "prompt": row[1],
                "width": row[2],
                "height": row[3],
                "model": row[4],
                "images": [{"url": url} for url in row[5]],
                "createdAt": row[6].isoformat()
            }
            for row in rows
        ]
        
        return {"batches": batches}
    except (Exception, psycopg2.DatabaseError) as error:
        raise HTTPException(status_code=500, detail=str(error))
    finally:
        if conn is not None:
            conn.close()

def delete_batch(batch_id: int):
    conn = None
    try:
        conn = psycopg2.connect(**db_params)
        cur = conn.cursor()
        
        # Delete associated images first
        cur.execute("DELETE FROM images WHERE batch_id = %s", (batch_id,))
        
        # Then delete the batch
        cur.execute("DELETE FROM batches WHERE id = %s", (batch_id,))
        
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error deleting batch: {error}")
        return False
    finally:
        if conn is not None:
            conn.close()

@app.delete("/delete-batch")
async def delete_batch_route(id: int):
    success = delete_batch(id)
    if success:
        return {"message": "Batch deleted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to delete batch")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
