import os
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

class ImageRequest(BaseModel):
    prompt: str
    aspect_ratio: str
    number_results: int = 1

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
        return {"images": [{"url": image.imageURL} for image in images]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
